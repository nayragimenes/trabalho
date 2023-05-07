import { Component, OnInit } from '@angular/core';
import { UsuarioInterface } from '../../usuario.interface';
import { UsuarioService } from '../../usuario.service';

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
    this.usuarioService.getUsuarios().subscribe(
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

  remove(usuario: UsuarioInterface) {
    this.usuarioService.remove(usuario).subscribe(
      () => this.list(),
      (erro) => {
        console.log('Erro: ', erro);
      },
      () => {
        console.log('Terminou!');
      }
    );
  }
}
