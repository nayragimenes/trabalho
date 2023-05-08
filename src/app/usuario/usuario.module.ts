
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { UsuarioRoutingModule } from './usuario-routing.module';
import { UsuarioCadastroComponent } from './components/cadastro/usuario-cadastro.component';
import { UsuarioService } from './services/usuario.service';
import { UsuarioListaComponent } from './components/lista/usuario-lista/usuario-lista.component';


@NgModule({
  imports: [
    CommonModule, 
    HttpClientModule, 
    IonicModule, 
    FormsModule, 
    ReactiveFormsModule, 
    UsuarioRoutingModule
  ],
  declarations: [UsuarioCadastroComponent, UsuarioListaComponent],
  providers: [UsuarioService]
})
export class UsuarioModule { }
