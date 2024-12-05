import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  
  // Verifique a presença do token no localStorage ou sessionStorage
  const token = localStorage.getItem('authToken');
  
  // Se não houver token, redirecione para a página de login
  if (!token) {
    router.navigate(['/login']);
    return false;
  }

  // Aqui você pode adicionar a lógica de validação do token, por exemplo, verificando se ele não expirou
  // (Caso tenha uma função para validar o token, você pode chamá-la aqui)
  // Exemplo simples: (não é recomendável em produção, pois não valida realmente o JWT)
  const isValidToken = token.length > 0; // Implemente validação real aqui se necessário
  
  if (!isValidToken) {
    router.navigate(['/login']);
    return false;
  }

  // Caso o token seja válido, permita o acesso à rota
  return true;
};
