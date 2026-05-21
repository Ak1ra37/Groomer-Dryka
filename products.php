<?php
require_once 'config.php';

$conn = getConnection();

$page = $_GET['page'] ?? 1;
$limit = 20;
$offset = ($page - 1) * $limit;

$filtro = $_GET['filtro'] ?? null;

$sql = "SELECT * FROM produtos WHERE ativo = 1";
$params = [];

if ($filtro && $filtro !== 'todos') {
    $sql .= " AND FIND_IN_SET(:filtro, tags)";
    $params['filtro'] = $filtro;
}

$sql .= " LIMIT $limit OFFSET $offset";

$stmt = $conn->prepare($sql);
$stmt->execute($params);

echo json_encode([
    'success' => true,
    'produtos' => $stmt->fetchAll()
]);