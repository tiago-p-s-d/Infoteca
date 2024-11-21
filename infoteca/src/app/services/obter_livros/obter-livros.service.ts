import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ObterLivrosService {
  private apiUrl = 'https://www.googleapis.com/books/v1/volumes?q=bestseller&maxResults=40';

  constructor(private http: HttpClient) {}

  getBooks(): Observable<any> {
    const url = `${this.apiUrl}`;
    return this.http.get(url);
  }
}
