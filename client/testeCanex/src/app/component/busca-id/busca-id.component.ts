import { Component, OnInit } from '@angular/core';
import { ClienteService } from 'src/app/service/cliente.service';
import { Cliente } from 'src/app/models/cliente.model';

@Component({
  selector: 'app-busca-id',
  templateUrl: './busca-id.component.html',
  styleUrls: ['./busca-id.component.css']
})
export class BuscaIdComponent implements OnInit {

  id: string;
  clientes: any[] = [];

  constructor(private service: ClienteService) { }

  ngOnInit(): void {
  }

  pesquisar(){
    this.service.pesquisaPorId(this.id)
    .subscribe((resultado) => {
      this.clientes.push(resultado);
    },
    error => console.log(error)
    );

  }

}
