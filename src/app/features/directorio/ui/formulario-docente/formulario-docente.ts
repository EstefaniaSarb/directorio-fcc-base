import { Component, effect, inject, input, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NuevoDocente } from '../../../../core/models/docente';
import { EstadoGuardado } from '../../data/docentes.store';

/** Formulario presentacional con botón de estados (3.3.2). */
@Component({
  selector: 'app-formulario-docente',
  imports: [ReactiveFormsModule],
  templateUrl: './formulario-docente.html',
  styleUrl: './formulario-docente.css',
})
export class FormularioDocente {
  readonly estado = input<EstadoGuardado>('reposo');
  readonly guardar = output<NuevoDocente>();

  private readonly fb = inject(FormBuilder);
  protected readonly form = this.fb.nonNullable.group({
    nombre: ['', [Validators.required, Validators.minLength(3)]],
    correo: [
      '',
      [Validators.required, Validators.pattern(/^[\w.+-]+@correo\.buap\.mx$/i)],
    ],
    area: ['', Validators.required],
  });

  constructor() {
    // Limpia el formulario cuando el guardado fue exitoso
    effect(() => {
      if (this.estado() === 'exito') this.form.reset();
    });
  }

  enviar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.guardar.emit(this.form.getRawValue());
  }
}
