import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TarefaInterface } from '../types/tarefa.interface';
import { environment } from 'src/environments/environment';

@Injectable()
export class TarefaService {

  constructor(private httpClient: HttpClient) { }

  getTarefa(id: number): Observable<TarefaInterface> {
    return this.httpClient.get<TarefaInterface>(
      `${environment.apiUrl}/tarefas/${id}`
    )
  }
  getTarefas(): Observable<TarefaInterface[]> {
    return this.httpClient.get<TarefaInterface[]>(
      `${environment.apiUrl}/tarefas`
    );
  }

  update(tarefa: TarefaInterface): Observable<TarefaInterface> {
    return this.httpClient.put<TarefaInterface>(
      `${environment.apiUrl}/tarefas/${tarefa.id}`,
      tarefa
    )
  }

  save(tarefa: TarefaInterface): Observable<TarefaInterface> {
    return this.httpClient.post<TarefaInterface>(
      `${environment.apiUrl}/tarefas`,
      tarefa
    );
  }

  remove(tarefa: TarefaInterface): Observable<void> {
    return this.httpClient.delete<void>(
      `${environment.apiUrl}/tarefas/${tarefa.id}`
    );
  }
}
