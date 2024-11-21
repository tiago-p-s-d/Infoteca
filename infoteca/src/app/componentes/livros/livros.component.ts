import { Component } from '@angular/core';
import { ObterLivrosService } from '../../services/obter_livros/obter-livros.service';

@Component({
  selector: 'app-livros',
  templateUrl: './livros.component.html',
  styleUrl: './livros.component.css'
})
export class LivrosComponent {
 books: any[] = [];
  selectedBook: any;


  constructor(private obterService: ObterLivrosService) {}

  ngOnInit(): void {
    this.obterService.getBooks().subscribe((response) => {
      this.books = response.items;
    });
  }
  openBookDetails(book: any): void {
    this.selectedBook = book;
  }
  closeBookDetails(): void {
    this.selectedBook = null;
  }



}
