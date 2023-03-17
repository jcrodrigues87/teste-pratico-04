<?php
include("inc/header.php");

include("inc/header.html");
?>

<h1>Ficha do Fornecedor</h1>

<?php

$erro = false;

if (!$erro) {
    // recuperando id como um inteiro
    $fornecedor_id = (int)$_GET["fornecedor_id"];

    // se vier 0 é porque o valor nao era inteiro ou esta errado
    if (!$fornecedor_id) {
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
            id = $fornecedor_id
        ";

    $fornecedor_result = $mysqli->query($query);

    $fornecedor = $fornecedor_result->fetch_assoc();

    if (!$fornecedor) {
        $erro = "Fornecedor não localizado.";
    }
}

if (!$erro) {
    // aplicando htmlentities para exibição apropriada no HTML
    $fornecedor = array_map("htmlentities", $fornecedor);
    ?>

    <ul class="ficha">
        <li><b>CNPJ:</b> <?= $fornecedor["cnpj"]?></li>
        <li><b>Razão Social:</b> <?= $fornecedor["razao_social"]?></li>
        <li><b>Data de Abertura:</b> <?= $fornecedor["data_abertura"]?></li>
        <li><b>Telefone:</b> <?= $fornecedor["telefone"]?></li>
        <li><b>E-mail:</b> <?= $fornecedor["email"]?></li>
        <li><b>CEP:</b> <?= $fornecedor["cep"]?></li>
        <li><b>Endereço:</b> <?= $fornecedor["endereco"]?></li>
    </ul>

    <h2>Contatos</h2>

    <?php

    // recuperando dados do contatos
    $query = "
        SELECT 
            *
        FROM 
            contatos
        WHERE
            fornecedores_id = $fornecedor_id
        ";

    $contatos_result = $mysqli->query($query);

    echo "<table class='lista'><tr><th>Nome</th><th>Departamento</th><th>E-mail</th></tr>";

    while ($contatos = $contatos_result->fetch_assoc()) {
        // preparando para mostrar o contato no HTML
        $contatos  = array_map("htmlentities", $contatos);
        
        echo "<tr>";
        echo "<td>" . $contatos["nome"] . "</td>";
        echo "<td>" . $contatos["departamento"] . "</td>";
        echo "<td>" . $contatos["email"] . "</td>";
        echo "</tr>";
    }

    echo "</table>";

    echo "<h2>Documentos</h2>";

    // recuperando dados do fornecedor
    $query = "
        SELECT 
            *
        FROM 
            documentos
        WHERE
            fornecedores_id = $fornecedor_id
        ";

    $documentos_result = $mysqli->query($query);

    echo "<ul class='documentos'>";

    $nenhum = true;

    while ($documentos = $documentos_result->fetch_assoc()) {
        $path = $documentos["path"];

        echo "<li><a href='$path'>";

        // pegando apenas o nome do arquivo e preparando ele para ser exibido no HTML
        echo htmlentities(basename($path));

        echo "</a></li>";

        $nenhum = false;
    }

    echo "</ul>";

    if ($nenhum) {
        echo "Nenhum documento encontrado.";
    }
}
?>
<?php
include("inc/footer.html");
?>