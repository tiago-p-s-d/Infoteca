import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PesquisarService {


  private baseUrl = 'https://www.googleapis.com/books/v1/volumes';

  constructor(private http: HttpClient) {}

  getLivro(termo: string): Observable<any> {
    const url = `${this.baseUrl}?q=${termo}&maxResults=20`;
    return this.http.get<any>(url);
  }

  getLivroPorGenero(genero: string): Observable<any> {
    const url = `${this.baseUrl}?q=subject:${genero}&maxResults=20`;
    return this.http.get<any>(url);
  }

  buscarLivrosPorParametros(params: any): Observable<any> {
    const queryParams: string[] = [];

    if (params.nome) queryParams.push(`intitle:${params.nome}`);
    if (params.autor) queryParams.push(`inauthor:${params.autor}`);
    if (params.data) queryParams.push(`publishedDate:${params.data}`);
    if (params.genero) queryParams.push(`subject:${params.genero}`);
    
    const query = queryParams.join('+');
    const url = `${this.baseUrl}?q=${query}&maxResults=20`;

    return this.http.get<any>(url);
  }


}
