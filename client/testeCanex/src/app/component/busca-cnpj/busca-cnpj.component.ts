import { Component, OnInit } from '@angular/core';
import { ClienteService } from 'src/app/service/cliente.service';

@Component({
  selector: 'app-busca-cnpj',
  templateUrl: './busca-cnpj.component.html',
  styleUrls: ['./busca-cnpj.component.css']
})
export class BuscaCnpjComponent implements OnInit {

  cnpj: string;
  clientes: any[] = [];

  constructor(private service: ClienteService) { }

  ngOnInit(): void {
  }

  pesquisar(): void{
    this.service.pesquisaPorCnpj(this.cnpj)
    .subscribe((resultado) => {
      console.log(resultado);
      this.clientes = resultado;
    },
    error => console.log(error)
    );
  }

}
