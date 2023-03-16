<?php
include("inc/header.php");

include("inc/header.html");

// query sql listando todos os dados de fornecedores e quantidade de docs e contatos
$query = "
    SELECT DISTINCT
        fornecedores.*,
        count(contatos.id) AS quantidade_contatos,
        count(documentos.id) AS quantidade_documentos
    FROM fornecedores
        LEFT JOIN documentos ON documentos.fornecedores_id = fornecedores.id
        LEFT JOIN contatos ON contatos.fornecedores_id = fornecedores.id
        ";

// buscando fornecedores para listar
$fornecedores_result = mysqli_query($mysqli, $query);

// convertendo resultado em um array
$fornecedores = [];
while ($fornecedor = mysqli_fetch_assoc($fornecedores_result)) {
    // aplicando htmlentities para exibição apropriada no HTML
    $fornecedores[] = array_map("htmlentities", $fornecedor);
}

?>

<h1>Lista de Fornecedores</h1>

<table class="lista">
    <tr>
        <td>CNPJ</td>
        <td>Razão Social</td>
        <td>Data de Abertura</td>
        <td>Telefone</td>
        <td>E-mail</td>
        <td>CEP</td>
        <td>Endereço</td>
        <td>Contatos</td>
        <td>Documentos</td>
    </tr>
    <?php
    foreach ($fornecedores as $fornecedor) {
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
        </tr>
    <?php
    }
    ?>
</table>

<?php
include("inc/footer.html");
?>