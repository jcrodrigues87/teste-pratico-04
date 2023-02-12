function buscaCep() {
    let cep = document.getElementById('txtCep').value;
    if (cep !== "") {
        let url = "https://brasilapi.com.br/api/cep/v1/" + cep;

        let req = new XMLHttpRequest();
        req.open("GET", url);
        req.send();

        //tratar resposta da requisição
        req.onload = function() {
            if (req.status === 200) {
                let endereço = JSON.parse(req.response); // requisição dos elementos da api //
                document.getElementById("txtcidade").value = endereço.city;
                document.getElementById("txtEstado").value = endereço.state;
            } else if (req.status === 404) {
                alert("Cep inválido");
            } else {
                alert("Erro ao fazer a requisição");
            }
        }
    }
} //evento de saida do txtCep
window.onload = function() {
    let txtCep = document.getElementById("txtCep");
    txtCep.addEventListener("blur", buscaCep);
}