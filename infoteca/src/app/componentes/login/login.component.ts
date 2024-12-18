import { Component, OnInit } from '@angular/core';
import { AutenticarService } from '../../services/autenticar/autenticar.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  email = '';
  senha = '';
  mensagem = '';

  constructor(private autenticar: AutenticarService, private router: Router ) {}
  ngOnInit(): void {
    if (typeof window !== 'undefined' && localStorage) {
      localStorage.removeItem('token');
    }
  }

  irPraCadastrar(): void{
    this.router.navigate(['/cadastrar']);  // Redireciona para a página /home
  }

  fazerLogin() {
    //aqui usa o serviço "autenticar", ele passa o email e a senha por aqui
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
