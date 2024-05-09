import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoggedUserMenuNavbarComponent } from '../logged-in-user-menu-navbar/logged-in-user-menu-navbar.component';
import { Empleado } from '../../models/Empleado';
import { EmpleadoService } from '../../services/empleado.service';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { fromZonedTime} from 'date-fns-tz';
import { FirebaseService } from '../../services/firebase.service';

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
  clickedRol! : string | null;
  empleadoFormGroup : FormGroup<EmpleadoRegisterControls> = new FormBuilder().group<EmpleadoRegisterControls>({
    apellidosControl: new FormControl<string>('', [Validators.required, Validators.maxLength(33)]) as FormControl<string>,
    nombreControl: new FormControl<string>('', [Validators.required, Validators.maxLength(30)]) as FormControl<string>,
    emailControl: new FormControl<string>('', [Validators.required, Validators.email, Validators.maxLength(36)]) as FormControl<string>,
    passwordControl: new FormControl<string>(
      '',
      [Validators.required, Validators.minLength(8), Validators.maxLength(28)]
    ) as FormControl<string>,
    telControl: new FormControl<string | null>(null, Validators.maxLength(15)),
    tipoDocumentoControl: new FormControl<string>('', [Validators.required, Validators.maxLength(3)]) as FormControl<string>,
    numDocumentoControl: new FormControl<string>('', [Validators.required, Validators.minLength(4), Validators.maxLength(15)]) as FormControl<string>,
    fechaEntradaControl: new FormControl<string>(new Date().toJSON(), Validators.required) as FormControl<string>
  });
  fileItem! : File;

  constructor(
    private empleadoService : EmpleadoService,
    private firebaseService : FirebaseService
  ) {}

  ngOnInit(): void {
    const storagedTheme = window.localStorage.getItem("theme");

    if (storagedTheme === null) {
      // Default Menu-Administrador UI theme
      window.localStorage.setItem("theme", "light");
    }
    this.theme = storagedTheme as string;
  }

  setFotografiaInputTarget(ev : Event) : void {
    const fileItem = (ev.target as HTMLInputElement).files?.item(0);
  
    if (fileItem) {
      this.fileItem = fileItem;
    }
  }

  setRol(ev : MouseEvent) : void {
    this.clickedRol = (ev.currentTarget as HTMLElement).getAttribute('value');
  }

  async submitEmpleado(ev : SubmitEvent) : Promise<void> {
    ev.preventDefault();
    if (this.empleadoFormGroup.invalid) {
      window.alert("Verifique los datos, uno de ellos o varios son inválidos")
    }
    const arrayBuffer = await this.fileItem.arrayBuffer();

    // IMGURL : La url de fotografía subida del empleado, de vuelta del storage de Firebase
    const IMGURL = await this.firebaseService
      .uploadEmpleadoImgAsBytes(this.fileItem.name, arrayBuffer);
    const empleadoFormGroupValue = this.empleadoFormGroup.value;
    const formatDate = (dateOuput : string)  => {
      if (isNaN(Date.parse(dateOuput)+1)) {
        return null;
      }
      const utcDate = fromZonedTime(dateOuput, 'America/Bogota');
      const dateString = utcDate.toJSON();
      
      let splitReversedDate = dateString.split("/").reverse();
      
      splitReversedDate.forEach((str, index) => {
        if (str.length===1) {
          splitReversedDate[index] = "0"+str;
        }
      });
      let response! : string;
      response = splitReversedDate.join("-");
      return response;
    }
    
    const transformDateOutput = (dateOutput : string | null) : string | null | void => {
      if (dateOutput) {
        const myDate = new Date(dateOutput as string);
        /* Corrigiendo la sustracción de 1 en el tipo fecha: enumeración de días del mes que 
        se enumeran desde 0 igual que al iterar arrays o cadenas*/
        myDate.setDate(myDate.getDate()+1);     // + 1 día (para que se guarde la fecha ingresada correcta)
        var strDate = formatDate(myDate.toJSON()) as string;
        return strDate;
      }
    }
    // Se inicializa la instancia del empleado que se ingresó en el formulario
    this.empleado = {
      "usuario_id": null,
      "apellidos": empleadoFormGroupValue.apellidosControl as string,
      "nombre": empleadoFormGroupValue.nombreControl as string,
      "email": empleadoFormGroupValue.emailControl as string,
      "password": empleadoFormGroupValue.passwordControl  as string,
      "rol": this.clickedRol,
      "tel": empleadoFormGroupValue.telControl as string | null,
      "tipo_documento": empleadoFormGroupValue.tipoDocumentoControl as string,
      "num_documento": empleadoFormGroupValue.numDocumentoControl as string,
      "url_fotografia": IMGURL,
      "fecha_entrada": transformDateOutput(empleadoFormGroupValue.fechaEntradaControl as string) as string,
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
        "fecha_entrada":  transformDateOutput(data.fecha_entrada as string) as string,
        "fecha_retiro": data.fecha_retiro
      };
    });
    var rolIntro : string = '';
    this.empleado['rol']!==null ? rolIntro+="Se ha creado con éxito la cuenta del "+this.empleado['rol'] 
    : rolIntro+="Se ha creado la cuenta empleado de la persona:";

    window.alert(
      rolIntro
        ?.concat(' ')
        .concat(this.empleado['nombre']+' '+this.empleado['apellidos']+", ")
        .concat(
          "con "+this.empleado['tipo_documento']==="CC" ? 
            "cédula de ciudadanía No. "
          : this.empleado['tipo_documento']==="CON" ? 
            "contraseña " : this.empleado['tipo_documento']==="CEX" ? 
            "cédula de extranjería No. " : "pasaporte "
        )
        .concat(this.empleado['num_documento']+"; ")
        .concat("su correo electrónico es: "+this.empleado['email']+", ")
        .concat("su teléfono es: "+this.empleado['tel']+'.')
    );
    window.location.pathname = "menu-administrador";
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

type EmpleadoRegisterControls = {
  apellidosControl: FormControl<string>,
  nombreControl: FormControl<string>,
  emailControl: FormControl<string>,
  passwordControl: FormControl<string>,
  telControl: FormControl<string | null>,
  tipoDocumentoControl:  FormControl<string>,
  numDocumentoControl: FormControl<string>,
  fechaEntradaControl: FormControl<string>
};