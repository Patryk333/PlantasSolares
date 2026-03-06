import { Component, input, output } from '@angular/core';
import { Planta } from '../planta';

@Component({
  selector: 'app-plantas-item',
  imports: [],
  templateUrl: './plantas-item.html',
  styleUrl: './plantas-item.css',
})
export class PlantasItem {

  planta = input.required<Planta>();

  favoriteToggled = output<void>();

  toggleFavorite(){
    this.favoriteToggled.emit();
  }
}
