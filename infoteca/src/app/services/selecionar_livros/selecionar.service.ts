import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SelecionarService {
 // Usando BehaviorSubject para gerenciar o estado do livro selecionado
 private livroSelecionadoSource = new BehaviorSubject<any>(null);
 livroSelecionado$ = this.livroSelecionadoSource.asObservable();

 constructor() {}

 // Método para atualizar o livro selecionado
 setLivroSelecionado(book: any): void {
   this.livroSelecionadoSource.next(book);
 }

 // Método para obter o livro selecionado
 getLivroSelecionado(): any {
   return this.livroSelecionadoSource.getValue();
 }
}
