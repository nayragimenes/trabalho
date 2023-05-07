import { Component, OnInit } from '@angular/core';
import { UsuarioInterface } from '../../../types/usuario.interface';
import { UsuarioService } from '../../../services/usuario.service';

@Component({
  selector: 'app-usuario-lista',
  templateUrl: './usuario-lista.component.html',
})
export class UsuarioListaComponent  implements OnInit {
  usuarios: UsuarioInterface[] = [];

  constructor(private usuarioService: UsuarioService) { 

  }

  ngOnInit() {
    this.list();
  }

  list() {
    this.usuarioService.readUsuarios().subscribe(
      (usuarios) => {
        this.usuarios = usuarios;
      },
      (erro) => {
        console.log('Erro: ', erro);
      },
      () => {
        console.log('Terminou!');
      }
    );
  }
}
