<?php
include("inc/header.php");

include("inc/header.html");

if (@$_GET['pesquisa'] == "true") {
    // query sql buscando fornecedores de acordo com os parametros
    $query = "
        SELECT 
            id,
            cnpj,
            razao_social,
            email,
            (SELECT count(*) FROM contatos WHERE contatos.fornecedores_id = fornecedores.id) AS quantidade_contatos,
            (SELECT count(*) FROM documentos WHERE documentos.fornecedores_id = fornecedores.id) AS quantidade_documentos
        FROM
            fornecedores
        WHERE
            1=1
            ";

    if ($_GET["cnpj"]) {
        $query .= " AND cnpj like '%" . addslashes($_GET["cnpj"]) . "%' ";
    }

    if ($_GET["email"]) {
        $query .= " AND email like '%" . addslashes($_GET["email"]) . "%' ";
    }

    if ($_GET["razao_social"]) {
        $query .= " AND razao_social like '%" . addslashes($_GET["razao_social"]) . "%' ";
    }

} else {
    // query sql listando todos os dados de fornecedores e quantidade de docs e contatos
    $query = "
        SELECT 
            id,
            cnpj,
            razao_social,
            email,
            (SELECT count(*) FROM contatos WHERE contatos.fornecedores_id = fornecedores.id) AS quantidade_contatos,
            (SELECT count(*) FROM documentos WHERE documentos.fornecedores_id = fornecedores.id) AS quantidade_documentos
        FROM
            fornecedores
        ";
}

// buscando fornecedores para listar
$fornecedores_result = mysqli_query($mysqli, $query);

// convertendo resultado em um array
$fornecedores = [];
while ($fornecedor = mysqli_fetch_assoc($fornecedores_result)) {
    // recuperando id do fornecedor
    $fornecedor_id = $fornecedor["id"];

    // aplicando htmlentities para exibição apropriada no HTML
    $fornecedores[$fornecedor_id] = array_map("htmlentities", $fornecedor);
}

?>

<h1>Fornecedores</h1>

<h2>Filtros</h2>

<form>
    <input type="hidden" name="pesquisa" value="true">

    <p>
        <label class="fornecedor">CNPJ</label>
        <input type="text" name="cnpj" id="cnpj" class="ls-mask-cnpj" placeholder="00.000.000/0000-00" maxlength="18" value="<?= htmlentities(@$_GET["cnpj"]) ?>">
        <span class="msg" id="cnpj_msg"></span>
    </p>

    <p>
        <label class="fornecedor">Razão Social</label>
        <input type="text" name="razao_social" id="razao_social" maxlength="255" value="<?= htmlentities(@$_GET["razao_social"]) ?>">
        <span class="msg" id="razao_social_msg"></span>
    </p>

    <p>
        <label class="fornecedor">E-mail</label>
        <input type="text" name="email" id="email" maxlength="100" value="<?= htmlentities(@$_GET["email"]) ?>">
        <span class="msg" id="email_msg"></span>
    </p>

    <button>Filtrar</button>

</form>

<?php
if (@$_GET['pesquisa'] == "true") {

?>
    <h2>Resultado de Pesquisa</h2>
<?php

} else {

?>
    <h2>Lista</h2>
<?php

}
?>


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
            <td><?= "<a href='ficha.php?fornecedor_id=$fornecedor_id'>Ficha Completa</a>" ?></td>
        </tr>
    <?php
    }
    ?>
</table>

<?php
include("inc/footer.html");
?>