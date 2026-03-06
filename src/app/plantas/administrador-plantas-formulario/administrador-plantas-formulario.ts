import { Component, inject, input, linkedSignal, output } from '@angular/core';

import { form, FormField, minLength, required, min } from '@angular/forms/signals';
import { JsonPipe } from '@angular/common';
import { Planta } from '../planta';
import { Supaservice } from '../../services/supaservice';

type PlantaFormModel = Omit<Planta, 'foto'> & { foto: string };

@Component({
  selector: 'app-administrador-plantas-formulario',
  imports: [FormField, JsonPipe],
  templateUrl: './administrador-plantas-formulario.html',
  styleUrl: './administrador-plantas-formulario.css',
})
export class AdministradorPlantasFormulario {

  private supaservice = inject(Supaservice);
  saved = output<void>();
  cancelled = output<void>();

  planta = input.required<Planta>();


  plantaModel = linkedSignal<PlantaFormModel>(() => {
  const p = this.planta();
  return {
    id: p?.id ?? 0,
    created_at: p?.created_at ?? 0,
    nom: p?.nom ?? 'plantaModel',
    ubicacio: p?.ubicacio ?? { latitude: 0, longitude: 0 },
    capacitat: p?.capacitat ?? 0,
    usuario: p?.usuario ?? '',
    foto: p?.foto ?? '',
    favorite: false,
  };
});
  plantaForm = form(this.plantaModel,(schemaPath) => {
    required(schemaPath.nom,{message: "Nom is required"});
    minLength(schemaPath.nom, 10,{message: "Nom has to be min 10 characters long"});
    min(schemaPath.capacitat, 1000,{message: "Capacitat has to be min 1000"})
  });


  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        const base64 = typeof reader.result === 'string' ? reader.result : '';
        this.plantaModel.update((prev) => ({ ...prev, foto: base64 }));
      };
      reader.readAsDataURL(file);
    }
  }

  async onSubmit(event: Event) {
    event.preventDefault();
    const formValue = this.plantaModel();
    
    try {
      // Obtener usuario autenticado
      const currentUser = await this.supaservice.getCurrentUser();
      if (!currentUser) {
        alert('Debes iniciar sesión para crear/editar plantas');
        return;
      }
      
      const userId = currentUser.id;
      
      if (formValue.id && formValue.id > 0) {
        // Editar planta existente
        await this.supaservice.updatePlanta(formValue.id, {
          nom: formValue.nom,
          ubicacio: formValue.ubicacio,
          capacitat: formValue.capacitat,
          usuario: userId,
          foto: formValue.foto,
          favorite: formValue.favorite
        });
        console.log('Planta actualizada exitosamente');
      } else {
        // Crear nueva planta
        await this.supaservice.insertPlanta({
          nom: formValue.nom,
          ubicacio: formValue.ubicacio,
          capacitat: formValue.capacitat,
          usuario: userId,
          foto: formValue.foto,
          favorite: formValue.favorite
        });
        console.log('Planta creada exitosamente');
      }
      
      // Recargar lista de plantas
      const plantas = await this.supaservice.getPlantesSupabase();
      this.supaservice.plantesSubject.next(plantas);
      
      this.saved.emit();
      alert('Planta guardada exitosamente');
    } catch (error: any) {
      console.error('Error al guardar la planta:', error);
      alert('Error al guardar: ' + (error.message || error.error_description || 'Error desconocido'));
    }
  }

  onCancel() {
    this.cancelled.emit();
  }
}
