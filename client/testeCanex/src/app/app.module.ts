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
import { BuscaGeneroComponent } from './component/busca-genero/busca-genero.component';
import { BuscaNascimentoComponent } from './component/busca-nascimento/busca-nascimento.component';
import { MetodoBuscaComponent } from './component/metodo-busca/metodo-busca.component';

registerLocaleData(localePt, 'pt');

@NgModule({
  declarations: [
    AppComponent,
    ClienteComponent,
    BuscaComponent,
    BuscaIdComponent,
    BuscaGeneroComponent,
    BuscaNascimentoComponent,
    MetodoBuscaComponent,
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
