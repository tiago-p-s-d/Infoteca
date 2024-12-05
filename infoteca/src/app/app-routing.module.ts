import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RecomendadosComponent } from './componentes/recomendados/recomendados.component';
import { PesquisarComponent } from './componentes/pesquisar/pesquisar.component';
import { LoginComponent } from './componentes/login/login.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {path: 'home', component: RecomendadosComponent},
  {path: 'pesquisar', component: PesquisarComponent},
  {path: 'login', component: LoginComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
