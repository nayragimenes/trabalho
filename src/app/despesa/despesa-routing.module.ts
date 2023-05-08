import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { DespesaCadastroComponent } from './components/cadastro/despesa-cadastro/despesa-cadastro.component';

const routes: Route[] = [
  {
    path: '',
    redirectTo: 'despesas',
    pathMatch: 'full'
  },
  {
    path: 'despesas',
    component: DespesaCadastroComponent,
  },
  {
    path: 'despesas',
    component: DespesaCadastroComponent,
  },

]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DespesaRoutingModule { }