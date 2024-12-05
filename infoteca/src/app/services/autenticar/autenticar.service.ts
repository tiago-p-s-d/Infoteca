import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AutenticarService {
  private apiUrl = 'http://localhost:4200/api/auth/users'; // URL da sua rota no backend

  constructor(private http: HttpClient) {}

  autenticar(email: string, senha: string): Observable<boolean> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map((usuarios) => {
        const usuario = usuarios.find(
          (user) => user.email === email && user.senha === senha
        );
        return !!usuario; // Retorna true se encontrar o usuário
      })
    );
  }
}
