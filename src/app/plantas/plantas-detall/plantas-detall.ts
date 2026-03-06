import { Component, computed, inject, input, resource } from '@angular/core';
import { PLANTAS_DEMO } from '../plantas_demo';
import { toSignal } from '@angular/core/rxjs-interop';
import { from } from 'rxjs';
import { Supaservice } from '../../services/supaservice';

@Component({
  selector: 'app-plantas-detall',
  imports: [],
  templateUrl: './plantas-detall.html',
  styleUrl: './plantas-detall.css',
})
export class PlantasDetall {
  private supaservice: Supaservice = inject(Supaservice);

  id = input<string>();

  planta = resource({
    loader: async () => {
      const idValue = this.id();
      if (!idValue) return null;
      return await this.supaservice.getPlantaSupabaseById(Number(idValue));
    }
  });

  registros = resource({
    loader: async () => {
      const idValue = this.id();
      if (!idValue) return null;
      return await this.supaservice.getRegistresSupabaseByPlantaId(Number(idValue));
    }
  });
}