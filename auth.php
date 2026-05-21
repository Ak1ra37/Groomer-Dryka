<?php
require_once 'config.php';

$data = json_decode(file_get_contents("php://input"), true);
$conn = getConnection();

if (!$data) {
    http_response_code(400);
    exit(json_encode(['success' => false, 'error' => 'Dados inválidos']));
}

/* LOGIN */
if (isset($data['login'])) {

    $stmt = $conn->prepare("SELECT * FROM usuarios WHERE email = :email AND ativo = 1");
    $stmt->execute(['email' => $data['email']]);
    $user = $stmt->fetch();

    if (!$user || !password_verify($data['senha'], $user['senha'])) {
        http_response_code(401);
        exit(json_encode(['success' => false, 'error' => 'Credenciais inválidas']));
    }

    $token = criarToken($user['id']);

    echo json_encode([
        'success' => true,
        'token' => $token,
        'usuario' => $user
    ]);
    exit;
}

/* REGISTER */
if (isset($data['register'])) {

    $check = $conn->prepare("SELECT id FROM usuarios WHERE email = :email");
    $check->execute(['email' => $data['email']]);

    if ($check->fetch()) {
        http_response_code(409);
        exit(json_encode(['success' => false, 'error' => 'Email já existe']));
    }

    $senha = password_hash($data['senha'], PASSWORD_DEFAULT);
    $tipo = mapearCID($data['cid']);

    $stmt = $conn->prepare("
        INSERT INTO usuarios (nome,email,senha,cid,bio,tipo_acessibilidade)
        VALUES (:nome,:email,:senha,:cid,:bio,:tipo)
    ");

    $stmt->execute([
        'nome' => $data['nome'],
        'email' => $data['email'],
        'senha' => $senha,
        'cid' => $data['cid'],
        'bio' => $data['bio'] ?? '',
        'tipo' => $tipo
    ]);

    echo json_encode(['success' => true]);
}

function mapearCID($cid) {
    $cidMap = [
        'F90' => 'tdah',
        'F84' => 'autismo',
        'F81' => 'dislexia',
        'H53.5' => 'daltonismo',
        'H54' => 'baixa-visao',
        'H90' => 'surdez',
        'G80' => 'motora'
    ];
    
    $codigo = strtoupper(explode('.', $cid)[0]);
    return $cidMap[$codigo] ?? 'geral';
}