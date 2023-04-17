const prestadores = document.querySelectorAll('#prestadores tr')

let lista = document.querySelector('#prestadores')

let filtro_cnpj = document.querySelector('#filtro_cnpj')
let filtro_razao_social = document.querySelector('#filtro_razao_social')
let filtro_email = document.querySelector('#filtro_email')

function filtra_prestadores(){
    prestadores.forEach(prestador => {

        if (filtro_cnpj.value && !prestador.querySelector('.cnpj').textContent.startsWith(filtro_cnpj.value)) {
            console.log('removendo cnpj ' + prestador.querySelector('.cnpj').textContent)
            prestador.remove()
            return
        }

        if (filtro_razao_social.value && !prestador.querySelector('.razao_social').textContent.includes(filtro_razao_social.value)) {
            console.log('removendo razao_social ' + prestador.querySelector('.razao_social').textContent)
            prestador.remove()
            return
        }

        if (filtro_email.value && !prestador.querySelector('.email').textContent.includes(filtro_email.value)) {
            console.log('removendo email ' + prestador.querySelector('.email').textContent)
            prestador.remove()
            return
        }
    
        if (lista.contains(prestador)) {
            return
        }

        lista.appendChild(prestador)
    })
}

filtro_cnpj.addEventListener('keyup', filtra_prestadores)
filtro_razao_social.addEventListener('keyup', filtra_prestadores)
filtro_email.addEventListener('keyup', filtra_prestadores)