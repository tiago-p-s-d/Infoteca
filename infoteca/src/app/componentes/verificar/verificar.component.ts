import { Component } from '@angular/core';
import { VerificarEmailService } from '../../services/verificar/verificar-email.service';
import { Router } from '@angular/router'; // Para navegação após sucesso

@Component({
  selector: 'app-verificar',
  templateUrl: './verificar.component.html',
  styleUrl: './verificar.component.css'
})
export class VerificarComponent {
  email: string = '';
  codigo_verificacao: string = '';
  message: string = '';
  errorMessage: string = '';

  constructor(private authService: VerificarEmailService, private router: Router) {}

  // Método chamado quando o usuário envia o formulário
  verificarCodigo() {
    // Chama o serviço para verificar o código
    this.authService.verificarCodigo(this.email, this.codigo_verificacao).subscribe(
      (response) => {
        // Sucesso: Redireciona o usuário ou exibe uma mensagem
        this.message = response.message;
        setTimeout(() => {
          this.router.navigate(['/login']); // Redireciona para a página de login
        }, 2000);
      },
      (error) => {
        // Em caso de erro, exibe a mensagem
        this.errorMessage = error.error || 'Erro ao verificar o código';
      }
    );
  }


}
