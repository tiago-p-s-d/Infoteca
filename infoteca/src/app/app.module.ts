import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LivrosComponent } from './componentes/livros/livros.component';
import { HeaderComponent } from './componentes/header/header.component';
import { PesquisarComponent } from './componentes/pesquisar/pesquisar.component';
import { BibliotecaComponent } from './componentes/biblioteca/biblioteca.component';
import { RecomendadosComponent } from './componentes/recomendados/recomendados.component';

@NgModule({
  declarations: [
    AppComponent,
    LivrosComponent,
    HeaderComponent,
    PesquisarComponent,
    BibliotecaComponent,
    RecomendadosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
