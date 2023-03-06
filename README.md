# Informações para rodar o sistema

* Tenha o SGBD mySQL instalado no computador
* Tenha o Spring Tools Suite instalado
* Tenha o VSCODE instalado
* Tenha o NodeJS instalado
* Criar um banco de dados com o nome 'prestadores_servico' e o selecionar para rodar os próximos script

	script: create database prestadores_servico;  
	script: use prestadores_servico;

* Criar as tabelas das entidades na ordem a seguir:

		CREATE TABLE `endereco` (
		  `id_endereco` int NOT NULL AUTO_INCREMENT,
		  `cep` char(8) NOT NULL,
		  `logradouro` varchar(50) NOT NULL,
		  `bairro` varchar(50) NOT NULL,
		  `cidade` varchar(50) NOT NULL,
		  `numero` varchar(7) NOT NULL,
		  `uf` char(2) NOT NULL,
		  `pais` varchar(50) NOT NULL,
		  `complemento` varchar(20) DEFAULT NULL,
		  PRIMARY KEY (`id_endereco`)
		)ENGINE=InnoDB AUTO_INCREMENT=66 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

		CREATE TABLE `prestador_servico` (
		  `cnpj` char(14) NOT NULL,
		  `razao_social` varchar(30) NOT NULL,
		  `data_abertura` date NOT NULL,
		  `telefone` char(11) DEFAULT NULL,
		  `email` varchar(100) DEFAULT NULL,
		  `fk_id_endereco` int DEFAULT NULL,
		  PRIMARY KEY (`cnpj`),
		  KEY `prestador_servico_ibfk_1` (`fk_id_endereco`),
		  CONSTRAINT `prestador_servico_ibfk_1` FOREIGN KEY (`fk_id_endereco`) REFERENCES `endereco` (`id_endereco`) ON DELETE CASCADE ON UPDATE CASCADE
		)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

		CREATE TABLE `contato` (
		  `email` varchar(100) NOT NULL,
		  `nome` varchar(60) NOT NULL,
		  `departamento` varchar(20) DEFAULT NULL,
		  `fk_cnpj_prestador_servico` char(14) DEFAULT NULL,
		  PRIMARY KEY (`email`),
		  KEY `fk_cnpj_prestador_servico` (`fk_cnpj_prestador_servico`),
		  CONSTRAINT `contato_ibfk_1` FOREIGN KEY (`fk_cnpj_prestador_servico`) REFERENCES `prestador_servico` (`cnpj`)
		)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

* Instalar o vuejs3 via CLI:

No VSCODE digite (Ctrl + ") para abrir o terminal

  execute o comando abaixo: 

    npm install -g @vue/cli

* Clonar os repositórios 'prestador-back' e 'prestador-front'
* Abrir a pasta 'prestadorDeServico' do repositório 'prestador-back' no Spring Tools Suite
* Abrir a pasta 'prestadores-servico' do repositório 'prestador-front' no VSCODE
* No Spring Tools Suite na aba 'Boot Dashboard' clique uma vez no nome do projeto 'prestadorDeServico' e clique no 1º ícone quadrado
com uma seta verde ou digite 'Ctrl + Alt + Shift + B, R' para startar a API do sistema

* No VSCODE digite (Ctrl + ") para abrir o terminal
* No terminal digite 'npm run serve' para subir o servidor da aplicação 
* Quando a aplicação estiver carregada aparecerá um link indicando o servidor onde a aplicação subiu
* Segure a tecla 'Ctrl' e clique com o mouse sobre o link
* Nesse momento você estará dentro da aplicação e poderá usá-la

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
