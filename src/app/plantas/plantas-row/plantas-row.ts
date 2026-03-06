import { Component, input, output } from '@angular/core';
import { Planta } from '../planta';

@Component({
  selector: '[app-plantas-row]',
  imports: [],
  templateUrl: './plantas-row.html',
  styleUrl: './plantas-row.css',
})
export class PlantasRow {
  
 planta = input.required<Planta>({alias: 'plantaId'});
  action = output<{action: 'editar' | 'eliminar', planta: Planta}>();
  editar() {
    //console.log('Editar planta', this.planta());
    this.action.emit({action: 'editar', planta: this.planta()});
  }
  eliminar() {
    //console.log('Eliminar planta', this.planta());
    this.action.emit({action: 'eliminar', planta: this.planta()});
  }
}
