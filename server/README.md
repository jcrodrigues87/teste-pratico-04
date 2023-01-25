## Teste para a empresa Canex

## Pré-requisitos

	- Node.JS: https://nodejs.org/en/download/
	- MySQL: https://nodejs.org/en/download/
	- Crie um novo banco de dados com o nome "canex". Comando: "CREATE DATABASE canex;"

## Passo a passo

	- Abra um terminal e vá até a pasta onde estão os arquivos
	- Digite "npm install" e dê enter para instalar todas as dependências
	- Renomeie o arquivo "env.example" para ".env" e altere os parâmetros conforme necessário
	- Digite "npm start" para iniciar o servidor

## Métodos para inclusão/alteração/exclusão de clientes
	- URL:
		- http://localhost:3000/client
	- Inclusão
		- Método: POST
	- Alteração
		- Método: PUT
	- Exclusão
		- Método: DELETE

## Dados necessários nas requisições
	- Nome
	- Cpf
	- Estado civil
	- Pai
	- Mãe
	- Cônjuge
	- RG
	- Salário
	- Espécie
	- Titulo dee leitor
	- Sexo
	- Celular
	- Cep
	- Endereço
	- Complemento
	- Numero
	- Bairro
	- Email
	- Cidade
	- Data de nascimento

## Exemplo de request
```
{
	"nome": "TESTE",
	"cpf": "215.192.776-87",
	"estadocivil": "2",
	"pai": "",
	"mae": "",
	"conjuge": "esposa",
	"rg": "419656",
	"salario": "54190",
	"especie": "M",
	"titulodeeleitor": "61138530230",
	"sexo": "F",
	"celular": "",
	"cep": "14802428",
	"endereco": "rua rolando luppo, 444",
	"complemento": "",
	"numero": "444",
	"bairro": "vila harmonia",
	"email": "-",
	"cidade": "FRANCA",
	"datadenascimento": "09/08/1953"
}
```

## Métodos de busca
	
	- URL: http://localhost:3000/find
	- Método: POST
	- Busca por ID
		- URL: /id
		- Corpo da requisição: id
		- Exemplo: {"id": "2"}
	- Busca por gênero
		- URL: /gender
		- Corpo da requisição: gender
		- Exemplo: {"gender": "m"}
	- Busca por aniversário
		- URL: /birthday
		- Corpo da requisição: birthday
		- Exemplo: {"birthday": "01/01/2000"}

## Totalizadores
	
	- URL: http://localhost:3000/find
	- Método: POST
	- Totalizador por gênero
		- Corpo da requisição: {"method": "gender"}
	- Totalizador por cidade
		- Corpo da requisição: {"method": "gender"}
	- Totalizador por espécie
		- Corpo da requisição: {"method": "gender"}

## Exportar para XML / Importar de XML

	- URL: http://localhost:3000/xml
	- Método: GET
	- Importar
		- URL: /import
		- Local do arquivo: public/clientes.xml
	- Exportar
		- URL: /export
		- Local do arquivo: public/export.xml

## Observações gerais
	- Todos os métodos devem ser enviados como JSON
	- Todos os métodos devem ser enviados com o cabeçalho (Content-Type: application/json)
	- O CORS está habilitado para funcionar com o frontend desenvolvido
## Contatos:

	- Telefone (WhatsApp): (37) 9-9943-5990
	- Email: matheusfelipemiranda1@gmail.com
