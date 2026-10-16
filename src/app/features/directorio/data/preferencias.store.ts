import { Injectable, signal, effect } from '@angular/core';

const CLAVE = 'fcc.favoritos'; 
  
/** Lee un valor JSON del almacenamiento de forma segura. */ 
function leer<T>(clave: string, porDefecto: T): T { 
  try { 
    const valor = localStorage.getItem(clave); 
    return valor ? (JSON.parse(valor) as T) : porDefecto; 
  } catch { 
    return porDefecto; 
  } 
}

/** PARTE 4 · Favoritos persistentes con signal + effect + localStorage. */
@Injectable({ providedIn: 'root' })
export class PreferenciasStore {
  // TODO 4.1: leer el valor inicial de localStorage ('fcc.favoritos')
  readonly favoritos = signal<string[]>(leer<string[]>(CLAVE, [])); 

  //TODO 4.2 Guardar cada cambio con effect
constructor() { 
  effect(() => { 
    try { 
      localStorage.setItem(CLAVE, JSON.stringify(this.favoritos())); 
    } catch { 
      /* almacenamiento no disponible: la aplicación sigue funcionando */ 
    } 
  }); 
} 

  esFavorito(id: string): boolean {
    return this.favoritos().includes(id);
  }

  alternar(id: string): void {
    // TODO 4.3: agregar o quitar el id con this.favoritos.update(...)
    this.favoritos.update((f) => 
    f.includes(id) ? f.filter((x) => x !== id) : [...f, id], 
  ); 
  }
}
