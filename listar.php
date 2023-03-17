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

<h1>Fornecedores</h1>

<h2>Pesquisar</h2>

<form action="pesquisar.php">

    <p>
        <label class="fornecedor">CNPJ</label>
        <input type="text" name="cnpj" id="cnpj" class="ls-mask-cnpj" placeholder="00.000.000/0000-00" maxlength="18">
        <span class="msg" id="cnpj_msg"></span>
    </p>

    <p>
        <label class="fornecedor">Razão Social</label>
        <input type="text" name="razao_social" id="razao_social" maxlength="255">
        <span class="msg" id="razao_social_msg"></span>
    </p>

    <p>
        <label class="fornecedor">E-mail</label>
        <input type="text" name="email" id="email" maxlength="100">
        <span class="msg" id="email_msg"></span>
    </p>

    <button>Pesquisar</button>

</form>

<h2>Lista</h2>

<table class="lista">
    <tr>
        <th>CNPJ</th>
        <th>Razão Social</th>
        <th>E-mail</th>
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
            <td><?= $fornecedor["email"] ?></td>
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