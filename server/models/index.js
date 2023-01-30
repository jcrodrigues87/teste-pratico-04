export default class Prestador{
    

    constructor(
        cnpj,
        razao,
        dataAbertura,
        telefone,
        email,
        cep,
        endereco
    ){
        this.cnpj = cnpj;
        this.razao = razao;
        this.dataAbertura = dataAbertura;
        this.telefone = telefone;
        this.email = email;
        this.cep = cep;
        this.endereco = endereco;
    }
}