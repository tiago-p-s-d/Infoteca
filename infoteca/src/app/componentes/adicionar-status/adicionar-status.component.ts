import { Component, Input, OnInit } from '@angular/core';
import { AdicionarStatusService } from '../../services/adicionar_status/adicionar-status.service';
import { LivrosComponent } from '../livros/livros.component';
import { SelecionarService } from '../../services/selecionar_livros/selecionar.service';

@Component({
  selector: 'app-adicionar-status',
  templateUrl: './adicionar-status.component.html',
  styleUrl: './adicionar-status.component.css'
})


export class AdicionarStatusComponent implements OnInit{
  selectedBook: any;
  statusOptions: any[] = []; // Opções de status
  selectedStatusId: number | undefined = undefined; // Status selecionado
  id_usuario: number = +`${localStorage.getItem('id_usuario')}`

  constructor(private statusLivroService: AdicionarStatusService,  private selecionado: SelecionarService) { }

  ngOnInit(): void {
    this.selecionado.selectedBook$.subscribe((book) => {
      this.selectedBook = book;
    });
    // Aqui você pode buscar os status disponíveis para os livros
    this.statusOptions = [
      { id: 1, nome: 'Favoritos' },
      { id: 2, nome: 'Lendo' },
      { id: 3, nome: 'Já Li' },
      { id: 4, nome: 'Quero Ler' }
    ];
  }



  salvarStatusLivro(): void {
    if (!this.selectedStatusId) {
      alert('Por favor, selecione um status!');
      return;
    }

    const isbn = this.selectedBook.volumeInfo.industryIdentifiers[0].identifier;
    const id_usuario = +localStorage.getItem('id_usuario')!;

    this.statusLivroService.adicionarStatusDoLivro(isbn, this.selectedStatusId, this.id_usuario).subscribe(
      (response) => {
        alert('Status do livro adicionado com sucesso!');
      },
      (error) => {
        console.error('Erro ao adicionar status ao livro:', error);
        alert('Erro ao adicionar status ao livro. Tente novamente mais tarde.');
      }
    );
  }

/*
  enviarStatus() {
    if (!this.isbn || !this.status || !this.id_usuario) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    this.statusLivroService.adicionarStatusDoLivro(this.isbn, this.status, this.id_usuario).subscribe({
      next: (response) => {
        console.log('Status do livro atualizado com sucesso!', response);
        alert(response.message);
      },
      error: (err) => {
        console.error('Erro ao atualizar status do livro:', err);
        alert('Erro ao atualizar o status do livro.');
      }
    });
  }*/

}
