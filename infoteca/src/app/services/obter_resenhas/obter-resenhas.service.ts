import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ObterResenhasService {
  private apiUrl = '/api/livros/resenhas';  // Endereço da API que retorna as resenhas

  constructor(private http: HttpClient) {}

  // Método para obter as resenhas de um livro por ID
  obterResenhas(id_livro: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${id_livro}`);
  }

}
