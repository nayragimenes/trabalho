import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UsuarioInterface } from '../types/usuario.interface';
import { Injectable } from '@angular/core';

@Injectable()
export class UsuarioService{
    findAll() {
      throw new Error('Method not implemented.');
    }
    
    constructor(private httpClient: HttpClient) { }

    readUsuario(id: number): Observable<UsuarioInterface>{
        return this.httpClient.get<UsuarioInterface>(`${environment.apiUrl}/usuario/${id}`);
    }

    readUsuarios(): Observable<UsuarioInterface[]> {
        return this.httpClient.get<UsuarioInterface[]>(`${environment.apiUrl}/usuario`);
    }

    create(usuario: UsuarioInterface): Observable<UsuarioInterface> {
        return this.httpClient.post<UsuarioInterface>(`${environment.apiUrl}/usuario`, usuario);
    }

    update(usuario: UsuarioInterface, id: String): Observable<UsuarioInterface> {
        return this.httpClient.put<UsuarioInterface>(`${environment.apiUrl}/usuario/${id}`, usuario);
    }

    delete(id: String): Observable<UsuarioInterface> {
        return this.httpClient.delete<UsuarioInterface>(`${environment.apiUrl}/usuario/${id}`);
      }

}