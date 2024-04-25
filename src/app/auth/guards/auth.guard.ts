import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../services/login.service';
import { LayoutService } from 'src/app/layout/service/app.layout.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivateChild  {
  
  constructor(private router: Router, private authService: LoginService, public layoutService: LayoutService) {} // Inyecta el servicio en el constructor
  
  canActivateChild(
    
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
      //console.log(this.authService.isLoggedIn());

      if (this.authService.isLoggedIn()) {        

          return true; //permite ingresar a la ruta

      } else {
        // Redirige a la página de inicio de sesión si el usuario no está autenticado
        //return this.router.parseUrl('auth/login');

        this.layoutService.removeToken("authToken");

        return this.router.createUrlTree(['auth/login']);

      }    
  }

  
  
}
