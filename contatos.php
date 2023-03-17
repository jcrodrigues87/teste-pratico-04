<?php
include("inc/header.php");

include("inc/header.html");
?>

<h1>Contatos</h1>

<?php

$erro = false;

include("inc/ficha_fornecedor.php");

if (!$erro) {
    // recuperando dados do fornecedor
    $query = "
        SELECT 
            *
        FROM 
            contatos
        WHERE
            fornecedores_id = $fornecedores_id
        ";

    $contatos_result = $mysqli->query($query);

    echo "<table class='lista'><tr><th>Nome</th><th>Departamento</th><th>E-mail</th></tr>";

    while ($contatos = $contatos_result->fetch_assoc()) {
        echo "<tr>";
        echo "<td>" . $contatos["nome"] . "</td>";
        echo "<td>" . $contatos["departamento"] . "</td>";
        echo "<td>" . $contatos["email"] . "</td>";
        echo "</tr>";
    }

    echo "</table>";
}

if ($erro) {
    echo $erro;
}
?>
<?php
include("inc/footer.html");
?>