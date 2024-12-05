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

  fazerLogin() {
    this.autenticar.autenticar(this.email, this.senha).subscribe((autenticado) => {
      if (autenticado) {
        this.mensagem = 'Login realizado com sucesso!';
        this.router.navigate(['/home']);
      } else {
        this.mensagem = 'Email ou senha inválidos!';
      }
    });
  }
}
