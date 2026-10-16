import { Component, inject, signal } from '@angular/core';
import { Esqueleto } from '../../shared/ui/esqueleto/esqueleto';
import { DocentesStore } from './data/docentes.store';
import { PreferenciasStore } from './data/preferencias.store';
import { FormularioDocente } from './ui/formulario-docente/formulario-docente';
import { TarjetaDocente } from './ui/tarjeta-docente/tarjeta-docente';

/** PARTE 3 · Componente contenedor: conecta el store con la vista. */
@Component({
  selector: 'app-directorio-pagina',
  imports: [Esqueleto, FormularioDocente, TarjetaDocente],
  templateUrl: './directorio-pagina.html',
  styleUrl: './directorio-pagina.css',
})
export class DirectorioPagina {
  protected readonly store = inject(DocentesStore);
  protected readonly prefs = inject(PreferenciasStore);
  protected readonly termino = signal('');
  private temporizador?: ReturnType<typeof setTimeout>; 


  constructor() { 
    this.store.cargar(); // carga inicial 
} 


  /** Reto opcional: búsqueda con debounce de 300 ms. */
  buscar(valor: string): void {
    this.termino.set(valor);
    clearTimeout(this.temporizador); 
    this.temporizador = setTimeout(() => this.store.filtro.set(valor), 300);
  }
}
