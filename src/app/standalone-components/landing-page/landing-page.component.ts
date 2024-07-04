import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FirebaseService } from '../../services/firebase.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    NgOptimizedImage
  ],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css'
})
export class LandingPageComponent {
  protected firebaseService = inject(FirebaseService);
  cookies = inject(CookieService);
  email! : string;

  ngOnInit(): void {
    this.email = this.cookies.get('email');
  }
  
  signOut() {
    this.firebaseService.signOut()
      .then(v => {
        window.alert("Sesión cerrada con éxito");
      })
      .catch(error => {window.alert(error)});
  }
}
