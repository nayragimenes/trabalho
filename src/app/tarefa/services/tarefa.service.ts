import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TarefaInterface } from '../types/tarefa.interface';

@Injectable({
  providedIn: 'root'
})

export class TarefaService {

  constructor(private httpClient: HttpClient) { }

  getTarefas(): Observable<TarefaInterface[]> {
    return this.httpClient.get<TarefaInterface[]>(
      `${environment.apiUrl}/tarefa`
    );
  }
  save(tarefa: TarefaInterface): Observable<TarefaInterface> {
    return this.httpClient.post<TarefaInterface>(`${environment.apiUrl}/tarefa`, tarefa);
  }
  delete(id: String): Observable<TarefaInterface> {
    return this.httpClient.delete<TarefaInterface>(`${environment.apiUrl}/tarefa/${id}`);
}
}