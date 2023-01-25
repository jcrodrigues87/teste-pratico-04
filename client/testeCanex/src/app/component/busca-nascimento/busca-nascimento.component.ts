import { Component, OnInit } from '@angular/core';
import { ClienteService } from 'src/app/service/cliente.service';

@Component({
  selector: 'app-busca-nascimento',
  templateUrl: './busca-nascimento.component.html',
  styleUrls: ['./busca-nascimento.component.css']
})
export class BuscaNascimentoComponent implements OnInit {

  dataInicial: Date;
  dataFinal: Date;
  clientes: any[] = [];

  constructor(private service: ClienteService) { }

  ngOnInit(): void {
  }

  pesquisar(){
    // this.service.pesquisaPorNascimento(this.dataInicial, this.dataFinal)
    // .subscribe((resultado) => {
    //   console.log(resultado);
    //   this.clientes = resultado;
    // },
    // error => console.log(error)
    // );
  }

}
