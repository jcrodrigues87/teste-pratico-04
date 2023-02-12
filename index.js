//conexão com banco de dados

//const mysql = require('mysql2');
//const { emitKeypressEvents } = require('readline');

//const connection = mysql.createConnection({
// host: 'localhost',
//  user: 'root',
//  password: 'luis',
//   database: 'sys/Prestadores_de_serviço'
//});

//connection.connect();





//função valida formulario

function validateForm() {
    const form = document.querySelector('form');
    let isValid = true;

    for (const field of form) {
        if (field.type !== 'submit' && !field.value) {
            field.style.border = '1px solid red';
            isValid = false;
        } else {
            field.style.border = '';
        }
    }

    if (!isValid) {
        alert('Por favor, preencha todos os campos');
    }

    return isValid;
}
console.log('validateForm')


//envia os dados do formulário para o banco de dados usando o método fetch do JavaScript

function sendFormData(event) {
    event.preventDefault();

    if (!validateForm()) {
        return;
    }

    const form = document.querySelector('form');
    const formData = new FormData(form);

    fetch('/banco-de-dados/salvar', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            console.log('Dados enviados com sucesso:', data);
        })
        .catch(error => {
            console.error('Erro ao enviar dados:', error);
        });
}

const form = document.querySelector('form');
form.addEventListener('submit', sendFormData);