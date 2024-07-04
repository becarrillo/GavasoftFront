import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoggedUserMenuNavbarComponent } from '../logged-in-user-menu-navbar/logged-in-user-menu-navbar.component';
import { CookieService } from 'ngx-cookie-service';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FirebaseService } from '../../services/firebase.service';
import { ServicioService } from '../../services/servicio.service';
import { Servicio } from '../../models/Servicio';

@Component({
  selector: 'app-agrega-servicios',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    NgOptimizedImage,
    LoggedUserMenuNavbarComponent,
    ReactiveFormsModule
  ],
  templateUrl: './agrega-servicios.component.html',
  styleUrl: './agrega-servicios.component.css'
})
export class AgregaServiciosComponent implements OnInit {
  cookies = inject(CookieService);
  fileItem!: File;
  firebaseService : FirebaseService = inject(FirebaseService);
  servicioRegisterFormGroup: FormGroup<ServicioRegisterControls> = new FormBuilder().group<ServicioRegisterControls>({
    nombreControl: new FormControl<string>('', [Validators.required, Validators.minLength(4)]) as FormControl<string>,
    descriptionControl: new FormControl<string | null>(''),
    precioControl: new FormControl<number>(0, [Validators.required, Validators.min(5000)]) as FormControl<number>,
    durationControl: new FormControl<number>(0, [Validators.required, Validators.min(10)]) as FormControl<number>
  });
  servicioService : ServicioService = inject(ServicioService);
  theme?: string;

  ngOnInit(): void {
    const storagedTheme = window.localStorage.getItem("theme");
    
    if (storagedTheme === null) {
      // Default Menu-Administrador UI theme
      window.localStorage.setItem("theme", "light");
    }
    this.theme = storagedTheme as string;
  }

  getAdminEmail() : string {
    return this.cookies.get('email');
  }

  setFotografiaInputTarget(ev : Event) : void {
    const fileItem = (ev.target as HTMLInputElement).files?.item(0);

    if (fileItem) {
      this.fileItem = fileItem;
      window.alert(this.fileItem);
    }
  }

  async submitServicio(ev : SubmitEvent) : Promise<void> {
    ev.preventDefault();
    if (this.servicioRegisterFormGroup.invalid) {
      window.alert("Verifique los datos, uno de ellos o varios son inválidos");
    }
    const arrayBuffer = await this.fileItem.arrayBuffer();

    // IMGURL : La url de fotografía subida del Servicio, de vuelta del storage de Firebase
    const IMGURL = await this.firebaseService
      .uploadServicioImgAsBytes(this.fileItem.name, arrayBuffer);
    var servicio : Servicio;
    servicio = {
      servicioNombre: this.servicioRegisterFormGroup.value.nombreControl as string,
      descripcion: this.servicioRegisterFormGroup.value.descriptionControl as string,
      duracion: this.servicioRegisterFormGroup.value.durationControl as number,
      precio: this.servicioRegisterFormGroup.value.precioControl as number,
      imgUrl: IMGURL
    }
    const savedServicio = this.servicioService
      .postServicio(servicio);
    if (savedServicio) {
      window.alert(
        "Servicio guardado exitosamente: " +
        savedServicio.servicioNombre.concat(
          ".\nDuración: "+savedServicio.duracion.toString().concat(
            ".\nPrecio: "+savedServicio.precio
          )
        )
      );
    }
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

type ServicioRegisterControls = {
  nombreControl: FormControl<string>,
  descriptionControl: FormControl<string | null>,
  precioControl: FormControl<number>,
  durationControl: FormControl<number>
}
