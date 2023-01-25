import { Component, OnInit } from '@angular/core';
import { ClienteService } from 'src/app/service/cliente.service';

@Component({
  selector: 'app-busca-genero',
  templateUrl: './busca-genero.component.html',
  styleUrls: ['./busca-genero.component.css']
})
export class BuscaGeneroComponent implements OnInit {

  genero: string;
  clientes: any[] = [];

  constructor(private service: ClienteService) { }

  ngOnInit(): void {
  }

  pesquisar(){
    // this.service.pesquisaPorGenero(this.genero)
    // .subscribe((resultado) => {
    //   console.log(resultado);
    //   this.clientes = resultado;
    // },
    // error => console.log(error)
    // );
  }

}
