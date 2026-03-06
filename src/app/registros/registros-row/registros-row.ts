import { Component, input } from '@angular/core';
import { Registro } from '../registro';

@Component({
  selector: '[app-registros-row]',
  imports: [],
  templateUrl: './registros-row.html',
  styleUrl: './registros-row.css',
})
export class RegistrosRow {

  registro = input.required<Registro>({alias: "registroId"});
}
