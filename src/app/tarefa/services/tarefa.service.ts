import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TarefaInterface } from '../types/tarefa.interface';

@Injectable()

export class TarefaService {

  findAll() {
    throw new Error('Method not implemented.');
  }

  constructor(private httpClient: HttpClient) { }

  create(tarefa: TarefaInterface): Observable<TarefaInterface> {
    return this.httpClient.post<TarefaInterface>(`${environment.apiUrl}/tarefa`, tarefa);
}

  update(tarefa: TarefaInterface, id: String): Observable<TarefaInterface> {
    return this.httpClient.put<TarefaInterface>(`${environment.apiUrl}/tarefa/${id}`, tarefa);
  }

  delete(id: String): Observable<TarefaInterface> {
    return this.httpClient.delete<TarefaInterface>(`${environment.apiUrl}/tarefa/${id}`);
  }

  readTarefa(id: number): Observable<TarefaInterface>{
    return this.httpClient.get<TarefaInterface>(`${environment.apiUrl}/tarefa/${id}`);
  }

  readTarefas(): Observable<TarefaInterface[]> {
    return this.httpClient.get<TarefaInterface[]>(`${environment.apiUrl}/tarefa`);
  }

}