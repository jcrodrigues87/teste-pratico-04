import { ContatoService } from './../../service/contato.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Contato } from "../../models/contato.model";

@Component({
  selector: 'app-contato',
  templateUrl: './contato.component.html',
  styleUrls: ['./contato.component.css']
})
export class ContatoComponent implements OnInit {

  @Output() aoSalvar = new EventEmitter<any>();

  prestadorId: string = '';
  contador: string = '';
  departamento: string = '';
  email : string = '';

  constructor(private service: ContatoService) { }

  ngOnInit(): void {
    this.testar();
  }

  testar(){
    this.prestadorId = "1";
    this.contador = "testeContador";
    this.departamento = "TI";
    this.email = "teste@email.com";
  }

  salvar(){

    let contato: Contato = {
      id: this.prestadorId,
      contador: this.contador,
      departamento: this.departamento,
      email: this.email
    }

    this.service.salvar(contato).subscribe(
      resultado => {
        this.mostraMensagem("Contato salvo com sucesso!", "success");
        this.limpar();
      },
      error => {
        console.log(error);
        this.mostraMensagem("Não foi possível salvar o contato", "danger");
      }
    );
  }

  limpar(){
    this.prestadorId = '';
    this.contador = '';
    this.departamento = '';
    this.email = '';
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
