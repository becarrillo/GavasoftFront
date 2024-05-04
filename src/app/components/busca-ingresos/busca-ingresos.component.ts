import { Component, OnInit } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LoggedUserMenuNavbarComponent } from '../logged-in-user-menu-navbar/logged-in-user-menu-navbar.component';

@Component({
  selector: 'app-busca-ingresos',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    NgOptimizedImage,
    LoggedUserMenuNavbarComponent
  ],
  templateUrl: './busca-ingresos.component.html',
  styleUrl: './busca-ingresos.component.css'
})
export class BuscaIngresosComponent implements OnInit {
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
