import { BuscaCepService } from './../../service/busca-cep.service';
import { ClienteService } from 'src/app/service/cliente.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Cliente } from 'src/app/models/cliente.model';
import { UploadService } from 'src/app/service/upload.service';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css'],
})
export class ClienteComponent implements OnInit {
  @Output() aoSalvar = new EventEmitter<any>();

  cnpj: string = '';
  razao: string = '';
  abertura: Date = new Date();
  telefone: string = '';
  email: string = '';
  cep: string = '';
  endereco: string = '';

  resultado: any = {
    cep: "",
    logradouro: "",
    complemento: "",
    bairro: "",
    localidade: "",
    uf: "",
    ibge: "",
    gia: "",
    ddd: "",
    siafi: ""
  };

  selectedFiles: any[] = [];

  constructor(private service: ClienteService, private busca: BuscaCepService, private uploadService: UploadService) {}

  ngOnInit() {
    this.testar();
  }

  salvar() {

    console.log("Salvando cliente " + this.cnpj);

    let cliente: Cliente = {
      cnpj: this.cnpj,
      razao: this.razao,
      abertura: this.abertura,
      telefone: this.telefone,
      email: this.email,
      cep: this.cep,
      endereco: this.endereco,
    };


    this.service.salvar(cliente).subscribe((resultado) => {

      this.mostraMensagem("Cliente salvo com sucesso!", "success")
      this.limpar();
    },
    error => {console.log(error); this.mostraMensagem("Não foi possível salvar o cliente", "danger");}
    );
  }

  testar() {
    this.cnpj = "12345678910";
    this.razao = "teste matheus";
    this.abertura = new Date();
    this.telefone = "37999435990";
    this.email = "matheus@email.com";
    this.cep = "37925000";
    this.endereco = "Rua Helena Rosália Silva, 74";
  }

  limpar() {
    this.cnpj = "";
    this.razao = "";
    this.abertura = new Date();
    this.telefone = "";
    this.email = "";
    this.cep = "";
    this.endereco = "";
  }

  alterar(){
    console.log("Alterando cliente " + this.cnpj);

    let cliente: Cliente = {
      cnpj: this.cnpj,
      razao: this.razao,
      abertura: this.abertura,
      telefone: this.telefone,
      email: this.email,
      cep: this.cep,
      endereco: this.endereco,
    };

    this.service.alterar(cliente).subscribe((resultado) => {

      this.mostraMensagem("Cliente alterado com sucesso!", "success")
      this.limpar();
    },
    error => {console.log(error); this.mostraMensagem("Não foi possível alterar o cliente", "danger")}
    );
  }

  buscar(){

    let subscriber = this.busca.buscar(this.cep);

    // this.endereco = "";

    subscriber.subscribe(resultado => {
      this.resultado = resultado;
      if (this.resultado.logradouro !== "") this.endereco += ", " + this.resultado.logradouro + ", ";
      if (this.resultado.complemento !== "") this.endereco += ", " + this.resultado.complemento + ", ";
      if (this.resultado.bairro !== "") this.endereco += ", " + this.resultado.bairro + ", ";
      if (this.resultado.localidade !== "") this.endereco += ", " + this.resultado.localidade + ", ";
      if (this.resultado.uf !== "") this.endereco += ", " + this.resultado.uf;
    }, erro => {console.log(erro); this.mostraMensagem("Não foi possível buscar o cep " + this.cep, "danger")});

  }

  mostraMensagem(mensagem: string, nivel: string){
    const alertPlaceholder = document.getElementById('liveAlertPlaceholder')

    const alert = (message: string, level: string) => {
      const wrapper = document.createElement('div')
      wrapper.innerHTML = [
        `<div class="alert alert-${level} alert-dismissible" role="alert">`,
        `   <div>${message}</div>`,
        '</div>'
      ].join('')

      alertPlaceholder.append(wrapper)

      setTimeout(() => {
        wrapper.remove();
      }, 3000);
    }

    alert(mensagem, nivel)

  }

  upload(){

    const formData = new FormData();

    formData.append("id", this.cnpj);

    this.selectedFiles.forEach(file => {
      formData.append("files", file, file.name);
    });

    formData.forEach((value, key) => {console.log(key + " = " + value)});

    this.uploadService.salvar(formData).subscribe(
      result => {
        this.mostraMensagem("Arquivo(s) enviado(s) corretamente!", "success")
      },
      error => {
        this.mostraMensagem("Não foi possível enviar o(s) arquivo(s)", "danger");
        console.log(error);
      }
    );
  }

  onFileSelect(event: any){

    for (let i = 0; i < event.target.files.length; i++){
      let file = event.target.files[i];
      this.selectedFiles.push(file);
    }
  }

}
