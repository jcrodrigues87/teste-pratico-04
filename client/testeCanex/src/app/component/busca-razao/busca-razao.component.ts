import { Component, OnInit } from '@angular/core';
import { ClienteService } from 'src/app/service/cliente.service';

@Component({
  selector: 'app-busca-razao',
  templateUrl: './busca-razao.component.html',
  styleUrls: ['./busca-razao.component.css']
})
export class BuscaRazaoComponent implements OnInit {

  razao: string;
  clientes: any[] = [];

  constructor(private service: ClienteService) { }

  ngOnInit(): void {
  }

  pesquisar(){
    this.service.pesquisaPorRazao(this.razao)
    .subscribe((resultado) => {
      console.log(resultado);
      this.clientes = resultado;
    },
    error => console.log(error)
    );
  }

}
