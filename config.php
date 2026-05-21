<?php
header('Content-Type: application/json; charset=utf-8');

date_default_timezone_set('America/Sao_Paulo');

function getConnection() {
    static $conn;

    if ($conn === null) {
        $conn = new PDO(
            "mysql:host=localhost;dbname=mercado_inclusivo;charset=utf8mb4",
            "root",
            "",
            [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
            ]
        );
    }

    return $conn;
}