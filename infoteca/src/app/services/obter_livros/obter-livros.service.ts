import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ObterLivrosService {
  private urlAPI = 'https://www.googleapis.com/books/v1/volumes?q=';

  constructor(private http: HttpClient) {}

  getLivro(genero:string): Observable<any> {
    const url = `${this.urlAPI}${genero}&maxResults=40`;
    return this.http.get(url);
  }
  getLivroPorGenero(genero:string): Observable<any> {
    const url = `${this.urlAPI}subject:${genero}&maxResults=40`;
    return this.http.get(url);
  }
}
