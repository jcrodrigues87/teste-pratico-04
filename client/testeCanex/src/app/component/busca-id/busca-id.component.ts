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
    error => {console.log(error); this.mostraMensagem("Nenhum prestador foi encontrado com o ID informado", "danger");}
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
