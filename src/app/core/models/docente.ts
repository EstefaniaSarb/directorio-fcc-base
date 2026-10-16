/** Modelo del dominio. json-server v1 genera identificadores de texto. */
export interface Docente {
  id: string;
  nombre: string;
  correo: string;
  area: string;
}

/** Datos necesarios para registrar un docente (el servidor asigna el id). */
export type NuevoDocente = Omit<Docente, 'id'>;
