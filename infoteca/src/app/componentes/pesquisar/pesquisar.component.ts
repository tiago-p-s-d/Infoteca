import { Component, Input, OnInit } from '@angular/core';
import { ObterLivrosService } from '../../services/obter_livros/obter-livros.service';
import { ObterResenhasService } from '../../services/obter_resenhas/obter-resenhas.service';
import { EnviarResenhaService } from '../../services/enviarResenha/enviar-resenha.service';
import { SelecionarService } from '../../services/selecionar_livros/selecionar.service';
import { PesquisarService } from '../../services/pesquisar/pesquisar.service';

@Component({
  selector: 'app-pesquisar',
  templateUrl: './pesquisar.component.html',
  styleUrl: './pesquisar.component.css'
})
export class PesquisarComponent {
  livros: any[] = [];
  livros_visiveis: any[] = [];
  livroSelecionado: any = null;
  resenhas: any[] = [];
  novoComentario: string = '';

  // Critérios de busca
  queryNome: string = '';
  queryAutor: string = '';
  queryData: string = '';
  queryGenero: string = '';

  paginaAtual: number = 0;
  livrosPorPagina: number = 5;

  constructor(private pesquisar: PesquisarService, private selecionar: SelecionarService, private resenhaService: ObterResenhasService, private enviarResenhaService: EnviarResenhaService) {}

  // Busca os livros usando o serviço
  buscarLivros(): void {
    const params = {
      nome: this.queryNome,
      autor: this.queryAutor,
      data: this.queryData,
      genero: this.queryGenero,
    };

    this.pesquisar.buscarLivrosPorParametros(params).subscribe(
      (response) => {
        this.livros = response.items || [];
        this.paginaAtual = 0;
        this.atualizarLivrosVisiveis();
      },
      (error) => console.error('Erro ao buscar livros:', error)
    );
  }

  atualizarLivrosVisiveis(): void {
    const inicio = this.paginaAtual * this.livrosPorPagina;
    this.livros_visiveis = this.livros.slice(inicio, inicio + this.livrosPorPagina);
  }

  proximo(): void {
    if ((this.paginaAtual + 1) * this.livrosPorPagina < this.livros.length) {
      this.paginaAtual++;
      this.atualizarLivrosVisiveis();
    }
  }

  anterior(): void {
    if (this.paginaAtual > 0) {
      this.paginaAtual--;
      this.atualizarLivrosVisiveis();
    }
  }

  abrirLivro(book: any): void {
    this.livroSelecionado = book;
    this.selecionar.setLivroSelecionado(book);
    this.resenhaService.obterResenhas(book.id)
      .subscribe(respostas => {
        this.resenhas = respostas;  // Armazena as resenhas retornadas
      });
  }
  fecharLivro(): void {
    this.livroSelecionado = null;
  }


  postarResenha(): void {
    const idLivro = this.livroSelecionado.id; // ID do livro

    const idUsuario_string = localStorage.getItem('id_usuario'); // ID usuario
    let idUsuario: number;
    const comentario = this.novoComentario;
    if(idUsuario_string != null){

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
