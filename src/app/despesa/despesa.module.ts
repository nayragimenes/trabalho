
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { DespesaRoutingModule } from './despesa-routing.module';
import { DespesaCadastroComponent } from './components/cadastro/despesa-cadastro/despesa-cadastro.component';
import { DespesaService } from './services/despesa.service';


@NgModule({
  imports: [
    CommonModule, 
    HttpClientModule, 
    IonicModule, 
    FormsModule, 
    ReactiveFormsModule, 
    DespesaRoutingModule
  ],
  declarations: [DespesaCadastroComponent],
  providers: [DespesaService]
})

export class DespesaModule { }