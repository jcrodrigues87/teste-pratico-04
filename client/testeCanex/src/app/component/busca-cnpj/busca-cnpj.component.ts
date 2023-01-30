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
    error => {
      console.log(error);
      this.mostraMensagem("Nenhum prestador foi encontrado com o CNPJ informado", "danger");
    }
    );
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

}
