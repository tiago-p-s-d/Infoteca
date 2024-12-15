import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { EnviarResenhaService } from '../../services/enviarResenha/enviar-resenha.service';
import { ObterStatusService } from '../../services/obter_status/obter-status.service';
import { SelecionarService } from '../../services/selecionar_livros/selecionar.service';
import { ObterResenhasService } from '../../services/obter_resenhas/obter-resenhas.service';





@Component({
  selector: 'app-status-livro',
  templateUrl: './status-livro.component.html',
  styleUrls: ['./status-livro.component.css']
})

export class StatusLivroComponent implements OnInit {

  livros: any[] = [];
  livros_visiveis: any[] = [];
  selectedBook: any;
  resenhas: any[] = [];
  novoComentario: string = '';
  id_status = localStorage.getItem('id_status')

  constructor(private http: HttpClient,
              private enviarResenhaService: EnviarResenhaService,
              private status: ObterStatusService,
              private selecionar: SelecionarService,
              private resenhaService: ObterResenhasService) {}

  ngOnInit(): void {
    this.carregarLivros();
  }

  carregarLivros() {
    if (this.id_status === null) {
      console.error('id_status não definido. Não é possível carregar os livros.');
      return; // Retorna sem fazer a chamada ao serviço
    }

    if(this.id_status != null){
    // Faz a requisição POST para obter os livros do backend
    this.status.obterLivrosPorStatusPost(+this.id_status).subscribe(
      (livrosDoBackend) => {
        console.log('Livros recebidos do backend:', livrosDoBackend);

        // Prepara os IDs dos livros para a chamada à Google Books API
        const ids = livrosDoBackend.map((book: { id: any }) => ({ id: book.id }));
        console.log('IDs enviados para a Google Books API:', ids);

        // Faz a requisição para obter detalhes dos livros da Google Books API
        this.status.getLivrosFromGoogle(ids).subscribe(
          (data) => {
            console.log('Dados retornados da Google Books API:', data);
            this.livros = data; // Atualiza a lista de livros
            this.carregarLivrosVisiveis(); // Atualiza a exibição dos livros visíveis
          },
          (error) => {
            console.error('Erro ao obter dados da Google Books API:', error);
            alert('Erro ao consultar a API do Google Books.');
          }
        );
      },
      (error) => {
        console.error('Erro ao obter livros por status via POST:', error);
      }
    );
    }
  }

  carregarLivrosVisiveis() {
    if (this.livros.length > 0) {
      for (let x = 0; this.livros_visiveis.length < 8 && x < this.livros.length; x++) {
        this.livros_visiveis.push(this.livros[x]);
      }
    } else {
      console.log('Nenhum livro para exibir.');
    }
  }

  openBookDetails(book: any): void {
    this.selectedBook = book;
    this.selecionar.setSelectedBook(book);
    this.resenhaService.obterResenhas(book.id)
      .subscribe(respostas => {
        this.resenhas = respostas;  // Armazena as resenhas retornadas
      });
  }

  closeBookDetails(): void {
    this.selectedBook = null;
  }

  proximo() {
    if (this.livros.length > 0) {
      const primeiro = this.livros_visiveis.shift();
      const proximoIndex = (this.livros.indexOf(this.livros_visiveis[this.livros_visiveis.length - 1]) + 1) % this.livros.length;
      this.livros_visiveis.push(this.livros[proximoIndex]);
    }
  }

  anterior() {
    if (this.livros.length > 0) {
      const ultimo = this.livros_visiveis.pop();
      const anteriorIndex = (this.livros.indexOf(this.livros_visiveis[0]) - 1 + this.livros.length) % this.livros.length;
      this.livros_visiveis.unshift(this.livros[anteriorIndex]);
    }
  }

  postarResenha(): void {
    const idLivro = this.selectedBook.id;
    const idUsuario_string = localStorage.getItem('id_usuario');
    let idUsuario: number;
    const comentario = this.novoComentario;
    if (idUsuario_string != null) {
      idUsuario = +idUsuario_string;
      this.enviarResenhaService.postarResenha({ id_livro: idLivro, id_usuario: idUsuario, comentario }).subscribe(
        (response) => {
          alert('Resenha postada com sucesso!');
          this.novoComentario = ''; // Limpa o campo de comentário
          this.resenhas.push({ nome_usuario: 'Você', comentario });
        },
        (error) => {
          console.error('Erro ao postar resenha:', error);
          alert('Erro ao postar resenha. Tente novamente mais tarde.');
        }
      );
    }
  }
}
