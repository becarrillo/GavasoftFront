import { inject } from '@angular/core';
import { CanActivateChildFn, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

/* El 'guard' de autorización que activa o no el permiso en 'app.routes.ts'
  para navegar en las rutas donde se agregó con propiedad 'canActivateChild' */
export const authorizationGuard: CanActivateChildFn = (childRoute, state) => {
  const router = inject(Router);
  const cookieService = inject(CookieService);
  
  let userIsAuth! : boolean;

  const rol = cookieService.get("rol");
  if (
    cookieService.get("email") &&  (
      childRoute.url.at(0)?.toString() === "menu-administrador" || 
      childRoute.url.at(0)?.toString() === "menu-asesor" || 
      childRoute.url.at(0)?.toString() === "menu-cliente" 
    ) 
  ) {
    if (rol === "administrador" || rol === "asesor" || rol === "cliente") {
      userIsAuth = true;
    } else {
      // el usuario no posee privilegios de administrador (autorizaciones) para la ruta
      userIsAuth = false;
    }
  }
  if (!userIsAuth) {
    router.navigate(['/login']);
  };
  return userIsAuth;
};
