import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'menu-administrador', 
        loadComponent: () => import('./components/admin-menu/admin-menu.component')
            .then(c => c.AdminMenuComponent)
    },
    {
        path: 'menu-asesor',
        loadComponent: () => import('./components/asesor-menu/asesor-menu.component')
            .then(c => c.AsesorMenuComponent)
    },
    {
        path: 'menu-administrador/reporte-ingresos/buscar-ingresos-por-cliente',
        loadComponent: () => import('./components/busca-ingresos/busca-ingresos.component')
            .then(c => c.BuscaIngresosComponent)
    },
    {
        path: 'auth/registro',
        loadComponent: () => import('./components/register/register.component')
            .then(c => c.RegisterComponent)
    },
    {
        path: 'menu-administrador/admin-servicios/agregar',
        loadComponent: () => import('./components/agrega-servicios/agrega-servicios.component')
            .then(c => c.AgregaServiciosComponent)
    },
    {
        path: 'menu-administrador/admin-empleados/crear',
        loadComponent: () => import('./components/crea-empleado/crea-empleado.component')
            .then(c => c.CreaEmpleadoComponent)
    },
    {
        path: 'menu-administrador/admin-empleados/consultar',
        loadComponent: () => import('./components/consulta-empleado/consulta-empleado.component')
            .then(c => c.ConsultaEmpleadoComponent)
    },
    {
        path: 'menu-administrador/admin-empleados/consultar/:empleadoNumDocumento/asignar-rol',
        loadComponent: () => import('./components/asigna-rol/asigna-rol.component')
            .then(c => c.AsignaRolComponent)
    },
    /*{
        path: 'menu-administrador/admin-empleados/listar',
        loadComponent: () => import('./components/')*/
    {
        path: 'menu-administrador/admin-empleados/consultar/:empleadoNumDocumento/modificar',
            loadComponent: () => import('./components/modifica-empleado/modifica-empleado.component')
                .then(c => c.ModificaEmpleadoComponent)
    },
    {
        path: 'menu-administrador/admin-servicios/consultar',
        loadComponent: () => import('./components/consulta-servicio/consulta-servicio.component')
            .then(c => c.ConsultaServicioComponent)
    },
    {
        path: 'menu-administrador/admin-servicios/consultar/:servicioNombre',
        loadComponent: () => import('./components/resultado-servicio/resultado-servicio.component')
            .then(c => c.ResultadoServicioComponent)
    },
    {
        path: 'menu-administrador/admin-servicios/consultar/:servicioNombre/modificar',
        loadComponent: () => import('./components/modifica-servicio/modifica-servicio.component')
            .then(c => c.ModificaServicioComponent)
    },
    {
        path: 'menu-administrador/admin-agenda/agregar',
        loadComponent: () => import('./components/agrega-agenda/agrega-agenda.component')
            .then(c => c.AgregaAgendaComponent)
    },
    {
        path: 'menu-administrador/admin-agenda/consultar',
        loadComponent: () => import('./components/consulta-agenda/consulta-agenda.component')
            .then(c => c.ConsultaAgendaComponent)
    }
    
    
    /**{
        path: 'menu-administrador/admin-agenda/agendamientos/:agendamientoId',
        loadComponent: () => import('./components/')
    }*/
];
