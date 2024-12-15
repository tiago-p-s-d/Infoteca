import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdicionarStatusService {

  private apiUrl = '/api/livros/status_do_livro/adicionar'; // URL da API

  constructor(private http: HttpClient) {}

  adicionarStatusDoLivro(id: string, status: number, id_usuario: number): Observable<any> {
    return this.http.post<any>(this.apiUrl, { id, status, id_usuario });
  }
}
