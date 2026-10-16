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
  readonly filtrados = computed(() => this.docentes());

  // Acciones
  cargar(): void {
    // TODO 2b.1: activar cargando, limpiar error y llamar a this.api.listar()
    //   - .pipe(finalize(...)) apaga cargando en éxito o en error
    //   - next: this.docentes.set(lista)
    //   - error: this.error.set(SIN_CONEXION)
  }

  agregar(docente: NuevoDocente): void {
    // TODO 2b.2: guardado = 'guardando' y llamar a this.api.crear(docente)
    //   - next: agregar con this.docentes.update(...) sin mutar el arreglo,
    //           guardado = 'exito' y regresar a 'reposo' después de 2 s
    //   - error: guardado = 'error'
  }

  eliminar(id: string): void {
    // TODO 2b.3: llamar a this.api.eliminar(id) y quitarlo con update(...)
  }
}
