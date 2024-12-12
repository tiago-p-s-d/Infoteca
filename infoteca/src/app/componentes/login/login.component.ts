import { Component } from '@angular/core';
import { AutenticarService } from '../../services/autenticar/autenticar.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email = '';
  senha = '';
  mensagem = '';

  constructor(private autenticar: AutenticarService, private router: Router ) {}


  teste(){
    console.log('tá chamando o botao')
  }
  /*fazerLogin() {
    this.autenticar.autenticar(this.email, this.senha).subscribe((autenticado) => {
      if (autenticado) {
        this.mensagem = 'Login realizado com sucesso!';
        this.router.navigate(['/home']);
      } else {
        this.mensagem = 'Email ou senha inválidos!';
      }
    });
  }*/

  fazerLogin() {
    this.autenticar.autenticar(this.email, this.senha).subscribe((response) => {
      const token = response.token;
      const id_usuario = response.id_usuario;
      if (token && id_usuario) {
        // Armazenando o token no localStorage
        localStorage.setItem('authToken', token); 
        localStorage.setItem('id_usuario', id_usuario);
        this.router.navigate(['/home']);  // Redireciona para a página /home
      }
    },error => {
      console.error('Erro no login:', error);
  });
}

}
