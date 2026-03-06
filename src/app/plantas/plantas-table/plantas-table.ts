import { Component, inject, output, signal } from '@angular/core';
import { Planta } from '../planta';
import { PlantasRow } from "../plantas-row/plantas-row";
import { PLANTAS_DEMO } from '../plantas_demo';
import { Supaservice } from '../../services/supaservice';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-plantas-table',
  imports: [PlantasRow],
  templateUrl: './plantas-table.html',
  styleUrl: './plantas-table.css',
})
export class PlantasTable {

  private supaservice: Supaservice = inject(Supaservice);
  //plantes: Planta[] = PLANTAS_DEMO;
  plantes = toSignal(this.supaservice.plantesSubject);

  action = output<{action: 'editar' | 'eliminar', planta: Planta}>();

  onAction(event: {action: 'editar' | 'eliminar', planta: Planta}) {
    this.action.emit(event);
  }
}
