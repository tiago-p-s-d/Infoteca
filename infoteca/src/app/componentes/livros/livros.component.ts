import { Component, Input, OnInit } from '@angular/core';
import { ObterLivrosService } from '../../services/obter_livros/obter-livros.service';
import { ObterResenhasService } from '../../services/obter_resenhas/obter-resenhas.service';
import { EnviarResenhaService } from '../../services/enviarResenha/enviar-resenha.service';
import { SelecionarService } from '../../services/selecionar_livros/selecionar.service';

@Component({
  selector: 'app-livros',
  templateUrl: './livros.component.html',
  styleUrls: ['./livros.component.css']
})
export class LivrosComponent implements OnInit {
  @Input() genre: string | undefined = undefined;
  genero: string = '';

  books: any[] = [];
  livroSelecionado: any;
  livros_visiveis: any[] = [];
  resenhas: any[] = [];
  novoComentario: string = '';
  livrosVisiveisCount: number = 8; // Número inicial de livros visíveis

  constructor(
    private selecionar: SelecionarService,
    private obterService: ObterLivrosService,
    private resenhaService: ObterResenhasService,
    private enviarResenhaService: EnviarResenhaService
  ) {}

  ngOnInit(): void {
    this.carregarTodosLivros();
    this.adaptarQuantidadeLivros(); // Ajustar a quantidade de livros ao carregar a página
    window.addEventListener('resize', this.adaptarQuantidadeLivros.bind(this)); // Adicionar evento de resize
  }

  ngOnDestroy(): void {
    window.removeEventListener('resize', this.adaptarQuantidadeLivros.bind(this)); // Limpar o evento de resize
  }

  adaptarQuantidadeLivros(): void {
    const larguraTela = window.innerWidth;
    if (larguraTela <= 400) {
      this.livrosVisiveisCount = 1; // Em telas pequenas, mostrar 1 livro
    } else if (larguraTela <= 600) {
      this.livrosVisiveisCount = 3; // Em telas médias, mostrar 3 livros
    } else {
      this.livrosVisiveisCount = 8; // Em telas grandes, mostrar 8 livros
    }

    // Após ajustar o número de livros visíveis, recarregar os livros visíveis
    this.carregarLivrosVisiveis();
  }

  proximo(): void {
    if (this.books.length > 0) {
      // Remover os livros visíveis atuais
      const novosLivros = this.books.slice(
        this.books.indexOf(this.livros_visiveis[this.livros_visiveis.length - 1]) + 1,
        this.books.indexOf(this.livros_visiveis[this.livros_visiveis.length - 1]) + 1 + this.livrosVisiveisCount
      );

      // Adicionar os próximos livros
      this.livros_visiveis.push(...novosLivros);
      // Remover livros do início do array até atingir o tamanho desejado
      this.livros_visiveis.splice(0, novosLivros.length);
    }
  }
  anterior(): void {
    if (this.books.length > 0) {
      // Remover os livros visíveis atuais
      const novosLivros = this.books.slice(
        this.books.indexOf(this.livros_visiveis[0]) - this.livrosVisiveisCount,
        this.books.indexOf(this.livros_visiveis[0])
      );

      // Adicionar os livros anteriores
      this.livros_visiveis.unshift(...novosLivros);
      // Remover livros do final do array até atingir o tamanho desejado
      this.livros_visiveis.splice(this.livros_visiveis.length - novosLivros.length, novosLivros.length);
    }
  }

  abrirLivro(book: any): void {
    this.livroSelecionado = book;
    this.selecionar.setLivroSelecionado(book);
    this.resenhaService.obterResenhas(book.id).subscribe(respostas => {
      this.resenhas = respostas; // Armazena as resenhas retornadas
    });
  }

  fecharLivro(): void {
    this.livroSelecionado = null;
  }

  carregarTodosLivros(): void {
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

  carregarLivrosVisiveis(): void {
    // Limita o número de livros visíveis de acordo com a largura da tela
    this.livros_visiveis = [];
    for (let x = 0; this.livros_visiveis.length < this.livrosVisiveisCount && x < this.books.length; x++) {
      this.livros_visiveis.push(this.books[x]);
    }
  }

  postarResenha(): void {
    const idLivro = this.livroSelecionado.id; // ID do livro
    const idUsuario_string = localStorage.getItem('id_usuario'); // ID usuário
    let idUsuario: number;
    const comentario = this.novoComentario;
    if (idUsuario_string != null) {
      idUsuario = +idUsuario_string;

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
