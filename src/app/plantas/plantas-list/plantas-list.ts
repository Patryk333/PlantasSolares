import { Component, computed, effect, inject, input, OnDestroy, OnInit, signal } from '@angular/core';
import { Planta } from '../planta';
import { PlantasItem } from '../plantas-item/plantas-item';
import { Supaservice } from '../../services/supaservice';
import { from, Subscription } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop'

@Component({
  selector: 'app-plantas-list',
  imports: [PlantasItem],
  templateUrl: './plantas-list.html',
  styleUrl: './plantas-list.css',
})
export class PlantasList implements OnInit, OnDestroy {
  private supaservice: Supaservice = inject(Supaservice);

  search = input('');
  plantas = toSignal(this.supaservice.plantesSubject)

  // public plantas = signal<Planta[]>([]);
  // plantesSuscription?: Subscription;

  constructor(){
    effect(() => {
      this.supaservice.setSearchString(this.search());
    })
  }

  ngOnInit(): void {
    // this.plantesSuscription = this.supaservice.getPlantes().subscribe((plantasSupabase: Planta[]) => {
    //   this.plantas.set(plantasSupabase);
    // });

    // this.supaservice.getPlantesSupabase().then((p: Planta[]) => this.plantas.set(p))

    this.supaservice.plantesResource.reload();
  }

  ngOnDestroy():void {
    //this.plantesSuscription && this.plantesSuscription.unsubscribe();
  }

  

  // plantasResource = this.supaservice.getPlantesSignal();
  // plantas = computed(() => this.plantesResource.value() ?? []);

  toggleFavorite(planta: Planta) {
    planta.favorite = !planta.favorite;
  }
}
