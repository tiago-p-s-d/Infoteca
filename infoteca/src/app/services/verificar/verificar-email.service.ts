import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VerificarEmailService {
  private apiUrl = '/api/criar/verificar';
  constructor(private http: HttpClient) { }
  verificarCodigo(email: string, codigo_verificacao: string): Observable<any> {
    const body = { email, codigo_verificacao };
    return this.http.post(this.apiUrl, body); // Envia os dados para o backend
  }
}
