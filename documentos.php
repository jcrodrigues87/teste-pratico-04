<?php
include("inc/header.php");

include("inc/header.html");
?>

<h1>Documentos</h1>

<?php

$erro = false;

include("inc/ficha_fornecedor.php");

if (!$erro) {
    // recuperando dados do fornecedor
    $query = "
        SELECT 
            *
        FROM 
            documentos
        WHERE
            fornecedores_id = $fornecedores_id
        ";

    $documentos_result = $mysqli->query($query);

    echo "<ul>";

    $nenhum = true;

    while ($documentos = $documentos_result->fetch_assoc()) {
        $path = $documentos["path"];

        echo "<li><a href='$path'>";
        echo basename($path);
        echo "</a></li>";

        $nenhum = false;
    }

    echo "</ul>";

    if ($nenhum) {
        echo "Nenhum documento encontrado.";
    }
}

if ($erro) {
    echo $erro;
}
?>
<?php
include("inc/footer.html");
?>