import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SelecionarService {
 // Usando BehaviorSubject para gerenciar o estado do livro selecionado
 private selectedBookSource = new BehaviorSubject<any>(null);
 selectedBook$ = this.selectedBookSource.asObservable();

 constructor() {}

 // Método para atualizar o livro selecionado
 setSelectedBook(book: any): void {
   this.selectedBookSource.next(book);
 }

 // Método para obter o livro selecionado
 getSelectedBook(): any {
   return this.selectedBookSource.getValue();
 }
}
