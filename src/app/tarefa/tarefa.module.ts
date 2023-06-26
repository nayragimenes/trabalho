import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TarefaCadastroComponent } from './components/cadastro/tarefa-cadastro/tarefa-cadastro.component';
import { TarefaRoutingModule } from './tarefa-routing.module';
import { TarefaListaComponent } from './components/lista/tarefa-lista/tarefa-lista.component';
import { TarefaService } from './services/tarefa.service';

@NgModule({
  imports: [
    CommonModule, 
    HttpClientModule, 
    IonicModule, 
    FormsModule, 
    ReactiveFormsModule, 
    TarefaRoutingModule
  ],
  declarations: [TarefaCadastroComponent, TarefaListaComponent],
  providers: [TarefaService]

})
export class TarefaModule {}