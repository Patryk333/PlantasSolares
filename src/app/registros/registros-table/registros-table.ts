import { Component, inject, signal } from '@angular/core';
import { Registro } from '../registro';
import { RegistrosRow } from '../registros-row/registros-row';
import { Supaservice } from '../../services/supaservice';
import { toSignal } from '@angular/core/rxjs-interop';
import { from } from 'rxjs';

@Component({
  selector: 'app-registros-table',
  imports: [RegistrosRow],
  templateUrl: './registros-table.html',
  styleUrl: './registros-table.css',
})
export class RegistrosTable {
  private supaservice: Supaservice = inject(Supaservice);

  registros = toSignal(from(this.supaservice.getRegistresSupabase()),{
    initialValue: []
  });

}
