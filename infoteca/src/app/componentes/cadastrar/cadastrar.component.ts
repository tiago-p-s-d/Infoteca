import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AutenticarService } from '../../services/autenticar/autenticar.service';  // Serviço para registrar no backend

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.component.html',
  styleUrls: ['./cadastrar.component.css']
})
export class CadastrarComponent {

  nome_usuario: string = '';
  email: string = '';
  senha: string = '';
  mensagem: string = '';

  constructor(private autenticarService: AutenticarService, private router: Router) {}

  registerUser() {
    const newUser = {
      nome_usuario: this.nome_usuario,
      email: this.email,
      senha: this.senha
    };

    // Envia o novo usuário para o backend
    this.autenticarService.register(newUser).subscribe(
      (response) => {
        console.log(response.message);  // Exibe mensagem de sucesso no console (para depuração)
        this.mensagem = 'Usuário registrado com sucesso! Um e-mail com o código de verificação foi enviado para você.';

        // Redireciona para a página de verificação (onde o usuário pode inserir o código)
        this.router.navigate(['/verificar']);
        
      },
      (error) => {
        this.mensagem = 'Erro ao registrar o usuário. Tente novamente.';
        console.error(error);  // Exibe o erro no console para depuração
      }
    );
  }
}
