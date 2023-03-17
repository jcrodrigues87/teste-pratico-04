<?php
include("inc/header.php");

include("inc/header.html");
?>

<h1>Inserir Fornecedor</h1>

<form action="salvar.php" data-ls-module="form" method="post" enctype="multipart/form-data">

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
        <label class="fornecedor">Data de Abertura</label>
        <input type="text" name="data_abertura" id="data_abertura" class="ls-mask-date" placeholder="31/12/1990" maxlength="10">
        <span class="msg" id="data_abertura_msg"></span>
    </p>

    <p>
        <label class="fornecedor">Telefone</label>
        <input type="text" name="telefone" id="telefone" class="ls-mask-phone9_with_ddd" placeholder="(99) 99999-9999" maxlength="15">
        <span class="msg" id="telefone_msg"></span>
    </p>

    <p>
        <label class="fornecedor">E-mail</label>
        <input type="text" name="email" id="email" maxlength="100">
        <span class="msg" id="email_msg"></span>
    </p>

    <p>
        <label class="fornecedor">CEP</label>
        <input type="text" name="cep" id="cep" class="ls-mask-cep" placeholder="00000-000" maxlength="9" onblur="busca_cep()">
        <span class="msg" id="cep_msg"></span>
    </p>

    <p>
        <label class="fornecedor">Endereço</label>
        <input type="text" name="endereco" id="endereco" maxlength="255">
        <span class="msg" id="endereco_msg"></span>
    </p>

    <p>
        <label>Nome do contato</label>
        <input name="contato_1_nome" id="contato_1_nome" type="text" maxlength="100">

        <label>Departamento</label>
        <input name="contato_1_departamento" id="contato_1_departamento" type="text" maxlength="50">

        <label>E-mail</label>
        <input name="contato_1_email" id="contato_1_email" type="text" maxlength="100">
    </p>
    <span class="msg" id="contato_1_msg"></span>

    <p>
        <label>Nome do contato</label>
        <input name="contato_2_nome" id="contato_2_nome" type="text" maxlength="100">

        <label>Departamento</label>
        <input name="contato_2_departamento" id="contato_2_departamento" type="text" maxlength="50">

        <label>E-mail</label>
        <input name="contato_2_email" id="contato_2_email" type="text" maxlength="100">
    </p>
    <span class="msg" id="contato_2_msg"></span>

    <p>
        <label class="documentos">Documentos</label>
        <input type="file" name="documento_1" id="documento_1"><br>
        <input type="file" name="documento_2" id="documento_2"><br>
        <input type="file" name="documento_3" id="documento_3"><br>
        <input type="file" name="documento_4" id="documento_4"><br>
        <input type="file" name="documento_5" id="documento_5"><br>
        <span class="msg" id="documentos_msg"></span>
    </p>

    <p>
        <button onclick="return salvar()">Salvar</button>
    </p>

</form>

<script>
    function limpa_formulário_cep() {
        // Limpa valores do formulário de cep.
        $("#cep").val("");
        $("#endereco").val("");
    }

    
    //Quando o campo cep perde o foco.
    function busca_cep() {

        //Nova variável "cep" somente com dígitos.
        var cep = $("#cep").val().replace(/\D/g, '');

        //Verifica se campo cep possui valor informado.
        if (cep != "") {

            //Expressão regular para validar o CEP.
            var validacep = /^[0-9]{8}$/;

            //Valida o formato do CEP.
            if (validacep.test(cep)) {

                //Preenche os campos com "..." enquanto consulta webservice.
                $("#endereco").val("...");

                //Consulta o webservice viacep.com.br/
                $.getJSON("https://viacep.com.br/ws/" + cep + "/json/?callback=?", function(dados) {

                    if (!("erro" in dados)) {
                        //Atualiza os campos com os valores da consulta.
                        $("#endereco").val(dados.logradouro + " - " + dados.bairro + " - " + dados.localidade);
                    } //end if.
                    else {
                        //CEP pesquisado não foi encontrado.
                        limpa_formulário_cep();
                        $("#cep_msg").html("CEP não encontrado.");
                    }
                });
            } //end if.
            else {
                //cep é inválido.
                limpa_formulário_cep();
                $("#cep_msg").html("CEP inválido.");
            }
        } //end if.
        else {
            //cep sem valor, limpa formulário.
            limpa_formulário_cep();
        }
    }

    function salvar() {

        erro = false;

        // recuperando todos os campos
        cnpj = $("#cnpj").val();
        razao_social = $("#razao_social").val();
        data_abertura = $("#data_abertura").val();
        telefone = $("#telefone").val();
        email = $("#email").val();
        cep = $("#cep").val();
        endereco = $("#endereco").val();

        documento_1 = $("#documento_1").val();
        documento_2 = $("#documento_2").val();
        documento_3 = $("#documento_3").val();
        documento_4 = $("#documento_4").val();
        documento_5 = $("#documento_5").val();

        contato_1_nome = $("#contato_1_nome").val();
        contato_1_departamento = $("#contato_1_departamento").val();
        contato_1_email = $("#contato_1_email").val();

        contato_2_nome = $("#contato_2_nome").val();
        contato_2_departamento = $("#contato_2_departamento").val();
        contato_2_email = $("#contato_2_email").val();

        // validando CNPJ
        if (validarCNPJ(cnpj)) {
            $("#cnpj_msg").html("");
        } else {
            erro = true;
            $("#cnpj_msg").html("CNPJ inválido.");
        }

        // validando razao social
        if (razao_social.length > 5) {
            $("#razao_social_msg").html("");
        } else {
            erro = true;
            $("#razao_social_msg").html("Razão Social inválida.");
        }

        // validando razao social
        if (data_abertura.length == 10) {
            $("#data_abertura_msg").html("");
        } else {
            erro = true;
            $("#data_abertura_msg").html("Data inválida.");
        }

        // validando telefone
        if (telefone.length == 15) {
            $("#telefone_msg").html("");
        } else {
            erro = true;
            $("#telefone_msg").html("Telefone inválido.");
        }

        // validando email
        if (validarEmail(email)) {
            $("#email_msg").html("");
        } else {
            erro = true;
            $("#email_msg").html("E-mail inválido.");
        }

        // validando cep
        if (cep.length == 9) {
            $("#cep_msg").html("");
        } else {
            erro = true;
            $("#cep_msg").html("CEP inválido.");
        }

        // validando endereco
        if (endereco.length > 5) {
            $("#endereco_msg").html("");
        } else {
            erro = true;
            $("#endereco_msg").html("Endereço inválido.");
        }

        // validando contatos
        if (contato_1_nome.length > 0 &&
            contato_1_departamento.length > 0 &&
            contato_1_email.length > 0) {

            $("#contato_1_msg").html("");

            // validando email do contato 1
            if (!validarEmail(contato_1_email)) {
                erro = true;
                $("#contato_1_msg").html("E-mail inválido.");
            } else {
                $("#contato_1_msg").html("");
            }
        } else {
            erro = true;
            $("#contato_1_msg").html("Primeiro contato é obrigatório.");
        }

        // validando documentos
        /*
        if (documento_1.length == 0 &&
            documento_2.length == 0 &&
            documento_3.length == 0 &&
            documento_4.length == 0 &&
            documento_5.length == 0) {

            erro = true;
            $("#documentos_msg").html("Pelo menos 1 documento é obrigatório.");
        } else {
            $("#documentos_msg").html("");
        }
        */

        if (erro) {
            return false;
        } else {
            return true;
        }
    }
</script>

<?php
include("inc/footer.html");
?>