import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AutenticarService } from '../../services/autenticar/autenticar.service';  // Serviço para registrar no backend


@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.component.html',
  styleUrl: './cadastrar.component.css'
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

    this.autenticarService.register(newUser).subscribe(
      (response) => {
        console.log(response.message); 
        this.mensagem = 'Usuário registrado com sucesso!';
        this.router.navigate(['/login']); // Navega para a tela de login após o sucesso
      },
      (error) => {
        this.mensagem = 'Erro ao registrar o usuário. Tente novamente.';
        console.error(error);
      }
    );
  }
}
