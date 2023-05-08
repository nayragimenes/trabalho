import { NgModule } from '@angular/core';
import { Routes, RouterModule, Route } from '@angular/router';
import { HomePage } from './home.page';

const routes: Route[] = [
  {
    path: '',
    redirectTo: 'lista',
    pathMatch: 'full'
  },
  {
    path: '',
    component: HomePage
}
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
