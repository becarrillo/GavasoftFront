import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FirebaseService } from '../../services/firebase.service';

@Component({
  selector: 'app-cliente-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    NgOptimizedImage
  ],
  templateUrl: './cliente-register.component.html',
  styleUrl: './cliente-register.component.css'
})
export class ClienteRegisterComponent  {
  registerGroup = new FormGroup({
    apellidosControl: new FormControl(''),
    nombreControl: new FormControl(''),
    emailControl: new FormControl(''),
    telControl: new FormControl(''),
    passwordControl: new FormControl(''),
    confirmPswControl: new FormControl('')
  });
  validate! : boolean;
  firebaseService = inject(FirebaseService);

  setDataAuth(): void {
    if (!this.validate) {
      this.validate = true;
    }
  }

  //firebaseService = inject(FirebaseService);

  async onSubmit(ev : Event) {
    ev.preventDefault();
    
    const myPassword = this.registerGroup.value.passwordControl;
    const myEmail = this.registerGroup.value.emailControl;
    if (myEmail && myPassword) {
      await this.firebaseService.createUserAccount(myEmail, myPassword);
    }
  } 
}
