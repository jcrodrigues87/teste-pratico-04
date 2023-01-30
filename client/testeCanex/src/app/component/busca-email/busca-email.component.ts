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
    error => {
      console.log(error)
      this.mostraMensagem("Nenhum prestador foi encontrado com o e-mail informado", "danger");
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
