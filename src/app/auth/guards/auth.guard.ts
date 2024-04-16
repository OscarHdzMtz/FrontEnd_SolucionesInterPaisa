import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../services/login.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(private router: Router, private authService: LoginService) {} // Inyecta el servicio en el constructor
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    

      if (this.authService.isLoggedIn()) {        

          return true; //permite ingresar a la ruta

      } else {

        // Redirige a la página de inicio de sesión si el usuario no está autenticado
        //return this.router.parseUrl('auth/login');
        return this.router.createUrlTree(['auth/login']);

      }    
  }
  
}
