import { Component, inject, signal } from '@angular/core';
import { Planta } from '../planta';
import { PlantasTable } from '../plantas-table/plantas-table';
import { AdministradorPlantasFormulario } from '../administrador-plantas-formulario/administrador-plantas-formulario';
import { Supaservice } from '../../services/supaservice';

@Component({
  selector: 'app-administrador-plantas',
  imports: [PlantasTable, AdministradorPlantasFormulario],
  templateUrl: './administrador-plantas.html',
  styleUrl: './administrador-plantas.css',
})
export class AdministradorPlantas {

  private supaservice = inject(Supaservice);

  async onAction(event: any) {
    const actionEvent = event as {action: 'editar' | 'eliminar', planta: Planta};
    console.log('Acción recibida en AdministradorPlantes:', actionEvent);
    
    if (actionEvent.action === 'eliminar') {
      if (confirm(`¿Estás seguro de eliminar la planta "${actionEvent.planta.nom}"?`)) {
        try {
          await this.supaservice.deletePlanta(actionEvent.planta.id);
          
          // Recargar lista de plantas
          const plantas = await this.supaservice.getPlantesSupabase();
          this.supaservice.plantesSubject.next(plantas);
          
          alert('Planta eliminada exitosamente');
        } catch (error: any) {
          console.error('Error al eliminar:', error);
          alert('Error al eliminar: ' + (error.message || error.error_description || 'Verifica permisos en Supabase'));
        }
      }
    } else if (actionEvent.action === 'editar') {
      this.currentPlanta.set(actionEvent.planta);
    }
  }

  onFormSaved() {
    this.currentPlanta.set({} as Planta);
  }

  onFormCancelled() {
    this.currentPlanta.set({} as Planta);
  }

  currentPlanta = signal<Planta>({} as Planta);
}
