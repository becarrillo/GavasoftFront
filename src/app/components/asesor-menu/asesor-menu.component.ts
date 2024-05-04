import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component,  OnInit } from '@angular/core';
import asesorConfig from '../../../configs/roles.asesor.config';
import { RouterModule } from '@angular/router';
import { LoggedUserMenuNavbarComponent } from '../logged-in-user-menu-navbar/logged-in-user-menu-navbar.component';

@Component({
  selector: 'app-asesor-menu',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    NgOptimizedImage,
    LoggedUserMenuNavbarComponent
  ],
  templateUrl: './asesor-menu.component.html',
  styleUrl: './asesor-menu.component.css'
})
export class AsesorMenuComponent implements OnInit {
  items : any = asesorConfig.asesorMenu;
  rolName : string = asesorConfig.rolName;
  themeIsDark? : boolean;

  ngOnInit(): void {
    if (window.localStorage.getItem("theme") === null) {
      this.themeIsDark = false;
    }
  }

  setItems(title : string) {
    this.items = asesorConfig.asesorMenu.find(i => i.title === title)?.submenu;
  }

  toggleTheme() {
    !this.themeIsDark ? (
      window.localStorage.setItem("theme", "dark")
    ) : (
      window.localStorage.setItem("theme", "light")
    );

    if (window.localStorage.getItem("theme") === "light") {
      this.themeIsDark = true;
    } else {
      this.themeIsDark = false;
    }
  }
}
