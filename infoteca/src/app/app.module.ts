import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LivrosComponent } from './componentes/livros/livros.component';
import { HeaderComponent } from './componentes/header/header.component';
import { PesquisarComponent } from './componentes/pesquisar/pesquisar.component';
import { BibliotecaComponent } from './componentes/biblioteca/biblioteca.component';
import { RecomendadosComponent } from './componentes/recomendados/recomendados.component';
import { ObterResenhasComponent } from './componentes/obter-resenhas/obter-resenhas.component';
import { LoginComponent } from './componentes/login/login.component';
import { CadastrarComponent } from './componentes/cadastrar/cadastrar.component';

@NgModule({
  declarations: [
    AppComponent,
    LivrosComponent,
    HeaderComponent,
    PesquisarComponent,
    BibliotecaComponent,
    RecomendadosComponent,
    ObterResenhasComponent,
    LoginComponent,
    CadastrarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule  
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
