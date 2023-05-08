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
    
    constructor(private http: HttpClient) { }

    readUsuario(id: number): Observable<UsuarioInterface>{
        return this.http.get<UsuarioInterface>(`${environment.apiUrl}/usuario/${id}`);
    }

    readUsuarios(): Observable<UsuarioInterface[]> {
        return this.http.get<UsuarioInterface[]>(`${environment.apiUrl}/usuario`);
    }

    create(usuario: UsuarioInterface): Observable<UsuarioInterface> {
        return this.http.post<UsuarioInterface>(`${environment.apiUrl}/usuario`, usuario);
    }

    update(usuario: UsuarioInterface): Observable<UsuarioInterface> {
        return this.http.put<UsuarioInterface>(`${environment.apiUrl}/usuario/${usuario.id}`, usuario);
    }

    delete({id}: UsuarioInterface):Observable<void> {
        return this.http.delete<void>(`${environment.apiUrl}/usuario/${id}`);
    }

}