import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RecomendadosComponent } from './componentes/recomendados/recomendados.component';
import { PesquisarComponent } from './componentes/pesquisar/pesquisar.component';
import { LoginComponent } from './componentes/login/login.component';
import { authGuard } from './guard/auth.guard';
import { CadastrarComponent } from './componentes/cadastrar/cadastrar.component';
import { VerificarComponent } from './componentes/verificar/verificar.component';
import { AdicionarStatusComponent } from './componentes/adicionar-status/adicionar-status.component';
import { StatusLivroComponent } from './componentes/status-livro/status-livro.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {path: 'login', component: LoginComponent},
  { path: 'verificar', component: VerificarComponent },
  {path: 'cadastrar', component: CadastrarComponent},
  {path: 'home', component: RecomendadosComponent, canActivate: [authGuard]},
  {path: 'pesquisar', component: PesquisarComponent , canActivate: [authGuard]},
  {path: 'adicionar_status', component: AdicionarStatusComponent, canActivate: [authGuard]},
  {path: 'status', component: StatusLivroComponent, canActivate: [authGuard]},


];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
