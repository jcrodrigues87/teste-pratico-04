import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuscaCnpjComponent } from './component/busca-cnpj/busca-cnpj.component';
import { BuscaIdComponent } from './component/busca-id/busca-id.component';
import { BuscaComponent } from './component/busca/busca.component';
import { ClienteComponent } from './component/cliente/cliente.component';

const routes: Routes = [
  {path: '', redirectTo: 'cliente', pathMatch: 'full'},
  { path: 'cliente', component: ClienteComponent},
  { path: 'busca', component: BuscaComponent},
  { path: 'busca-id', component: BuscaIdComponent},
  { path: 'busca-cnpj', component: BuscaCnpjComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
