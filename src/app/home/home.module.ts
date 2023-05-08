import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HomePageRoutingModule } from './home-routing.module';
import { HomePage } from './home.page';
import { DespesaService } from '../despesa/services/despesa.service';
import { TarefaService } from '../tarefa/services/tarefa.service';
import { UsuarioService } from '../usuario/services/usuario.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    HomePageRoutingModule,
  ],
  declarations: [HomePage],
  providers: [UsuarioService, DespesaService, TarefaService]
})
export class HomePageModule {}
