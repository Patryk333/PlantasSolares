import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from "./components/header/header";
import { PlantasTable } from "./plantas/plantas-table/plantas-table";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, PlantasTable],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('PlantasTS');
}
