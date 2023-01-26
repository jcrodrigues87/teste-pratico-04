import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Cliente } from '../models/cliente.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private listaClientes: any[];
  private url = 'http://localhost:3000';

  // Headers
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  constructor(private httpClient: HttpClient) {
    this.listaClientes = [];
  }

  get clientes(): any[]{
    return this.listaClientes;
  }

  salvar(cliente: Cliente): Observable<Cliente>{
    let method = this.url + "/prestador";
    return this.httpClient.post<Cliente>(method, JSON.stringify(cliente), this.httpOptions);
  }

  pesquisaPorId(id: string){
    let method = this.url + "/find/id";
    let body = {id};
    return this.httpClient.post<Cliente[]>(method, body, this.httpOptions);
  }

  pesquisaPorCnpj(cnpj: string){
    let method = this.url + "/find/cnpj";
    let body = {"cnpj": cnpj};
    return this.httpClient.post<Cliente[]>(method, body, this.httpOptions);
  }

  pesquisaPorRazao(razao: string){
    let method = this.url + "/find/razao";
    let body = {"razao": razao};
    return this.httpClient.post<Cliente[]>(method, body, this.httpOptions);
  }

  pesquisaPorEmail(email: string){
    let method = this.url + "/find/email";
    let body = {"email": email};
    return this.httpClient.post<Cliente[]>(method, body, this.httpOptions);
  }

  pesquisaTotal(){
    let method = this.url + "/find";
    return this.httpClient.post<Cliente[]>(method, this.httpOptions);
  }

  formataData(data: Date): string{
    return data.toString().split('-').reverse().join('/');
  }
}

