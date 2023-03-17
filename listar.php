<?php
include("inc/header.php");

include("inc/header.html");

// query sql listando todos os dados de fornecedores e quantidade de docs e contatos
$query = "
    SELECT
        *
    FROM fornecedores
        ";

// buscando fornecedores para listar
$fornecedores_result = mysqli_query($mysqli, $query);

// convertendo resultado em um array
$fornecedores = [];
while ($fornecedor = mysqli_fetch_assoc($fornecedores_result)) {
    // recuperando id do fornecedor
    $fornecedor_id = $fornecedor["id"];

    // aplicando htmlentities para exibição apropriada no HTML
    $fornecedores[$fornecedor_id] = array_map("htmlentities", $fornecedor);

    // recuperando quantidade de contatos que esse fornecedor tem
    $query = "
        SELECT
            count(*)
        FROM contatos
        WHERE fornecedores_id = $fornecedor_id
        ";

    $contatos_result = mysqli_query($mysqli, $query);
    $contatos = mysqli_fetch_row($contatos_result);
    $fornecedores[$fornecedor_id]["quantidade_contatos"] = $contatos[0];

    // recuperando quantidade de documentos que esse fornecedor tem
    $query = "
        SELECT
            count(*)
        FROM documentos
        WHERE fornecedores_id = $fornecedor_id
        ";

    $documentos_result = mysqli_query($mysqli, $query);
    $documentos = mysqli_fetch_row($documentos_result);
    $fornecedores[$fornecedor_id]["quantidade_documentos"] = $documentos[0];
}

?>

<h1>Lista de Fornecedores</h1>

<table class="lista">
    <tr>
        <th>CNPJ</th>
        <th>Razão Social</th>
        <th>Data de Abertura</th>
        <th>Telefone</th>
        <th>E-mail</th>
        <th>CEP</th>
        <th>Endereço</th>
        <th>Contatos</th>
        <th>Documentos</th>
        <th></th>
    </tr>
    <?php
    foreach ($fornecedores as $fornecedor_id => $fornecedor) {
    ?>
        <tr>
            <td><?= $fornecedor["cnpj"] ?></td>
            <td><?= $fornecedor["razao_social"] ?></td>
            <td><?= $fornecedor["data_abertura"] ?></td>
            <td><?= $fornecedor["telefone"] ?></td>
            <td><?= $fornecedor["email"] ?></td>
            <td><?= $fornecedor["cep"] ?></td>
            <td><?= $fornecedor["endereco"] ?></td>
            <td><?= $fornecedor["quantidade_contatos"] ?></td>
            <td><?= $fornecedor["quantidade_documentos"] ?></td>
            <td><?= "<a href='ficha_fornecedor.php?fornecedor_id=$fornecedor_id'>Ficha Completa</a>" ?></td>
        </tr>
    <?php
    }
    ?>
</table>

<?php
include("inc/footer.html");
?>