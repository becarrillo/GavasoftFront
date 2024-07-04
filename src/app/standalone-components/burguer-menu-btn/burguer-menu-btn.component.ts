import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-burguer-menu-btn',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './burguer-menu-btn.component.html',
  styleUrl: './burguer-menu-btn.component.css'
})
export class BurguerMenuBtnComponent {
  isOpen : boolean = false;
  protected cookieService = inject(CookieService);
  protected firebaseService = inject(FirebaseService);
  
  signOut() {
    this.firebaseService.signOut()
      .then(v => {
        window.alert("Sesión cerrada con éxito");
      })
      .catch(error => {window.alert(error)});
  }

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }
}
