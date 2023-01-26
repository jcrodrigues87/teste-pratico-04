import { ClienteService } from 'src/app/service/cliente.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Cliente } from 'src/app/models/cliente.model';

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

  constructor(private service: ClienteService) {}

  ngOnInit() {
    // this.testar();
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

      this.limpar();
    },
    error => console.log(error)
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

      this.limpar();
    },
    error => console.log(error)
    );
  }

  pesquisar(){
    let resultado = this.service.pesquisaPorEmail(this.email)
    .subscribe(
      resultado => resultado,
      error => console.log(error)
    );
    console.log(resultado);

  }
}
