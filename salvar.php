<?php
include("inc/header.php");

include("inc/header.html");
?>

<h1>Salvando Fornecedor...</h1>

<?php

$erro = false;

// verificação de email e cnpj duplicado é feito direto
// pelo banco de dados ao inserir o fornecedor na tabela
// com chaves unicas para estes campos

// verificar e modificar formato de data de abertura
if (!$erro) {
    // reconhecendo data
    $data_abertura = date_create_from_format('d/m/Y', $_POST["data_abertura"]);

    // verificando se é válida
    if (!$data_abertura) {
        $erro = "Data de abertura inválida.";
    } else {
        // colocando em formato para inserção no banco
        $data_abertura = date_format($data_abertura, 'Y-m-d');
    }
}

// inserir fornecedor no banco de dados
if (!$erro) {

    // preparando query
    $query = "
        INSERT INTO `fornecedores`
            (`cnpj`, `razao_social`, `data_abertura`, `telefone`, `email`, `cep`, `endereco`)
        VALUES 
            (?, ?, ?, ?, ?, ?, ?)
            ";

    $stmt = $mysqli->prepare($query);

    // colocando parametros na query
    $stmt->bind_param(
        "sssssss",
        $_POST["cnpj"],
        $_POST["razao_social"],
        $data_abertura,
        $_POST["telefone"],
        $_POST["email"],
        $_POST["cep"],
        $_POST["endereco"]
    );

    // executando, em caso de erro provavelmente será por cnpj ou email repetido na tabela
    if (!$stmt->execute()) {
        $erro = "Erro ao inserir fornecedor no banco de dados. Verifique CNPJ ou e-mail repetido.";
    }

    // recuperando o id do fornecedor que acabou de ser inserido
    $fornecedor_id = $stmt->insert_id;
}

if (!$erro) {

    // buscando arquivos em todos os campos de upload
    foreach ($_FILES as $file) {

        // verificando se foi feito o upload
        if (
            $file["name"] &&
            $file["type"] &&
            $file["tmp_name"] &&
            $file["size"] &&
            $file["error"] == 0
        ) {
            // criando nome de arquivo para a pasta upload
            $i = 0;
            $filename = "uploads/" . $i . "-" . basename($file["name"]);

            // verificando se ja existe, se existir tenta outro numero para o sufixo
            while (file_exists($filename)) {
                $i++;
                $filename = "uploads/" . $i . "-" . basename($file["name"]);
            }

            // movendo arquivo pra pasta upload
            move_uploaded_file($file["tmp_name"], $filename);

            // preparando query
            $query = "
                INSERT INTO `documentos`
                    (`fornecedores_id`, `path`) VALUES (?, ?)
            ";

            $stmt = $mysqli->prepare($query);

            // colocando parametros na query
            $stmt->bind_param(
                "is",
                $fornecedor_id,
                $filename
            );

            // executando, em caso de erro o arquivo será excluído
            if (!$stmt->execute()) {
                $erro = "Erro ao inserir documento no banco de dados.";

                // apagando arquivo movido
                unlink($filename);

                // saindo do loop
                break;
            }
        }
    }
}

// inserir contato 1

if (!$erro) {
    $contatos[1]["nome"] = $_POST["contato_1_nome"];
    $contatos[1]["departamento"] = $_POST["contato_1_departamento"];
    $contatos[1]["email"] = $_POST["contato_1_email"];

    $contatos[2]["nome"] = $_POST["contato_2_nome"];
    $contatos[2]["departamento"] = $_POST["contato_2_departamento"];
    $contatos[2]["email"] = $_POST["contato_2_email"];

    foreach ($contatos as $contato) {
        if ($contato["nome"] && $contato["departamento"] && $contato["email"]) {

            // preparando query
            $query = "
                INSERT INTO `contatos`
                    (`fornecedores_id`, `nome`, `departamento`, `email`) VALUES (?, ?, ?, ?)
            ";

            $stmt = $mysqli->prepare($query);

            // colocando parametros na query
            $stmt->bind_param(
                "isss",
                $fornecedor_id,
                $contato["nome"],
                $contato["departamento"],
                $contato["email"]
            );

            // salvando contato
            if (!$stmt->execute()) {
                $erro = "Erro ao inserir contato no banco de dados.";

                // saindo do loop
                break;
            }
        }
    }
}

if ($erro) {
    echo $erro;
    echo ' <button onclick="history.back()">Voltar</button>';
} else {
    echo "Sucesso!";
}

?>

<?php
include("inc/footer.html");
?>