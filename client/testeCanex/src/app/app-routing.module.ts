import { ContatoComponent } from './component/contato/contato.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuscaCnpjComponent } from './component/busca-cnpj/busca-cnpj.component';
import { BuscaEmailComponent } from './component/busca-email/busca-email.component';
import { BuscaIdComponent } from './component/busca-id/busca-id.component';
import { BuscaRazaoComponent } from './component/busca-razao/busca-razao.component';
import { BuscaComponent } from './component/busca/busca.component';
import { ClienteComponent } from './component/cliente/cliente.component';

const routes: Routes = [
  {path: '', redirectTo: 'cliente', pathMatch: 'full'},
  { path: 'cliente', component: ClienteComponent},
  { path: 'busca', component: BuscaComponent},
  { path: 'busca-id', component: BuscaIdComponent},
  { path: 'busca-cnpj', component: BuscaCnpjComponent},
  { path: 'busca-razao', component: BuscaRazaoComponent},
  { path: 'busca-email', component: BuscaEmailComponent},
  { path: 'contato', component: ContatoComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
