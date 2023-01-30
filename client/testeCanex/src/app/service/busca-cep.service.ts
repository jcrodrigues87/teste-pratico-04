import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class BuscaCepService {

  private resultado: any;
  private baseUrl: string;
  private method: string;

  constructor(private httpClient: HttpClient) {
    // this.testa();
    this.baseUrl = "http://viacep.com.br/ws/";
    this.method = "/json/";
  }

  buscar(cep: string){
    let url = this.baseUrl + cep + this.method;
    console.log("Buscando cep " + cep);
    return this.httpClient.get(url);
  }

  testa(){
    this.resultado = {
      cep: "37925-000",
      logradouro: "",
      complemento: "",
      bairro: "",
      localidade: "Piumhi",
      uf: "MG",
      ibge: "3151503",
      gia: "",
      ddd: "37",
      siafi: "5029"
    };
  }
}
