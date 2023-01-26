import { Component, OnInit } from '@angular/core';
import { ClienteService } from 'src/app/service/cliente.service';

@Component({
  selector: 'app-busca-email',
  templateUrl: './busca-email.component.html',
  styleUrls: ['./busca-email.component.css']
})
export class BuscaEmailComponent implements OnInit {

  email: string;
  clientes: any[] = [];

  constructor(private service: ClienteService) { }

  ngOnInit(): void {
  }

  pesquisar(){
    this.service.pesquisaPorEmail(this.email)
    .subscribe((resultado) => {
      console.log(resultado);
      this.clientes = resultado;
    },
    error => console.log(error)
    );
  }

}
