import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClienteComponent } from './component/cliente/cliente.component';
import { BuscaComponent } from './component/busca/busca.component';

import localePt from "@angular/common/locales/pt";
import { registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BuscaIdComponent } from './component/busca-id/busca-id.component';
import { BuscaCnpjComponent } from './component/busca-cnpj/busca-cnpj.component';
import { BuscaRazaoComponent } from './component/busca-razao/busca-razao.component';
import { BuscaEmailComponent } from './component/busca-email/busca-email.component';
import { ContatoComponent } from './component/contato/contato.component';
import { ListaContatoComponent } from './component/lista-contato/lista-contato.component';

registerLocaleData(localePt, 'pt');

@NgModule({
  declarations: [
    AppComponent,
    ClienteComponent,
    BuscaComponent,
    BuscaIdComponent,
    BuscaCnpjComponent,
    BuscaRazaoComponent,
    BuscaEmailComponent,
    ContatoComponent,
    ListaContatoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    {provide: LOCALE_ID, useValue: "pt"},
    {provide: DEFAULT_CURRENCY_CODE, useValue: "BRL"}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
