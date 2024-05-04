import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-burguer-menu-btn',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './burguer-menu-btn.component.html',
  styleUrl: './burguer-menu-btn.component.css'
})
export class BurguerMenuBtnComponent {
  isOpen : boolean = false;

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }
}
