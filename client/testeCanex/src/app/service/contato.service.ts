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

  // Headers
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  constructor(private httpClient: HttpClient) { this.listaContatos = []; }

  get contatos(): any[]{
    return this.listaContatos;
  }

  pesquisar(id: string){
    let method = this.url + "/contato/pesquisar";
    let body = {id};
    return this.httpClient.post<Contato>(method, body, this.httpOptions);
  }

  salvar(contato: Contato): Observable<Contato>{
    let method = this.url + "/contato/incluir";
    return this.httpClient.post<Contato>(method, JSON.stringify(contato), this.httpOptions);
  }
}
