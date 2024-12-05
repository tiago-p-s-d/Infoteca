import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RecomendadosComponent } from './componentes/recomendados/recomendados.component';
import { PesquisarComponent } from './componentes/pesquisar/pesquisar.component';

const routes: Routes = [

  {path: 'home', component: RecomendadosComponent},
  {path: 'pesquisar', component: PesquisarComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
