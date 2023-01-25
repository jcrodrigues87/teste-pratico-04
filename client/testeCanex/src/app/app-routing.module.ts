import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { BuscaGeneroComponent } from './component/busca-genero/busca-genero.component';
import { BuscaIdComponent } from './component/busca-id/busca-id.component';
// import { BuscaNascimentoComponent } from './component/busca-nascimento/busca-nascimento.component';
import { BuscaComponent } from './component/busca/busca.component';
import { ClienteComponent } from './component/cliente/cliente.component';
import { MetodoBuscaComponent } from './component/metodo-busca/metodo-busca.component';

const routes: Routes = [
  {path: '', redirectTo: 'cliente', pathMatch: 'full'},
  { path: 'cliente', component: ClienteComponent},
  { path: 'busca', component: BuscaComponent},
  { path: 'busca-id', component: BuscaIdComponent},
  // { path: 'busca-cnpj', component: BuscaGeneroComponent},
  // { path: 'busca-nascimento', component: BuscaNascimentoComponent},
  { path: 'metodo-busca', component: MetodoBuscaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
