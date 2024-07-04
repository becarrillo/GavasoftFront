import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: 'menu-administrador', 
        loadComponent: () => import('../standalone-components/admin-menu/admin-menu.component')
            .then(c => c.AdminMenuComponent)
    },
    {
        path: 'menu-administrador/admin-servicios/agregar',
        loadComponent: () => import('../standalone-components/agrega-servicios/agrega-servicios.component')
            .then(c => c.AgregaServiciosComponent)
    },
    {
        path: 'menu-asesor',
        loadComponent: () => import('../standalone-components/asesor-menu/asesor-menu.component')
            .then(c => c.AsesorMenuComponent)
    },
    {
        path: 'menu-asesor/solicitudes/clientes/:clienteNumDocumento/agendar-servicio',
        loadComponent: () => import('../standalone-components/agenda-servicios/agenda-servicios.component')
            .then(c => c.AgendaServiciosComponent)
    },
    {
        path: 'menu-administrador/reporte-ingresos/buscar-ingresos-por-cliente',
        loadComponent: () => import('../standalone-components/busca-ingresos/busca-ingresos.component')
            .then(c => c.BuscaIngresosComponent)
    },
    
    {
        path: 'menu-administrador/admin-empleados/crear',
        loadComponent: () => import('../standalone-components/crea-empleado/crea-empleado.component')
            .then(c => c.CreaEmpleadoComponent)
    },
    {
        path: 'menu-administrador/admin-empleados/consultar',
        loadComponent: () => import('../standalone-components/consulta-empleado/consulta-empleado.component')
            .then(c => c.ConsultaEmpleadoComponent)
    },
    {
        path: 'menu-administrador/admin-empleados/consultar/:empleadoNumDocumento/asignar-rol',
        loadComponent: () => import('../standalone-components/asigna-rol/asigna-rol.component')
            .then(c => c.AsignaRolComponent)
    },
    {
        path: 'menu-administrador/admin-empleados/listar',
        loadComponent: () => import('../standalone-components/lista-empleados/lista-empleados.component')
            .then(c => c.ListaEmpleadosComponent)
    },
    {
        path: 'menu-administrador/admin-empleados/consultar/:empleadoNumDocumento/modificar',
        loadComponent: () => import('../standalone-components/modifica-empleado/modifica-empleado.component')
            .then(c => c.ModificaEmpleadoComponent)
    },
    {
        path: 'menu-administrador/admin-servicios/agregar',
        loadComponent: () => import('../standalone-components/agrega-servicios/agrega-servicios.component')
            .then(c => c.AgregaServiciosComponent)
    },
    {
        path: 'menu-administrador/admin-servicios/consultar',
        loadComponent: () => import('../standalone-components/consulta-servicio/consulta-servicio.component')
            .then(c => c.ConsultaServicioComponent)
    },
    {
        path: 'menu-administrador/admin-servicios/consultar/:servicioNombre',
        loadComponent: () => import('../standalone-components/resultado-servicio/resultado-servicio.component')
            .then(c => c.ResultadoServicioComponent)
    },
    {
        path: 'menu-administrador/admin-servicios/consultar/:servicioNombre/modificar',
        loadComponent: () => import('../standalone-components/modifica-servicio/modifica-servicio.component')
            .then(c => c.ModificaServicioComponent)
    },
    {
        path: 'menu-administrador/admin-agenda/agregar',
        loadComponent: () => import('../standalone-components/agrega-agenda/agrega-agenda.component')
            .then(c => c.AgregaAgendaComponent)
    },
    {
        path: 'menu-administrador/admin-agenda/consultar',
        loadComponent: () => import('../standalone-components/consulta-agenda/consulta-agenda.component')
            .then(c => c.ConsultaAgendaComponent)
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenusOutletRoutingModule { }
