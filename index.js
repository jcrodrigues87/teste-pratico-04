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





// selecionando o formulário e os campos de entrada
const form = document.querySelector('form');
const nomeInput = document.getElementById('nome');
const idadeInput = document.getElementById('idade');
const localizacaoInput = document.getElementById('localizaçao');
const biografiaInput = document.getElementById('biografia');

// adicionando um ouvinte de evento ao formulário
form.addEventListener('submit', function(e) {
    e.preventDefault(); // impedindo o envio padrão do formulário

    // obtendo os valores dos campos de entrada
    const nome = nomeInput.value;
    const idade = idadeInput.value;
    const localizacao = localizacaoInput.value;
    const biografia = biografiaInput.value;

    // fazendo uma solicitação para atualizar o perfil
    fetch('/atualizar_perfil', {
            method: 'POST',
            body: JSON.stringify({ nome, idade, localizacao, biografia }),
            headers: { 'Content-Type': 'application/json' }
        })
        .then(response => {
            if (response.ok) {
                alert('Perfil atualizado com sucesso!');
                location.reload(); // recarregando a página após a atualização
            } else {
                throw new Error('Erro ao atualizar perfil');
            }
        })
        .catch(error => {
            alert(error.message);
        });
});