import { Routes } from '@angular/router';
import { authorizationGuard } from './guards/authorization.guard';

export const routes: Routes = [
    {
        path: "", loadComponent: () => import("./standalone-components/landing-page/landing-page.component")
            .then(c => c.LandingPageComponent),
        pathMatch: "full"
    },
    {
        path: "login",
        loadComponent: () => import("./standalone-components/login/login.component")
            .then(c => c.LoginComponent)
    },
    {
        path: "menus", loadChildren: () => import("./menus-outlet/menus-outlet.module")
            .then(m => m.MenusOutletModule),
        canActivateChild: [authorizationGuard]
    },
    {
        path: "clientes/registro",
        loadComponent: () => import("./standalone-components/cliente-register/cliente-register.component")
            .then(c => c.ClienteRegisterComponent)
    }
];// 13579F-200D$
