
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { DespesaRoutingModule } from './despesa-routing.module';
import { DespesaService } from './services/despesa.service';
import { UsuarioService } from '../usuario/services/usuario.service';
import { DespesaCadastroComponent } from './components/cadastro/despesa-cadastro/despesa-cadastro.component';
import { DespesaListaComponent } from './components/lista/despesa-lista.component';


@NgModule({
  imports: [
    CommonModule, 
    HttpClientModule, 
    IonicModule, 
    FormsModule, 
    ReactiveFormsModule, 
    DespesaRoutingModule,
  ],
  declarations: [DespesaCadastroComponent, DespesaListaComponent],
  providers: [DespesaService, UsuarioService],
})
export class DespesaModule { }