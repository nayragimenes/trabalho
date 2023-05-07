
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsuarioRoutingModule } from './usuario-routing.module';
import { UsuarioService } from './services/usuario.service';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { UsuarioCadastroComponent } from './components/cadastro/usuario-cadastro.component';


@NgModule({
  imports: [
    CommonModule, 
    HttpClientModule, 
    IonicModule, 
    FormsModule, 
    ReactiveFormsModule, 
    UsuarioRoutingModule
  ],
  declarations: [UsuarioCadastroComponent],
  providers: [UsuarioService]

})
export class UsuarioModule { }
