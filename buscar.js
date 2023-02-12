//conexão com banco de dados

//const mysql = require('mysql2');
//const { emitKeypressEvents } = require('readline');

//const connection = mysql.createConnection({
//  host: 'localhost',
//   user: 'root',
//   password: 'luis',
//  database: 'prestadores_de_serviço'
//});

//connection.connect();


// Função para buscar dados no banco de dados
function searchData(query) {
    const database = [
        { cnpj: "01.234.567/0001-89", razaoSocial: "Empresa 1", email: "contato@empresa1.com" },
        { cnpj: "98.765.432/0010-12", razaoSocial: "Empresa 2", email: "contato@empresa2.com" },
        // ...
    ];

    // Filtre o banco de dados com base na consulta
    const result = database.filter(item => {
        return (
            item.cnpj.includes(query) ||
            item.razaoSocial.toLowerCase().includes(query.toLowerCase()) ||
            item.email.toLowerCase().includes(query.toLowerCase())
        );
    });

    // Retorna o resultado
    return result;
}

// Evento de submit para o formulário de pesquisa
document.getElementById("search-form").addEventListener("submit", function(event) {
    event.preventDefault();

    // Obtenha o valor da consulta da barra de pesquisa
    const query = document.getElementById("search-query").value;

    // Realize a busca dos dados
    const result = searchData(query);

    // Exiba o resultado na tela
    console.log(result);
});