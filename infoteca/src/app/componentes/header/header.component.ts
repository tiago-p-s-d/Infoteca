import { Component, OnInit } from '@angular/core';
import { AutenticarService } from '../../services/autenticar/autenticar.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  tokenAtivo: boolean = false; // Controla se o botão será exibido
  constructor(private autenticarService: AutenticarService,private router: Router) {}

  voltarHome(){
    this.router.navigate(['/home']);

  }



}
