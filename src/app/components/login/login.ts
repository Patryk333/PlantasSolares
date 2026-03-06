import { JsonPipe, NgClass } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { Form, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Supaservice } from '../../services/supaservice';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, NgClass, JsonPipe],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  private supaservice: Supaservice = inject(Supaservice);

  formulario: FormGroup;
  formBuilder: FormBuilder = inject(FormBuilder);
  logguedData = signal<any>('');
  errorMessage = signal('');

  constructor() {
    this.formulario = this.formBuilder.group({
      email: ['',[Validators.email,Validators.required]],
      password: ['',[Validators.required, Validators.minLength(8)]]
    })
  }

  login(){
    if(this.formulario.valid){
      const loginData = this.formulario.value;
    this.supaservice.login(loginData).then((data) => {
      console.log(data);
      this.logguedData.set(data);
      this.errorMessage.set("");
    }).catch((error: Error) => {
      this.errorMessage.set(error.message);
    })
    }else{
      this.errorMessage.set("Formulario no valido")
    }
  }

  get emailNotValid(){
    return this.formulario.get('email')!.invalid && this.formulario.get('email')!.touched;
  }

  get emailValid(){
    return this.formulario.get('email')!.valid && this.formulario.get('email')!.touched;
  }

  get emailValidation(){
    return ;
  }
  
}
