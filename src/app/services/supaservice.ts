import { HttpClient, HttpHeaders } from '@angular/common/http';
import { computed, inject, Injectable, resource, signal, Signal } from '@angular/core';
import { BehaviorSubject, debounceTime, distinctUntilChanged, from, map, Observable, tap } from 'rxjs';
import { AuthChangeEvent, createClient, Session, SupabaseClient } from '@supabase/supabase-js';
import { Planta } from '../plantas/planta';
import { environment } from '../../environments/environment';
import { Registro } from '../registros/registro';

@Injectable({
  providedIn: 'root',
})
export class Supaservice {
  private http = inject(HttpClient);

  private supabase: SupabaseClient;

  plantesSubject = new BehaviorSubject<Planta[]>([]);
  plantesSearchSignal = signal('');

  subjectSearchString = new BehaviorSubject('');

  setSearchString(searchString: string) {
    //console.log(searchString);
    
    this.subjectSearchString.next(searchString);
  }

  loggedSubject = new BehaviorSubject<Session | null>(null);

  constructor() {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey);
    this.authChangesObservable().subscribe((session)=>{
      this.loggedSubject.next(session.session)
    });
    this.subjectSearchString
    .pipe(
      map(s => Boolean(s) ? s : ''),
      debounceTime(500),
      distinctUntilChanged(),
      map((s) => s.toLowerCase()),
      tap(s => console.log(s))
    )
    .subscribe(async (searchString) => {
      const plantes = await this.searchPlantesSupabase(searchString);
      this.plantesSubject.next(plantes);
      //this.plantesSearchSignal.set(searchString);
    })
  }

  getEcho(data: String) {
    return data;
  }
  // getPlantes(): Observable<Planta[]> {
  //   return this.http.get<Planta[]>(environment.supabaseUrl + '/rest/v1/plantes?select=*', {
  //     headers: new HttpHeaders({
  //       apikey: environment.supabaseKey,
  //       Authorization: `Bearer ${environment.supabaseKey}`
  //     }),
  //   });
  // }

  // Métodos para interactuar con Supabase
  async getPlantesSupabase(): Promise<Planta[]> {
    const { data, error } = await this.supabase.from('plantes').select('*');
    if (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
    return data;
  }

  async searchPlantesSupabase(searchString: string): Promise<Planta[]> {
    const { data, error } = await this.supabase
      .from('plantes')
      .select('*')
      .ilike('nom',`%${searchString}%`);
    if (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
    return data;
  }

  plantesResource = resource({
    params: () => ({}),
    loader: async () => {
      return await this.getPlantesSupabase();
    },
  });

  plantesSignal: Signal<Planta[]> = computed(() =>
    this.plantesResource.hasValue() ? this.plantesResource.value() : [],
  );

  async getRegistresSupabase(): Promise<Registro[]> {
    const { data, error } = await this.supabase.from('registres').select('*');
    if (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
    return data;
  }

  async getRegistresSupabaseByPlantaId(id: number): Promise<Registro[]>{
    const { data, error } = await this.supabase.from('registres').select('*').eq('planta', id);
    if (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
    return data || [];
  }

  async getPlantaSupabaseById(id: number): Promise<Planta | null> {
    console.log(id);

    const { data, error } = await this.supabase.from('plantes').select('*').eq('id', id);
    if (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
    return data && data.length > 0 ? data[0] : null;
  }

  async register(loginData: {email: string, password: string}) {
    let { data, error } = await this.supabase.auth.signUp(loginData);
    if(error) {
      console.error('Error inserting data', error);
      throw error;
    }
    return data;
  }

  async login(loginData: { email: string; password: string }) {
    let { data, error } = await this.supabase.auth.signInWithPassword(loginData);
    if (error) {
      console.error('Error inserting data', error);
      throw error;
    }
    return data;
  }

  authChanges(callback: (event: AuthChangeEvent, session: Session | null) => void) {
    return this.supabase.auth.onAuthStateChange(callback);
  }

  authChangesObservable(): Observable<{ event: AuthChangeEvent; session: Session | null }> {
    return new Observable((subscriber) => {
      const { data: authListener } = this.authChanges(
        (event: AuthChangeEvent, session: Session | null) => {
          subscriber.next({ event, session });
        },
      );

      return () => {
        authListener.subscription.unsubscribe();
      };
    });
  }

  async logout() {
    let { error } = await this.supabase.auth.signOut();
  }

  async getCurrentUser() {
    const { data: { user }, error } = await this.supabase.auth.getUser();
    if (error) {
      console.error('Error obteniendo usuario:', error);
      return null;
    }
    return user;
  }

  async insertPlanta(planta: Omit<Planta, 'id' | 'created_at'>): Promise<Planta> {
    console.log('Insertando planta:', planta);
    const { data, error } = await this.supabase.from('plantes').insert(planta).select().single();
    if (error) {
      console.error('Error insertando planta:', error);
      throw error;
    }
    console.log('Planta insertada:', data);
    return data;
  }

  async updatePlanta(id: number, planta: Partial<Planta>): Promise<Planta> {
    console.log('Actualizando planta id:', id, 'con datos:', planta);
    const { data, error } = await this.supabase
      .from('plantes')
      .update(planta)
      .eq('id', id)
      .select()
      .single();
    if (error) {
      console.error('Error actualizando planta:', error);
      throw error;
    }
    console.log('Planta actualizada:', data);
    return data;
  }

  async deletePlanta(id: number): Promise<void> {
    console.log('Eliminando planta con id:', id);
    const { error } = await this.supabase.from('plantes').delete().eq('id', id);
    if (error) {
      console.error('Error eliminando planta:', error);
      throw error;
    }
    console.log('Planta eliminada exitosamente');
  }

  // getDataObservable(): Observable<Planta[]> {
  //   return from(this.getPlantesSupabase());
  // }
}
