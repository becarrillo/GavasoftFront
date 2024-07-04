import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoggedUserMenuNavbarComponent } from '../logged-in-user-menu-navbar/logged-in-user-menu-navbar.component';
import { EmpleadoService } from '../../services/empleado.service';
import { Empleado } from '../../models/Empleado';

@Component({
  selector: 'app-consulta-empleado',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    NgOptimizedImage,
    LoggedUserMenuNavbarComponent
  ],
  templateUrl: './consulta-empleado.component.html',
  styleUrl: './consulta-empleado.component.css'
})
export class ConsultaEmpleadoComponent implements OnInit {
  theme?: string;
  toRealizarConsulta: boolean = false;
  consultaOption!: string;
  empleado!: Empleado;
  empleadosArray: Empleado[] = [];
  empleadoToDeleteNumDocumento!: string;
  consultaValue! : string;
  modalToDeleteIsOpen : boolean = false;
  img : string = '././././assets/ejemplo-perfil.jpeg';
  radioCheckedReference! : string;

  constructor(private readonly empleadoService: EmpleadoService) { }

  ngOnInit(): void {
    const storagedTheme = window.localStorage.getItem("theme");

    if (storagedTheme === null) {
      // Default Menu-Administrador UI theme
      window.localStorage.setItem("theme", "light");
    }
    this.theme = storagedTheme as string;
  }

  deleteEmpleado(numDocumento : string) {
    this.empleadoService.deleteEmpleado(numDocumento)
      .subscribe((data : number) => {
        window.alert(`${data} fila de Empleado fue eliminada exitosamente`)
      })
  }

  enableEmpleadoActionBtns(radioCheckedReference : string): void {
    this.radioCheckedReference = radioCheckedReference;
  }

  setConsultaByOption(option: string, ev: Event) {
    this.consultaOption = option;
    this.consultaValue = (ev.target as HTMLInputElement).value;
  }

  submitSearch(event: Event) {
    event.preventDefault();
    switch (this.consultaOption) {
      case "num_documento":
        this.empleadoService
          .getEmpleado(this.consultaValue)
          .subscribe((data: Empleado) => {
            this.empleado = data
          });
        break;
      case "nombre":
        this.empleadoService
          .listEmpleadosByNombre(this.consultaValue)
          .subscribe((data: Empleado[]) => {
            this.empleadosArray = data
          })
          // decodeURI(window.location.href.concat('/'+this.servicioName.replaceAll(' ', '-')));
    }
    this.toRealizarConsulta = true;
  }

  toggleModalToDelete(isOpen: boolean, numDocumento : string) : void {
    this.empleadoToDeleteNumDocumento = numDocumento;

    const modalDeleteDialog = document.querySelector('#modalToDeleteElement');
    !isOpen ? (
      (modalDeleteDialog as HTMLDialogElement).showModal(),
      this.modalToDeleteIsOpen = true
    ) : (
      (modalDeleteDialog as HTMLDialogElement).close(),
      this.modalToDeleteIsOpen = false
    )
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
