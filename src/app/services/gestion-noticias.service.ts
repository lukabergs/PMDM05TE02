import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { INoticia, INoticias } from '../interfaces/mis-interfaces';
import { GestionStorageService } from './gestion-storage.service';

@Injectable({
  providedIn: 'root'
})
export class GestionNoticiasService {
  private noticias: INoticias;
  private noticiasSeleccionadas: INoticia[] = [];
  private apiKey = '1b4024b695874c7895994b08f50a2ba6';
  private categorias = ['general', 'business', 'technology', 'science', 'sports', 'health', 'entertainment'];

  constructor(private restServer: HttpClient, private gestionAlmacen: GestionStorageService) {
    this.cargarNoticias();
  }

  getNoticias() {
    return this.noticias ? this.noticias.articles : [];
  }

  getCategorias() {
    return this.categorias;
  }

  getNoticiasSeleccionadas() {
    return this.noticiasSeleccionadas;
  }

  getNoticiasRest(categoria: string) {
    const apiUrl = 'https://newsapi.org/v2/top-headlines';
    const pais = 'us';

    const params = new HttpParams()
      .set('country', pais)
      .set('category', categoria)
      .set('apiKey', this.apiKey);

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    this.restServer.get<INoticias>(apiUrl, { params, headers }).subscribe(
      (datos) => {
        console.log(datos);
        this.noticias = datos;
        this.guardarNoticias();
      },
      (error) => {
        console.error('Error al consultar las noticias en NewsAPI:', error);
      }
    );
  }

  guardarNoticias() {
    this.gestionAlmacen.setObject('noticias', this.noticias);
  }

  cargarNoticias() {
    this.gestionAlmacen.getObject('noticias').then((datos) => {
      if (datos) {
        this.noticias = datos;
        let noticia;
        for (let i = 0; i < this.noticias.articles.length; i++) {
          noticia = this.noticias.articles[i];
          if (noticia.checked) {
            this.noticiasSeleccionadas.push(noticia);
          }
        }
      } else {
        this.getNoticiasRest('business');
      }
    });
  }

  seleccionarNoticia(noticia: INoticia) {
    if (!noticia.checked) {
      noticia.checked = true;
      this.noticiasSeleccionadas.push(noticia);
      this.guardarNoticias();
    } else {
      this.eliminarNoticia(noticia);
    }
  }

  eliminarNoticia(noticia: INoticia) {
    for (let i = 0; i < this.noticiasSeleccionadas.length; i++) {
      if (this.noticiasSeleccionadas[i].url == noticia.url) {
        noticia.checked = false;
        this.noticiasSeleccionadas.splice(i,1);
        this.guardarNoticias();
      }
    }
  }
}
