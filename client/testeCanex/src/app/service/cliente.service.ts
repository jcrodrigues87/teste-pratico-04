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

  constructor(private httpClient: HttpClient) {
    this.listaClientes = [];
  }

  get clientes(): any[]{
    return this.listaClientes;
  }

  salvar(cliente: Cliente): Observable<Cliente>{
    let method = this.url + "/prestador";
    let formData = new FormData();
    formData.append("abertura", this.formataData(cliente.abertura));
    formData.append("cep", cliente.cep);
    formData.append("cnpj", cliente.cnpj);
    formData.append("email", cliente.email);
    formData.append("endereco", cliente.endereco);
    formData.append("razao", cliente.razao);
    formData.append("telefone", cliente.telefone);
    return this.httpClient.post<Cliente>(method, formData);
  }

  alterar(cliente: Cliente): Observable<Cliente>{
    let method = this.url + "/prestador/alterar";
    let formData = new FormData();
    formData.append("abertura", this.formataData(cliente.abertura));
    formData.append("cep", cliente.cep);
    formData.append("cnpj", cliente.cnpj);
    formData.append("email", cliente.email);
    formData.append("endereco", cliente.endereco);
    formData.append("razao", cliente.razao);
    formData.append("telefone", cliente.telefone);
    return this.httpClient.put<Cliente>(method, formData);
  }

  excluir(cliente: Cliente): Observable<Cliente>{
    let method = this.url + "/prestador/excluir";
    let formData = new FormData();
    formData.append("abertura", this.formataData(cliente.abertura));
    formData.append("cep", cliente.cep);
    formData.append("cnpj", cliente.cnpj);
    formData.append("email", cliente.email);
    formData.append("endereco", cliente.endereco);
    formData.append("razao", cliente.razao);
    formData.append("telefone", cliente.telefone);
    return this.httpClient.put<Cliente>(method, formData);
  }

  pesquisaPorId(id: string){
    let method = this.url + "/find/id";
    let formData = new FormData();
    formData.append("id", id);
    return this.httpClient.post<Cliente[]>(method, formData);
  }

  pesquisaPorCnpj(cnpj: string){
    let method = this.url + "/find/cnpj";
    let formData = new FormData();
    formData.append("cnpj", cnpj);
    return this.httpClient.post<Cliente[]>(method, formData);
  }

  pesquisaPorRazao(razao: string){
    let method = this.url + "/find/razao";
    let formData = new FormData();
    formData.append("razao", razao);
    return this.httpClient.post<Cliente[]>(method, formData);
  }

  pesquisaPorEmail(email: string){
    let method = this.url + "/find/email";
    let formData = new FormData();
    formData.append("email", email);
    return this.httpClient.post<Cliente[]>(method, formData);
  }

  pesquisaTotal(){
    let method = this.url + "/find";
    let formData = new FormData();
    return this.httpClient.post<Cliente[]>(method,null);
  }

  formataData(data: string | Date): string{
    let dataFormatada = "2023-01-29";
    if (data === undefined) return dataFormatada;
    data = data.toString();
    if (typeof(data !== "string")) dataFormatada = data.toLocaleString();
    return dataFormatada;
  }

}

