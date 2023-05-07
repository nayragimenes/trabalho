import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UsuarioInterface } from './usuario.interface';
import { Injectable } from '@angular/core';

@Injectable()
export class UsuarioService{
    constructor(private http: HttpClient) { 
    }

    getUsuario(id: number): Observable<UsuarioInterface>{
        return this.http.get<UsuarioInterface>(`${environment.apiUrl}/usuarios/${id}`);
    }

    getUsuarios(): Observable<UsuarioInterface[]> {
        return this.http.get<UsuarioInterface[]>(`${environment.apiUrl}/usuarios`);
    }

    save(usuario: UsuarioInterface): Observable<UsuarioInterface> {
        return this.http.post<UsuarioInterface>(`${environment.apiUrl}/usuarios`, usuario);
    }

    update(usuario: UsuarioInterface): Observable<UsuarioInterface> {
        return this.http.put<UsuarioInterface>(`${environment.apiUrl}/usuarios/${usuario.id}`, usuario);
    }

    remove({ id }: UsuarioInterface): Observable<void> {
        return this.http.delete<void>(`${environment.apiUrl}/usuarios/${id}`);
    }

}