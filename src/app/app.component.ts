import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AdminMenuComponent } from './components/admin-menu/admin-menu.component';
import { CommonModule } from '@angular/common';
import { AgregaServiciosComponent } from './components/agrega-servicios/agrega-servicios.component';

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
export class AppComponent {
  title = 'gavasoft-front';
  themeIsDark : boolean = false;
  
}
