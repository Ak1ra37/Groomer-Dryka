<?php
require_once 'helpers.php';

$sessao = requireAuth();
$conn = getConnection();

$data = json_decode(file_get_contents("php://input"), true);
$action = $data['action'] ?? null;

$userId = $sessao['usuario_id'];

/* ADD */
if ($action === 'add') {

    $stmt = $conn->prepare("
        INSERT INTO carrinho (usuario_id, produto_id, quantidade)
        VALUES (:u,:p,:q)
        ON DUPLICATE KEY UPDATE quantidade = quantidade + VALUES(quantidade)
    ");

    $stmt->execute([
        'u' => $userId,
        'p' => $data['produto_id'],
        'q' => $data['quantidade']
    ]);

    exit(json_encode(['success' => true]));
}

/* UPDATE */
if ($action === 'update') {

    $qtd = max(0, (int)$data['quantidade']);

    if ($qtd === 0) {
        $stmt = $conn->prepare("DELETE FROM carrinho WHERE usuario_id=:u AND produto_id=:p");
    } else {
        $stmt = $conn->prepare("
            UPDATE carrinho SET quantidade=:q
            WHERE usuario_id=:u AND produto_id=:p
        ");
    }

    $stmt->execute([
        'u' => $userId,
        'p' => $data['produto_id'],
        'q' => $qtd
    ]);

    exit(json_encode(['success' => true]));
}

/* LIST */
$stmt = $conn->prepare("
    SELECT c.*, p.nome, p.preco, p.imagem_url
    FROM carrinho c
    JOIN produtos p ON p.id = c.produto_id
    WHERE c.usuario_id = :u
");

$stmt->execute(['u' => $userId]);

echo json_encode([
    'success' => true,
    'carrinho' => $stmt->fetchAll()
]);
