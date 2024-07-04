import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FirebaseService } from '../../services/firebase.service';
import { CookieService } from 'ngx-cookie-service';
import { EmpleadoService } from '../../services/empleado.service';
import { UsuarioDto } from '../../models/UsuarioDto';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  protected email: string = '';
  protected password: string = '';
  cookies = inject(CookieService);
  empleadoService = inject(EmpleadoService);
  firebaseService: FirebaseService = inject(FirebaseService);
  router = inject(Router);

  constructor() { }
  ngOnInit(): void {
    this.firebaseService.auth.onAuthStateChanged((user) => {
      if (user) {
        window.alert(this.cookies.get("rol"));
        setInterval(() => {
          user.refreshToken
        }, 7 * 60 * 100);
      } else {
        this.cookies.delete("username");
        this.cookies.delete("uid");
        this.cookies.delete("token");
        this.cookies.delete("email");
        this.cookies.delete("password");
        this.cookies.delete("rol");
      }
    })
  }

  getEmail() {
    return this.email;
  }

  setEmail(ev: Event) {
    this.email = ((ev.target as HTMLInputElement).value);
  }

  getPassword() {
    return this.password;
  }

  setPassword(ev: Event) {
    this.password = ((ev.target as HTMLInputElement).value)
  }

  submitLogin(ev: Event) {
    ev.preventDefault();
    let password: string = '';
    let email: string = '';

    email += this.email;
    password += this.password;
    this.empleadoService.getUsuarioDto(email)
      .subscribe((data: UsuarioDto) => {
        try {
          this.firebaseService.login(email, password)
            .then(v => {
              this.cookies.set("email", data.email);
              this.cookies.set("password", data.password);
              if (data.rol===null) {
                this.cookies.set("rol", "NULL")
              } else {
                this.cookies.set("rol", data.rol);
              }
            })
        } catch (error) {
          if (!data.email || password!==data.password || data.rol===null) {
            window.alert(error);
            window.location.reload();
          }
        }

        if (email===data.email && password===data.password) {
          try {
            this.firebaseService.createUserAccount(email, password)
              .then(v => {
                this.cookies.set("email", data.email);
                this.cookies.set("password", data.password);
                if (data.rol===null) {
                  this.cookies.set("rol", "NULL")
                } else {
                  this.cookies.set("rol", data.rol);
                  window.alert("Se registró ya");
                  this.router.navigate(['/menus', '/menu-'+this.cookies.get("rol")]);
                }
              })
          } catch (error) {
            window.alert(error);
            window.location.reload();
          }
        }
      });
  }
}
