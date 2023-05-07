
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsuarioCadastroComponent } from './cadastro/usuario-cadastro/usuario-cadastro.component';
import { UsuarioListaComponent } from './lista/usuario-lista/usuario-lista.component';
import { UsuarioRoutingModule } from './usuario-routing.module';
import { UsuarioService } from './usuario.service';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';


@NgModule({
  imports: [CommonModule, HttpClientModule, IonicModule, FormsModule, ReactiveFormsModule, UsuarioRoutingModule],
  declarations: [UsuarioListaComponent, UsuarioCadastroComponent],
  providers: [UsuarioService],
})
export class UsuarioModule { }
