import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EnviarResenhaService {
  private apiUrl = '/api/livros/resenhas';

  constructor(private http: HttpClient) {}

  postarResenha(resenha: { id_livro: string; id_usuario: number; comentario: string }) {
    return this.http.post(`${this.apiUrl}/postar`, resenha);
  }
}
