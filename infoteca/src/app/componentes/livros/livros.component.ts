import { Component, Input, OnInit } from '@angular/core';
import { ObterLivrosService } from '../../services/obter_livros/obter-livros.service';
import { ObterResenhasService } from '../../services/obter_resenhas/obter-resenhas.service';
import { EnviarResenhaService } from '../../services/enviarResenha/enviar-resenha.service';
import { SelecionarService } from '../../services/selecionar_livros/selecionar.service';

@Component({
  selector: 'app-livros',
  templateUrl: './livros.component.html',
  styleUrl: './livros.component.css'
})
export class LivrosComponent implements OnInit{
  @Input() genre: string | undefined = undefined;
  genero: string = '';

  books: any[] = [];
  selectedBook: any;
  livros_visiveis: any[] = [];
  resenhas: any[] = [];
  novoComentario: string = '';

  constructor(private selecionar: SelecionarService ,private obterService: ObterLivrosService, private resenhaService: ObterResenhasService, private enviarResenhaService: EnviarResenhaService) {}

  ngOnInit(): void {
    this.carregarTodosLivros();

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
    window.alert(book.volumeInfo.industryIdentifiers[0].identifier);
    this.selecionar.setSelectedBook(book);
    this.resenhaService.obterResenhas(book.volumeInfo.industryIdentifiers[0].identifier)
      .subscribe(respostas => {
        this.resenhas = respostas;  // Armazena as resenhas retornadas
      });
  }
  closeBookDetails(): void {
    this.selectedBook = null;
  }
  /*-----------------------------------------*/


 

  /*funções que estão no oninit (ativam ao carregar a página)*/
  carregarTodosLivros() {

    /*
    if (this.genre == undefined) {
      this.obterService.getLivro('bestseller').subscribe((response) => {
        this.books = response.items;
         this.carregarLivrosVisiveis(); // Chama carregarLivrosVisiveis após os livros serem carregados
      });
      this.genero = 'best sellers';
    } else if (this.genre == 'horror') {
      this.obterService.getLivroPorGenero('horror').subscribe((response) => {
        this.books = response.items;
        this.carregarLivrosVisiveis(); // Chama carregarLivrosVisiveis após os livros de terror serem carregados
      });
      this.genero = 'de terror';
    } else if (this.genre == 'romance') {
      this.obterService.getLivroPorGenero('romance').subscribe((response) => {
        this.books = response.items;
        this.carregarLivrosVisiveis(); // Chama carregarLivrosVisiveis após os livros de romance serem carregados
      });
      this.genero = 'de romance';
    } else if (this.genre == 'comedy') {
      this.obterService.getLivroPorGenero('comedy').subscribe((response) => {
        this.books = response.items;
        this.carregarLivrosVisiveis(); // Chama carregarLivrosVisiveis após os livros de comédia serem carregados
      });
      this.genero = 'de comedia';
    }

    */





    let observable;

    // Define qual método usar com base no gênero
    if (!this.genre) {
      observable = this.obterService.getLivro('bestseller');
      this.genero = 'best sellers';
    } else {
      observable = this.obterService.getLivroPorGenero(this.genre);
      this.genero = `de ${this.traduzirGenero(this.genre)}`;
    }

    // Faz a chamada à API e processa os dados
    observable.subscribe((response) => {
      this.books = response.items || [];
      this.carregarLivrosVisiveis(); // Carrega os livros visíveis
    });
  }





  traduzirGenero(genre: string): string {
    const traducoes: { [key: string]: string } = {
      horror: 'terror',
      romance: 'romance',
      comedy: 'comédia',
    };
    return traducoes[genre] || genre;
  }
  

   

  carregarLivrosVisiveis(){
    for(let x = 0; this.livros_visiveis.length < 8 && x < this.books.length; x++){
      this.livros_visiveis.push(this.books[x])
    }
  }

  

  
  /*---------------------------------------------------------*/




  postarResenha(): void {
    const idLivro = this.selectedBook.volumeInfo.industryIdentifiers[0].identifier; // ID do livro

    const idUsuario_string = localStorage.getItem('id_usuario'); // ID usuario
    let idUsuario: number;
    const comentario = this.novoComentario;
    if(idUsuario_string != null){
      window.alert(idUsuario_string)
    
      idUsuario = +idUsuario_string

    this.enviarResenhaService.postarResenha({ id_livro: idLivro, id_usuario: idUsuario, comentario }).subscribe(
        (response) => {
          alert('Resenha postada com sucesso!');
          this.novoComentario = ''; // Limpa o campo de comentário
          this.resenhas.push({ nome_usuario: 'Você', comentario }); // Adiciona a nova resenha localmente
        },
        (error) => {
          console.error('Erro ao postar resenha:', error);
          alert('Erro ao postar resenha. Tente novamente mais tarde.');
        }
      );
  }
}
}
