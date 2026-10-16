import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Docente, NuevoDocente } from '../../../core/models/docente';

/** PARTE 2a · Servicio de datos: única pieza que conoce las rutas de la API. */
@Injectable({ providedIn: 'root' })
export class DocentesService {
  private readonly http = inject(HttpClient);
  private readonly url = `${environment.apiUrl}/docentes`;

  listar(): Observable<Docente[]> {
    // TODO 2a.1: devolver this.http.get<Docente[]>(this.url)
    return of([]);
  }

  crear(docente: NuevoDocente): Observable<Docente> {
    // TODO 2a.2: devolver this.http.post<Docente>(this.url, docente)
    return of({ id: '0', ...docente });
  }

  eliminar(id: string): Observable<void> {
    // TODO 2a.3: devolver this.http.delete<void>(`${this.url}/${id}`)
    return of(undefined);
  }
}
