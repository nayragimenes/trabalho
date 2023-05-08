import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DespesaInterface } from '../types/despesa.interface';

@Injectable()
export class DespesaService {

  constructor(private httpClient: HttpClient) { }

  readDespesa(id: number): Observable<DespesaInterface> {
    return this.httpClient.get<DespesaInterface>(
      `${environment.apiUrl}/despesas/${id}`
    )
  }
  readDespesas(): Observable<DespesaInterface[]> {
    return this.httpClient.get<DespesaInterface[]>(
      `${environment.apiUrl}/despesas`
    );
  }

  update(despesa: DespesaInterface): Observable<DespesaInterface> {
    return this.httpClient.put<DespesaInterface>(
      `${environment.apiUrl}/despesas/${despesa.id}`,
      despesa
    )
  }

  create(despesa: DespesaInterface): Observable<DespesaInterface> {
    return this.httpClient.post<DespesaInterface>(
      `${environment.apiUrl}/despesas`,
      despesa
    );
  }

  delete(id: String): Observable<DespesaInterface> {
    return this.httpClient.delete<DespesaInterface>(`${environment.apiUrl}/despesas/${id}`);
  }
}
