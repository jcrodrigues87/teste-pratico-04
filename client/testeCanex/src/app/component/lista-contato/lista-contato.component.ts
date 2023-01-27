import { Component, OnInit } from '@angular/core';
import { ContatoService } from 'src/app/service/contato.service';

@Component({
  selector: 'app-lista-contato',
  templateUrl: './lista-contato.component.html',
  styleUrls: ['./lista-contato.component.css']
})
export class ListaContatoComponent implements OnInit {

  id: string;
  contatos: any[] = [];

  constructor(private service: ContatoService) { }

  ngOnInit(): void {
  }

  pesquisar(): void{
    this.service.listar(this.id).subscribe(
      resultado => {
        this.contatos = resultado;
      },
      erro => {
        console.log(erro);
        this.mostraMensagem("Nenhum contato foi encontrado com o ID informado", "danger");
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
