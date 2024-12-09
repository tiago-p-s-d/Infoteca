import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AutenticarService {
  private apiUrl = 'http://localhost:4200/api/auth'; // URL da sua rota no backend
  private createUrl = 'http://localhost:4200/api/criar/criar'; // URL da sua rota no backend

  constructor(private http: HttpClient) {}


  autenticar(email: string, senha: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { email, senha });
  }
  salvarToken(token: string): void {
    localStorage.setItem('token', token); // Salva o token no localStorage
  }
  obterToken(): string | null {
    return localStorage.getItem('token'); // Recupera o token do localStorage
  }
  limparToken(): void {
    localStorage.removeItem('token'); // Limpa o token do localStorage
  }

  register(user: { nome_usuario: string, email: string, senha: string }): Observable<any> {
    return this.http.post(this.createUrl, user);
  }
}
