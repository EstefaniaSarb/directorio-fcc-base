import { Component, computed, input } from '@angular/core';

/** Marcador de carga accesible (3.3.1). */
@Component({
  selector: 'app-esqueleto',
  templateUrl: './esqueleto.html',
  styleUrl: './esqueleto.css',
})
export class Esqueleto {
  readonly cantidad = input(4);
  protected readonly items = computed(() =>
    Array.from({ length: this.cantidad() }, (_, i) => i),
  );
}
