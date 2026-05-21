<?php
require_once 'config.php';

// ============ TOKEN ============
const JWT_SECRET = 'chave_secreta_pet_shop_2024';

function criarToken($usuarioId) {
    $header = base64_encode(json_encode(['alg' => 'HS256', 'typ' => 'JWT']));
    $payload = base64_encode(json_encode([
        'usuario_id' => $usuarioId,
        'exp' => time() + (7 * 24 * 60 * 60)
    ]));
    $signature = base64_encode(hash_hmac('sha256', "$header.$payload", JWT_SECRET, true));
    return "$header.$payload.$signature";
}

function verificarToken($token) {
    $parts = explode('.', $token);
    if (count($parts) !== 3) return null;
    
    list($header, $payload, $signature) = $parts;
    $expectedSignature = base64_encode(hash_hmac('sha256', "$header.$payload", JWT_SECRET, true));
    
    if ($signature !== $expectedSignature) return null;
    
    $data = json_decode(base64_decode($payload), true);
    if ($data['exp'] < time()) return null;
    
    return ['usuario_id' => $data['usuario_id']];
}

function atualizarSessao($token) {
    $sessao = verificarToken($token);
    if ($sessao) {
        $conn = getConnection();
        $stmt = $conn->prepare("UPDATE usuarios SET ultimo_acesso = NOW() WHERE id = ?");
        $stmt->execute([$sessao['usuario_id']]);
    }
}

function getToken() {
    $headers = getallheaders();
    $token = $headers['Authorization'] ?? null;
    if (!$token) return null;
    return str_replace('Bearer ', '', $token);
}

function requireAuth() {
    $token = getToken();
    if (!$token) {
        http_response_code(401);
        echo json_encode(['success' => false, 'error' => 'Token não fornecido']);
        exit;
    }
    
    $sessao = verificarToken($token);
    if (!$sessao) {
        http_response_code(401);
        echo json_encode(['success' => false, 'error' => 'Sessão inválida']);
        exit;
    }
    
    atualizarSessao($token);
    return $sessao;
}

function mapearCID($cid) {
    $cidMap = [
        'F90' => 'tdah', 'F84' => 'autismo', 'F81' => 'dislexia',
        'H53.5' => 'daltonismo', 'H54' => 'baixa-visao',
        'H90' => 'surdez', 'G80' => 'motora'
    ];
    $codigo = strtoupper(explode('.', $cid)[0]);
    return $cidMap[$codigo] ?? 'geral';
}
?>