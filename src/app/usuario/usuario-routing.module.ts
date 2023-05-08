import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { UsuarioCadastroComponent } from './components/cadastro/usuario-cadastro.component';
import { UsuarioListaComponent } from './components/lista/usuario-lista/usuario-lista.component';

const routes: Route[] = [
  {
    path: '',
    redirectTo: 'lista',
    pathMatch: 'full'
  },
  {
    path: 'lista',
    component: UsuarioListaComponent,
  },
  {
    path: 'cadastro',
    component: UsuarioCadastroComponent,
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuarioRoutingModule { }
