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
    error => {console.log(error); this.mostraMensagem("Nenhum prestador foi encontrado com a razão social informada", "danger")}
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
