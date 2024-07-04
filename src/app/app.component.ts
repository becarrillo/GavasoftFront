import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AdminMenuComponent } from './standalone-components/admin-menu/admin-menu.component';
import { CommonModule } from '@angular/common';
import { AgregaServiciosComponent } from './standalone-components/agrega-servicios/agrega-servicios.component';
// import { FirebaseService } from './services/firebase.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    AdminMenuComponent,
    AgregaServiciosComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent  {
  title = 'gavasoft-front';
  themeIsDark : boolean = false;
  userIsLogged : boolean = false;
}
