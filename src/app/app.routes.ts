import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'directorio', pathMatch: 'full' },
  {
    path: 'directorio',
    loadComponent: () =>
      import('./features/directorio/directorio-pagina').then(
        (m) => m.DirectorioPagina,
      ),
  },
  { path: '**', redirectTo: 'directorio' },
];
