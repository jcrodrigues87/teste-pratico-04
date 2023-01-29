import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  url: string = 'http://localhost:3000';

  constructor(private httpClient: HttpClient) { }

  salvar(formulario: FormData): Observable<any>{
    console.log("Salvando os dados para upload");

    let method = this.url + "/upload";

    return this.httpClient.post<any>(method, formulario);
  }
}
