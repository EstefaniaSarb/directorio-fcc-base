import { Injectable, signal } from '@angular/core';

/** PARTE 4 · Favoritos persistentes con signal + effect + localStorage. */
@Injectable({ providedIn: 'root' })
export class PreferenciasStore {
  // TODO 4.1: leer el valor inicial de localStorage ('fcc.favoritos')
  readonly favoritos = signal<string[]>([]);

  constructor() {
    // TODO 4.2: con effect(), guardar this.favoritos() en localStorage
  }

  esFavorito(id: string): boolean {
    return this.favoritos().includes(id);
  }

  alternar(id: string): void {
    // TODO 4.3: agregar o quitar el id con this.favoritos.update(...)
  }
}
