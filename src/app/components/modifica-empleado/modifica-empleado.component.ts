import { CommonModule,  NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { LoggedUserMenuNavbarComponent } from '../logged-in-user-menu-navbar/logged-in-user-menu-navbar.component';
import { Empleado } from '../../models/Empleado';
import { EmpleadoService } from '../../services/empleado.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { fromZonedTime, toZonedTime } from 'date-fns-tz';

@Component({
  selector: 'app-modifica-empleado',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    NgOptimizedImage,
    ReactiveFormsModule,
    LoggedUserMenuNavbarComponent
  ],
  templateUrl: './modifica-empleado.component.html',
  styleUrl: './modifica-empleado.component.css'
})
export class ModificaEmpleadoComponent {
  theme?: string;
  editBtnClass! : string;
  empleadoGroup! : FormGroup<UpdatingEmpleadoControls>;
  empleadoPicClass! : string;
  empleadoUsuarioId!: number;
  modalAreOpen!: boolean;
  modalElementClass : string | undefined;
  empleadoNumDocumento!: string;

  constructor(
    private empleadoService : EmpleadoService,
    private readonly route : ActivatedRoute
  ) {
    this.route.paramMap.subscribe((m) => {
      this.empleadoNumDocumento = m.get("empleadoNumDocumento") as string;
      this.empleadoService.getUsuarioId(this.empleadoNumDocumento)
        .subscribe((data : number) => {
          this.empleadoUsuarioId = data
        });
    });
  }
  
  ngOnInit(): void {
    const storagedTheme = window.localStorage.getItem("theme");

    if (storagedTheme === null) {
      // Default Menu-Administrador UI theme
      window.localStorage.setItem("theme", "light");
    }
    this.theme = storagedTheme as string;
    this.modalAreOpen = false;

    this.empleadoPicClass = "row-span-3 bg-gray-500";
    this.editBtnClass = "flex mt-8 justify-center rounded-lg border-r-2 border-b-2 border-slate-400 bg-transparent from-cyan-700 bg-gradient-to-l" +
    " hover:transition hover:ease-out hover:duration-300 hover:bg-zinc-600 hover:scale-105 hover:text-white";

    const formatDate = (dateInput : string)  => {
      if (isNaN(Date.parse(dateInput)+1)) {
        return null;
      }
      const utcDate = toZonedTime(dateInput, 'America/Bogota');
      const dateString =  utcDate.toLocaleDateString('es-CO');
      
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

    this.empleadoService.getEmpleado(this.empleadoNumDocumento).subscribe((data : Empleado) => {
      const transformDateInput = (dateOutput : string | null) : string | null | void => {
        if (dateOutput) {
          const myDate = new Date(dateOutput as string);
          var strDate = formatDate(myDate.toJSON()) as string;
          return strDate;
        }
      }

      this.empleadoGroup = new FormGroup<UpdatingEmpleadoControls>({
        apellidosControl: new FormControl<string>({
          value: data['apellidos'],
          disabled: this.modalAreOpen
        }) as FormControl<string>,
        nombreControl: new FormControl<string>({
          value: data['nombre'],
          disabled: this.modalAreOpen
        }) as FormControl<string>,
        emailControl: new FormControl<string>({
          value: data['email'],
          disabled: this.modalAreOpen
        }) as FormControl<string>,
        passwordControl: new FormControl<string>({
          value: data['password'],
          disabled: this.modalAreOpen
        }) as FormControl<string>,
        tipoDocumentoControl: new FormControl<string>({
          value: data['tipo_documento'],
          disabled: this.modalAreOpen
        }) as FormControl<string>,
        numDocumentoControl: new FormControl<string>({
          value: data['num_documento'] as string,
          disabled: this.modalAreOpen
        }) as FormControl<string>,
        rolControl: new FormControl<string | null>({
          value: data['rol'],
          disabled: this.modalAreOpen
        }) as FormControl<string>,
        telControl: new FormControl<string | null>({
          value: data['tel'],
          disabled: this.modalAreOpen
        }) as FormControl<string>,
        fotografiaControl: new FormControl<string>({
          value: data['url_fotografia'],
          disabled: this.modalAreOpen
        }) as FormControl<string>,
        fechaEntradaControl: new FormControl<string>({
          value: transformDateInput(data['fecha_entrada']) as string,
          disabled: this.modalAreOpen
        }) as FormControl<string>,
        fechaRetiroControl: new FormControl<string | null>({
          value: transformDateInput(data['fecha_retiro'] as string) as string | null,
          disabled: this.modalAreOpen
        })
      });
    });
    
  }

  showModal(ev: Event) {
    ev.preventDefault();
    this.empleadoPicClass = "row-span-3 opacity-35 collapse";
    this.modalAreOpen = true;
    this.editBtnClass = "flex mt-5 px-28 py-3 rounded-lg border-r-2 border-b-2 border-slate-400"+ 
    " justify-center bg-neutral-400 text-white cursor-default";
    this.modalElementClass =
      "flex flex-col justify-center rounded-md shadow-md shadow-slate-400 " +
      "mx-auto px-4 py-1.3 z-10 bg-zinc-600 text-white opacity-95 backdrop-blur-lg " +
      "fixed left-2 right-2 top-44 bottom-40 w-10/12 " +
      "h-auto md:w-7/12 lg:w-5/12 xl:w-7/12 2xl:w-7/12";
  }

  hideModal() {
    this.modalAreOpen = false;
    this.modalElementClass = undefined;
    this.empleadoPicClass = "row-span-3 bg-gray-500";
    this.editBtnClass = "flex mt-8 justify-center rounded-lg border-r-2 border-b-2 border-slate-400 bg-transparent from-cyan-700 bg-gradient-to-l" +
    " hover:transition hover:ease-out hover:duration-300 hover:bg-zinc-600 hover:scale-105 hover:text-white";
  }

  updateEmpleado() {
    const formatDate = (dateInput : string)  => {
      if (isNaN(Date.parse(dateInput)+1)) {
        return null;
      }
      const utcDate = fromZonedTime(dateInput, 'America/Bogota');
      const dateString =  utcDate.toJSON();
      
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
        myDate.setDate(myDate.getDate()+1);   // + 1 día (para que se guarde la fecha ingresada correcta)
        var strDate = formatDate(myDate.toJSON()) as string;
        return strDate;
      }
    }

    this.empleadoService.updateEmpleado(this.empleadoGroup.value.numDocumentoControl as string, {
      "usuario_id": this.empleadoUsuarioId,
      "apellidos": this.empleadoGroup.value['apellidosControl'] as string,
      "nombre": this.empleadoGroup.value['nombreControl'] as string,
      "email": this.empleadoGroup.value['emailControl'] as string,
      "rol": this.empleadoGroup.value['rolControl'] as string,
      "tel": this.empleadoGroup.value['telControl'] as string,
      "password": this.empleadoGroup.value['passwordControl'] as string,
      "tipo_documento": this.empleadoGroup.value['tipoDocumentoControl'] as string,
      "num_documento": this.empleadoGroup.value['numDocumentoControl'] as string,
      "url_fotografia": this.empleadoGroup.value['fotografiaControl'] as string,
      "fecha_entrada": transformDateOutput(
        this.empleadoGroup.value['fechaEntradaControl'] as string
      ) as string,
      "fecha_retiro": transformDateOutput(
        this.empleadoGroup.value['fechaRetiroControl'] as string
      ) as string
    })
      .subscribe((data : number) => {
        window.alert(data.toString().concat(" registro de empleado actualizado exitosamente"));
        window.location.pathname = "menu-administrador"
      })
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

type UpdatingEmpleadoControls = {
  apellidosControl: FormControl<string>,
  nombreControl: FormControl<string>,
  emailControl: FormControl<string>,
  passwordControl: FormControl<string>,
  rolControl: FormControl<string>,
  telControl: FormControl<string | null>,
  tipoDocumentoControl:  FormControl<string>,
  numDocumentoControl: FormControl<string>,
  fotografiaControl: FormControl<string>,
  fechaEntradaControl: FormControl<string>,
  fechaRetiroControl: FormControl<string | null>
};