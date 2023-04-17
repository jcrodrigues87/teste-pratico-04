# Teste Prático

O objetivo deste teste é conhecer suas habilidades em:

* Desenvolvimento Web (Tecnologias, Linguagens de programação, Frameworks, Banco de Dados, HTML, CSS e JavaScript);
* Entendimento e análise dos requisitos;
* Modelagem de banco de dados;
* Integração com WebServices;

Você deve desenvolver uma pequena aplicação WEB utilizando a linguagem de programação, framework(s) e banco de dados relacional de sua preferência.

## Problema

### Canal de Relacionamento com Prestadores de Serviço

* Uma empresa deseja implementar um canal de relacionamento com prestadores de serviço, para isso ela deseja desenvolver uma aplicação web para que os prestadores façam seu cadastro e envie a documentação necessária;
* O cadastro deve conter os seguintes dados do prestador: CNPJ, razão social, data de abertura, telefone, e-mail, CEP, endereço, contatos (nome do contado, departamento, e-mail) e documentos (alvará de funcionamento, comprovante de endereço, outros)
* Campo endereço deve ser preenchido automaticamente ao informar o CEP;
* O prestador pode ter um ou mais contatos e no mínimo um;
* No momento do cadastro deve ser possível realizar o upload dos documentos;
* Deve ser possível visualizar uma lista com os prestadores de serviço;
* Selecionando um item da listagem de prestadores de serviço deve ser possível visualizar seu cadastro completo e documentos anexados;
* Na listagem de prestadores de serviço deve ser possível realizar consultas por CNPJ, razão social e e-mail;

## Orientações

* Nesta aplicação é necessário desenvolver apenas duas páginas, uma para listar e outra para realizar o cadastro do prestador de serviços;
* Não é necessário implementar login ou outra forma de autenticação;
* O banco de dados não pode permitir 2 prestadores com o mesmo e-mail;
* Deve usar o webservice da ViaCEP (https://viacep.com.br/) para preencher o endereço após preencher o campo CEP;

## Entrega

* Para iniciar o teste, faça um fork deste repositório, crie uma branch com o seu nome completo e depois envie-nos o pull request. Se você apenas clonar o repositório não vai conseguir fazer push e depois vai ser mais complicado fazer o pull request;
* edite este README explicando como executar e testar a aplicação;
* Todos os arquivos necessários para rodar o projeto devem estar no repositório do github;


## Diferenciais

* Qualidade do código escrito;
* Testes unitários;
* Comentários claros no código;
* Commits com mensagens claras;
* Executar a aplicação em containers Docker;
* Setup da aplicação em apenas um comando ou um script que facilite esse setup;


## Setup

* Clone o projeto para um sistema Linux;
* Execute o shell script install.sh que se encontra na raiz do projeto;
* Este script ira instalar o seguinte:
* sqlite;
* python3;
* pip3 (instalador de pacotes do Python);
* pacotes do Python;
* Após isso o script irá gerar o banco de dados;
* Depois de executar o install.sh, vá até a raiz do projeto e execute o comando "python3 app.py";


## Funcionalidades entregues
* CRUD básico;
* Lista dos prestadores de serviço;
* Filtragem da lista por CNPJ, Razão Social e email;
* Clicar em um prestador da lista para exibir os detalhes e ter possibilidade de editar os dados;
* Autopreenchimento do endereço com ViaCep;
* Impede o cadastro de 2 prestadores com o mesmo e-mail;


## Funcionalidades pendentes
* Upload de documentos;
* Os contatos do prestador: apenas foi feito o relacionamento no banco de dados, não foi feita a implementação das funcionalidades na tela e nem no controler (blueprint);


