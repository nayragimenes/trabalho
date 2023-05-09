import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { DespesaCadastroComponent } from './components/cadastro/despesa-cadastro/despesa-cadastro.component';
import { DespesaListaComponent } from './components/lista/despesa-lista.component';

const routes: Route[] = [
  {
    path: '',
    redirectTo: 'lista',
    pathMatch: 'full'
  },
  {
    path: 'lista',
    component: DespesaListaComponent,
  },
  {
    path: 'cadastro',
    component: DespesaCadastroComponent,
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DespesaRoutingModule { }