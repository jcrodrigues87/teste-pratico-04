let cep = document.querySelector('#cep')
let endereco = document.querySelector('#endereco')
let complemento = document.querySelector('#complemento')
let bairro = document.querySelector('#bairro')
let cidadde = document.querySelector('#cidadde')
let estado = document.querySelector('#estado')

let erros = document.querySelector('#erros').value

if (erros.length > 0) alert(erros)

function consultacep(){
    let url = `https://viacep.com.br/ws/${cep.value}/json/`

    fetch(url).then((response) => {
        response.json().then((data) => {
            let erro = data.erro ? true : false

            endereco.value = erro ? '' : data.logradouro
            complemento.value = erro ? '' : data.complemento
            bairro.value = erro ? '' : data.bairro
            cidade.value = erro ? '' : data.localidade
            estado.value = erro ? '' : data.uf

            if(erro) alert('CEP inválido')
        })
    })
}

cep.addEventListener('blur', consultacep)