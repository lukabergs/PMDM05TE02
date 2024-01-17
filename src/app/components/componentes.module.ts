import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { NoticiaComponent } from './noticia/noticia.component';
import { NoticiasComponent } from './noticias/noticias.component';
import { CategoriasComponent } from './categorias/categorias.component';

@NgModule({
  imports: [CommonModule, IonicModule],
  declarations: [NoticiaComponent, NoticiasComponent, CategoriasComponent],
  exports: [NoticiaComponent, NoticiasComponent, CategoriasComponent]
})
export class ComponentesModule { }
