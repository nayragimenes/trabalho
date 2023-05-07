import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { UsuarioListaComponent } from './components/lista/usuario-lista/usuario-lista.component';
import { UsuarioCadastroComponent } from './components/cadastro/usuario-cadastro.component';

const routes: Route[] = [
  {
    path: '',
    redirectTo: 'usuarios',
    pathMatch: 'full'
  },
  {
    path: 'usuarios',
    component: UsuarioCadastroComponent,
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuarioRoutingModule { }
