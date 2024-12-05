import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RecomendadosComponent } from './componentes/recomendados/recomendados.component';
import { PesquisarComponent } from './componentes/pesquisar/pesquisar.component';
import { LoginComponent } from './componentes/login/login.component';
import { authGuard } from './guard/auth.guard';
import { CadastrarComponent } from './componentes/cadastrar/cadastrar.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {path: 'home', component: RecomendadosComponent, canActivate: [authGuard]},
  {path: 'pesquisar', component: PesquisarComponent , canActivate: [authGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'cadastrar', component: CadastrarComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
