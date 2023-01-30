import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Contato } from '../models/contato.model';

@Injectable({
  providedIn: 'root'
})
export class ContatoService {

  private listaContatos: any[];
  private url = 'http://localhost:3000';

  constructor(private httpClient: HttpClient) { this.listaContatos = []; }

  get contatos(): any[]{
    return this.listaContatos;
  }

  listar(id: string){
    let method = this.url + "/contato/listar";
    let formData = new FormData();
    formData.append("id", id);
    return this.httpClient.post<Contato[]>(method, formData);
  }

  salvar(contato: Contato): Observable<Contato>{
    let method = this.url + "/contato/incluir";
    let formData = new FormData();
    formData.append("id", contato.id);
    formData.append("contador", contato.contador);
    formData.append("departamento", contato.departamento);
    formData.append("email", contato.email);
    return this.httpClient.post<Contato>(method, formData);
  }
}
