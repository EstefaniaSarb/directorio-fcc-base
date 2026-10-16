import { Component, input, output } from '@angular/core';
import { Docente } from '../../../../core/models/docente';

/** PARTE 3 · Componente presentacional: recibe datos y emite eventos. */
@Component({
  selector: 'app-tarjeta-docente',
  templateUrl: './tarjeta-docente.html',
  styleUrl: './tarjeta-docente.css',
})
export class TarjetaDocente {
  // TODO 3.1: identificar las entradas (input) y las salidas (output)
  readonly docente = input.required<Docente>();
  readonly favorito = input(false);
  readonly eliminar = output<void>();
  readonly alternarFavorito = output<void>();
}
