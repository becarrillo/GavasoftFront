import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { LoggedUserMenuNavbarComponent } from '../logged-in-user-menu-navbar/logged-in-user-menu-navbar.component';
import { Empleado } from '../../models/Empleado';
import { EmpleadoService } from '../../services/empleado.service';

@Component({
  selector: 'app-modifica-empleado',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    NgOptimizedImage,
    LoggedUserMenuNavbarComponent
  ],
  templateUrl: './modifica-empleado.component.html',
  styleUrl: './modifica-empleado.component.css'
})
export class ModificaEmpleadoComponent {
  theme?: string;
  editBtnClass! : string;
  empleado! : Empleado;
  empleadoPicClass! : string;
  modalAreOpen!: boolean;
  modalElementClass : string | undefined;

  constructor(
    private empleadoService : EmpleadoService,
    private readonly route : ActivatedRoute
  ) {
    let empleadoNumDocumento: string = '';
    this.route.paramMap.subscribe((m) => {
      empleadoNumDocumento = m.get("empleadoNumDocumento") as string
    });
    this.empleadoService.getEmpleado(empleadoNumDocumento).subscribe((data : Empleado) => {
      this.empleado = data
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
    this.editBtnClass = "flex mt-5 px-28 py-3 rounded-lg border-r-2 border-b-2 border-slate-400 bg-transparent from-cyan-700 bg-gradient-to-l" +
    " hover:transition hover:ease-out hover:duration-300 hover:bg-zinc-600 hover:scale-105 text-center hover:text-white";
  }

  setEmpleado(numDocumento : string, empleado : Empleado) : void {
    
  }

  showModal() {
    this.empleadoPicClass = "row-span-3 opacity-35";
    this.editBtnClass = "flex mt-5 px-28 py-3 rounded-lg border-r-2 bg-neutral-400" +
    " disabled cursor-default hover:transition hover:ease-out hover:duration-300 hover:bg-zinc-600 hover:scale-105 text-center hover:text-white";
    this.modalAreOpen = true;
    this.modalElementClass =
      "flex flex-col justify-center items-center rounded-md shadow-md shadow-slate-400 " +
      "mx-auto px-4 py-1.3 z-10 bg-zinc-600 text-white opacity-90 " +
      "fixed left-2 right-2 top-44 bottom-40 w-10/12 " +
      "h-auto md:w-7/12 lg:w-5/12 xl:w-7/12 2xl:w-7/12";
  }

  hideModal() {
    this.modalAreOpen = false;
    this.modalElementClass = undefined
    this.editBtnClass = "flex mt-5 px-28 py-3 rounded-lg border-r-2 border-b-2 border-slate-400"+ 
    " bg-transparent from-cyan-700 bg-gradient-to-l hover:transition hover:ease-out" +
    " hover:duration-300 hover:bg-zinc-600 hover:scale-105 text-center hover:text-white";
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
