import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoggedUserMenuNavbarComponent } from '../logged-in-user-menu-navbar/logged-in-user-menu-navbar.component';
import { Empleado } from '../../models/Empleado';
import { EmpleadoService } from '../../services/empleado.service';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-crea-empleado',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    NgOptimizedImage,
    LoggedUserMenuNavbarComponent
  ],
  providers: [
  	EmpleadoService
  ],
  templateUrl: './crea-empleado.component.html',
  styleUrl: './crea-empleado.component.css'
})
export class CreaEmpleadoComponent implements OnInit {
  image!: string;
  theme?: string;
  empleado! : Empleado;
  empleadoFormGroup : FormGroup = new FormBuilder().group({
    usuarioIdControl: new FormControl<string | null>(null),
    apellidosControl: new FormControl<string>('', [Validators.required, Validators.maxLength(33)]),
    nombreControl: new FormControl<string>('', [Validators.required, Validators.maxLength(30)]),
    emailControl: new FormControl<string>('', [Validators.required, Validators.email, Validators.maxLength(36)]),
    passwordControl: new FormControl<string>('', [Validators.required, Validators.minLength(8), Validators.maxLength(28)]),
    telControl: new FormControl<string | null>(null, Validators.maxLength(15)),
    tipoDocumentoControl: new FormControl<string>('', [Validators.required, Validators.maxLength(3)]),
    numDocumentoControl: new FormControl<string>('', [Validators.required, Validators.minLength(4), Validators.maxLength(15)]),
    urlFotografiaControl: new FormControl<string>('', Validators.required),
    fechaEntradaControl: new FormControl<string>(new Date().toJSON(), Validators.required)
  });

  constructor(private empleadoService : EmpleadoService) {}

  ngOnInit(): void {
    const storagedTheme = window.localStorage.getItem("theme");
    
    if (storagedTheme === null) {
      // Default Menu-Administrador UI theme
      window.localStorage.setItem("theme", "light");
    }
    this.theme = storagedTheme as string;
  }

  handImage(ev : Event) {
    // recorta el valor del 'fakePath' que recibe la variable al solo nombre del archivo
    // this.image = (ev.target as HTMLInputElement).value.substring(12) as string; 

    // se concatena la ruta del directorio 'assets' al inicio de la cadena image
    // this.image = "../../../../assets/" + this.image as string;
  }

  submitEmpleado(ev : SubmitEvent) : void {
    ev.preventDefault();
    if (this.empleadoFormGroup.invalid) window.alert("Verifique los datos, uno de ellos o varios son inválidos");
    const empleadoFormGroupValue = this.empleadoFormGroup.value;
    
    this.empleado = {
      "usuario_id": null,
      "apellidos": empleadoFormGroupValue.apellidosControl as string,
      "nombre": empleadoFormGroupValue.nombreControl as string,
      "email": empleadoFormGroupValue.emailControl as string,
      "password": empleadoFormGroupValue.passwordControl  as string,
      "rol": null,
      "tel": empleadoFormGroupValue.telControl as string | null,
      "tipo_documento": empleadoFormGroupValue.tipoDocumentoControl as string,
      "num_documento": empleadoFormGroupValue.numDocumentoControl as string,
      "url_fotografia": empleadoFormGroupValue.urlFotografiaControl as string,
      "fecha_entrada": empleadoFormGroupValue.fechaEntradaControl as string,
      "fecha_retiro": null
    };
    
    this.empleadoService.postEmpleado(this.empleado).subscribe((data : Empleado) => {
      this.empleado = {
        "usuario_id": data.usuario_id,
        "apellidos": data.apellidos,
        "nombre": data.nombre,
        "email": data.email,
        "password": data.password,
        "rol": data.rol,
        "tel": data.tel,
        "tipo_documento": data.tipo_documento,
        "num_documento": data.num_documento,
        "url_fotografia": data.url_fotografia,
        "fecha_entrada": data.fecha_entrada,
        "fecha_retiro": data.fecha_retiro
      };
    });
    window.alert(this.empleado.nombre+' '+this.empleado.apellidos+" es el empleado con email: "+this.empleado.email+" con teléfono: "+this.empleado.tel+" con "+this.empleado.tipo_documento+" No. "+this.empleado.num_documento+ " su fotografía es: "+this.empleado.url_fotografia);
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
