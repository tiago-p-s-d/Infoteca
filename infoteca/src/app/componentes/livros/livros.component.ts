import { Component, Input } from '@angular/core';
import { ObterLivrosService } from '../../services/obter_livros/obter-livros.service';

@Component({
  selector: 'app-livros',
  templateUrl: './livros.component.html',
  styleUrl: './livros.component.css'
})
export class LivrosComponent {
  @Input() genre: string | undefined = undefined;
  genero: string = ''

  books: any[] = [];
  selectedBook: any;
  livros_visiveis: any[] = [];



  constructor(private obterService: ObterLivrosService) {}

  ngOnInit(): void {
    this.carregarTodosLivros()
    this.carregarLivrosVisiveis()
  }



  /* */
  proximo(){
    if (this.books.length > 0) {
      // Remove o primeiro elemento visível e adiciona o próximo da lista
      const primeiro = this.livros_visiveis.shift(); // Remove o primeiro
      const proximoIndex = (this.books.indexOf(this.livros_visiveis[this.livros_visiveis.length - 1]) + 1) % this.books.length;
      this.livros_visiveis.push(this.books[proximoIndex]); // Adiciona o próximo
    }
  }
  anterior(){
    if (this.books.length > 0) {
      // Remove o último elemento visível e insere o anterior no início
      const ultimo = this.livros_visiveis.pop(); // Remove o último
      const anteriorIndex = (this.books.indexOf(this.livros_visiveis[0]) - 1 + this.books.length) % this.books.length;
      this.livros_visiveis.unshift(this.books[anteriorIndex]); // Adiciona o anterior no início
    }
  }
  /* */
  /*aqui abre o modal, e fecha o modal também*/
  openBookDetails(book: any): void {
    this.selectedBook = book;
  }
  closeBookDetails(): void {
    this.selectedBook = null;
  }
  /*-----------------------------------------*/



  /*funções que estão no oninit (ativam ao carregar a página)*/
  carregarTodosLivros(){
    if(this.genre == undefined){
    this.obterService.getLivro('bestseller').subscribe((response) => {
      this.books = response.items;
    });
    this.genero = 'best sellers'
    }
    else if(this.genre == 'horror'){
      this.obterService.getLivroPorGenero('horror').subscribe((response) => {
        this.books = response.items;
      });
      this.genero = 'de terror'
    }
    else if(this.genre == 'romance'){
      this.obterService.getLivroPorGenero('romance').subscribe((response) => {
        this.books = response.items;
      });
      this.genero = 'de romance'
    }
    else if(this.genre == 'comedy'){
      this.obterService.getLivroPorGenero('comedy').subscribe((response) => {
        this.books = response.items;
      });
      this.genero = 'de comedia'
    }
  }
  carregarLivrosVisiveis(){
    for(let x = 0; this.livros_visiveis.length < 8 && x < this.books.length; x++){
      this.livros_visiveis.push(this.books[x])
    }
  }
  /*---------------------------------------------------------*/
}
