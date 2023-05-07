import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { UsuarioListaComponent } from './lista/usuario-lista/usuario-lista.component';
import { UsuarioCadastroComponent } from './cadastro/usuario-cadastro/usuario-cadastro.component';

const routes: Route[] = [
  {
    path: '',
    redirectTo: 'cadastro',
    pathMatch: 'full'
  },
  {
    path: 'lista',
    component: UsuarioListaComponent
  },
  {
    path: 'cadastro',
    component: UsuarioCadastroComponent,
  },
  {
    path: 'edicao/:id',
    component: UsuarioCadastroComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuarioRoutingModule { }
