import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ObterStatusService {

  apiUrl = '/api/livros/status';
  sttsUrl = '/api/livros/getstatus';
  googleBooksApiUrl = 'https://www.googleapis.com/books/v1/volumes/';

  constructor(private http: HttpClient) {}
  getStatus(): Observable<any[]> {
    return this.http.get<any[]>(this.sttsUrl);  // Faz a requisição GET para pegar os status
  }

    obterLivrosPorStatusPost(id_status: number): Observable<any> {
      const url = `${this.apiUrl}`; // URL do endpoint do backend
      const body = { id_status }; // Corpo da requisição POST

      return this.http.post<any>(url, body); // Envia o id_status via POST
    }

  getLivrosFromGoogle(ids: { id: string }[]): Observable<any> {
    // Cria um array de observáveis para cada id
    const requests = ids.map(book =>
      this.http.get(`${this.googleBooksApiUrl}${book.id}`)
    );

    // Usa forkJoin para fazer as requisições em paralelo e esperar todas as respostas
    return forkJoin(requests);
  };
}
