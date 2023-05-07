import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UsuarioInterface } from '../types/usuario.interface';
import { Injectable } from '@angular/core';

@Injectable()
export class UsuarioService{
    
    constructor(private http: HttpClient) { }

    readUsuario(id: number): Observable<UsuarioInterface>{
        return this.http.get<UsuarioInterface>(`${environment.apiUrl}/usuarios/${id}`);
    }

    readUsuarios(): Observable<UsuarioInterface[]> {
        return this.http.get<UsuarioInterface[]>(`${environment.apiUrl}/usuarios`);
    }

    create(usuario: UsuarioInterface): Observable<UsuarioInterface> {
        return this.http.post<UsuarioInterface>(`${environment.apiUrl}/usuarios`, usuario);
    }

    update(usuario: UsuarioInterface): Observable<UsuarioInterface> {
        return this.http.put<UsuarioInterface>(`${environment.apiUrl}/usuarios/${usuario.id}`, usuario);
    }

    delete(id: String): Observable<UsuarioInterface> {
        return this.http.delete<UsuarioInterface>(`${environment.apiUrl}/usuarios/${id}`);
      }

}