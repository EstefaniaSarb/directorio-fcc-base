import { Injectable, computed, inject, signal } from '@angular/core';
import { finalize } from 'rxjs';
import { Docente, NuevoDocente } from '../../../core/models/docente';
import { DocentesService } from './docentes.service';

export type EstadoGuardado = 'reposo' | 'guardando' | 'exito' | 'error';

const SIN_CONEXION =
  'No fue posible conectar con la API. Verifique que el servidor esté activo.';

/** PARTE 2b · Store con signals: única fuente de verdad del directorio. */
@Injectable({ providedIn: 'root' })
export class DocentesStore {
  private readonly api = inject(DocentesService);

  // Estado
  readonly docentes = signal<Docente[]>([]);
  readonly cargando = signal(false);
  readonly error = signal<string | null>(null);
  readonly guardado = signal<EstadoGuardado>('reposo');
  readonly filtro = signal('');

  // Estado derivado (reto opcional: búsqueda)
  readonly filtrados = computed(() => { 
  // Función auxiliar interna para limpiar acentos y minúsculas
  const normalizar = (str: string) => 
    str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

  const f = normalizar(this.filtro().trim()); 

  return this.docentes().filter((d) => {
    const textoDocente = normalizar(`${d.nombre} ${d.area}`);
    return textoDocente.includes(f);
  }); 
});
  // Acciones
  cargar(): void {
    this.cargando.set(true); 
    this.error.set(null); 
    this.api 
      .listar() 
      .pipe(finalize(() => this.cargando.set(false))) 
      .subscribe({ 
        next: (lista) => this.docentes.set(lista), 
        error: () => this.error.set(SIN_CONEXION), 
      });
  }

  agregar(docente: NuevoDocente): void {
    this.guardado.set('guardando'); 
    this.api.crear(docente).subscribe({ 
      next: (nuevo) => { 
        this.docentes.update((lista) => [...lista, nuevo]); 
        this.guardado.set('exito'); 
        setTimeout(() => this.guardado.set('reposo'), 2000); 
      }, 
      error: () => this.guardado.set('error'), 
    }); 
  }

  eliminar(id: string): void {
    this.api.eliminar(id).subscribe({ 
    next: () => 
      this.docentes.update((lista) => lista.filter((d) => d.id !== id)), 
    error: () => this.error.set('No fue posible eliminar el registro.'), 
  }); 
  }

  
}
