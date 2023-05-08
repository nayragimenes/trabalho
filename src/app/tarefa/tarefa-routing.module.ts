import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { TarefaListaComponent } from './components/lista/tarefa-lista/tarefa-lista.component';
import { TarefaCadastroComponent } from './components/cadastro/tarefa-cadastro/tarefa-cadastro.component';


const routes: Route[] = [
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full'
  },
  {
    path: 'list',
    component: TarefaListaComponent
  },
  {
    path: 'cadastro',
    component:TarefaCadastroComponent
  },
  {
    path: 'editar',
    component:TarefaCadastroComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TarefaRoutingModule {}