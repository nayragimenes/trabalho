import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'usuarios',
    loadChildren: () => import('./usuario/usuario.module').then(m => m.UsuarioModule)
  }, 
  {
    path: 'despesas',
    loadChildren: () => import('./despesa/despesa.module').then(m => m.DespesaModule)
  }, 
  {
    path: 'tarefas',
    loadChildren: () => import('./tarefa/tarefa.module').then(m => m.TarefaModule)
  }, 
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
