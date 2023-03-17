<?php
include_once("header.php");

if (!$erro) {
    // recuperando id como um inteiro
    $fornecedores_id = (int)$_GET["fornecedores_id"];

    // se vier 0 é porque o valor nao era inteiro ou esta errado
    if (!$fornecedores_id) {
        $erro = "Id inválido.";
    }
}

if (!$erro) {
    // recuperando dados do fornecedor
    $query = "
        SELECT 
            *
        FROM 
            fornecedores
        WHERE
            id = $fornecedores_id
        ";

    $fornecedor_result = $mysqli->query($query);

    $fornecedor = $fornecedor_result->fetch_assoc();

    if (!$fornecedor) {
        $erro = "Fornecedor não localizado.";
    } else {
        echo "<p><b>Fornecedor:</b> " . $fornecedor["razao_social"] . " - " . $fornecedor["cnpj"] . "</p>";
    }
}
