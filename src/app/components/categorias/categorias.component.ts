import { Component } from '@angular/core';
import { GestionNoticiasService } from '../../services/gestion-noticias.service';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.scss'],
})
export class CategoriasComponent {

  constructor(public gestionNoticias: GestionNoticiasService) { }

}
