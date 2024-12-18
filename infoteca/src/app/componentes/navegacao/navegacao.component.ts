import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';  // Para manipular a navegação
import { ObterStatusService } from '../../services/obter_status/obter-status.service';

@Component({
  selector: 'app-navegacao',
  templateUrl: './navegacao.component.html',
  styleUrl: './navegacao.component.css'
})
export class NavegacaoComponent {
  statusList:any[] = [];  // Lista de status
  @Output() statusSelecionado = new EventEmitter<string>();  // Emite o id_status selecionado

  constructor(private statusService: ObterStatusService, private router: Router) {}

  ngOnInit(): void {
    // Pega os status ao inicializar o componente
    this.statusService.getStatus().subscribe(
      (data) => {
        console.log('Status recebidos da API:', data); // Verifica o retorno da API
        this.statusList = data;  // Armazena os status recebidos
      },
      (error) => {
        console.error('Erro ao buscar os status:', error);
      }
    );
  }
  modalVisible = false;

 pesquisar(){
  this.router.navigate(['/pesquisar']);  
}

  // Fecha o modal
  closeModal(): void {
    this.modalVisible = false;
  }

  // Alterna a visibilidade do modal ao clicar no menu hamburguer
  toggleModal(): void {
    this.modalVisible = !this.modalVisible;

  }






  // Função que será chamada ao clicar em um status
  onStatusClick(status: any): void {
    const id_status = status.id_status;
    localStorage.setItem('id_status', `${id_status}`);

  // Força a navegação para a mesma rota
  this.router.navigateByUrl('/status').then(() => {
    // Força a recarga completa da rota
    window.location.reload();  // Recarrega a página inteira
  });
}



}
