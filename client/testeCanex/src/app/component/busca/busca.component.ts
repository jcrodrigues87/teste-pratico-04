import { Cliente } from './../../models/cliente.model';
import { Component, Input, OnInit } from '@angular/core';
import { ClienteService } from 'src/app/service/cliente.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-busca',
  templateUrl: './busca.component.html',
  styleUrls: ['./busca.component.css']
})
export class BuscaComponent implements OnInit {

  @Input() clientes: any[];

  constructor(private service: ClienteService, private router: Router) { }

  ngOnInit(): void {
    this.service.pesquisaTotal().subscribe(
      (clientes: Cliente[]) => {
      // console.table(clientes);
      this.clientes = clientes;

      },
      erro => {
        this.mostraMensagem("Não foi possível listar os prestadores", "danger");
        console.log(erro);

      }
    );
  }

  excluir(cliente: Cliente){

    const clienteEnvio = {
      cnpj: cliente.cnpj,
      razao: cliente.razao,
      abertura: cliente.abertura,
      telefone: cliente.telefone,
      email: cliente.email,
      cep: cliente.cep,
      endereco: cliente.endereco
    };

    this.service.excluir(cliente).subscribe(
      resultado => {
        console.log(resultado);
        this.mostraMensagem("Prestador excluído com sucesso!", "success");
      },
      erro => {
        this.mostraMensagem("Não foi possível excluir o prestador", "danger")
      }
      );

  }

  alterar(cliente: Cliente){

    const clienteEnvio = {
      cnpj: cliente.cnpj,
      razao: cliente.razao,
      abertura: cliente.abertura,
      telefone: cliente.telefone,
      email: cliente.email,
      cep: cliente.cep,
      endereco: cliente.endereco
    };

    this.router.navigate(['/cliente']);

    // this.service.alterar(cliente).subscribe(resultado => console.log(resultado));

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
