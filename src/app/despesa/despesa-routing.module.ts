import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { DespesaCadastroComponent } from './components/cadastro/despesa-cadastro/despesa-cadastro.component';

const routes: Route[] = [
  {
    path: '',
    redirectTo: 'cadastro',
    pathMatch: 'full'
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