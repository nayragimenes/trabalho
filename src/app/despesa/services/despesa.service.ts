import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DespesaInterface } from '../types/despesa.interface';

@Injectable()
export class DespesaService {

  constructor(private httpClient: HttpClient) { }

  getDespesa(id: number): Observable<DespesaInterface> {
    return this.httpClient.get<DespesaInterface>(
      `${environment.apiUrl}/despesas/${id}`
    )
  }
  getDespesas(): Observable<DespesaInterface[]> {
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

  save(despesa: DespesaInterface): Observable<DespesaInterface> {
    return this.httpClient.post<DespesaInterface>(
      `${environment.apiUrl}/despesas`,
      despesa
    );
  }

  remove(despesa: DespesaInterface): Observable<void> {
    return this.httpClient.delete<void>(
      `${environment.apiUrl}/despesas/${despesa.id}`
    );
  }
}
