import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoggedUserMenuNavbarComponent } from '../logged-in-user-menu-navbar/logged-in-user-menu-navbar.component';

@Component({
  selector: 'app-agrega-agenda',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    NgOptimizedImage,
    LoggedUserMenuNavbarComponent
  ],
  templateUrl: './agrega-agenda.component.html',
  styleUrl: './agrega-agenda.component.css'
})
export class AgregaAgendaComponent implements OnInit {
  theme?: string;

  ngOnInit(): void {
    const storagedTheme = window.localStorage.getItem("theme");

    if (storagedTheme === null) {
      // Default Menu-Administrador UI theme
      window.localStorage.setItem("theme", "light");
    }
    this.theme = storagedTheme as string;
  }

  toggleTheme(boolTheme: boolean): void {
    boolTheme === false ? (
      window.localStorage.setItem("theme", "dark")
    ) : (
      window.localStorage.setItem("theme", "light")
    );

    const storagedTheme = window.localStorage.getItem("theme");
    console.log(storagedTheme);
    this.theme = (storagedTheme as string);
  }
}
