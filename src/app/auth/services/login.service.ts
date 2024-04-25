import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, firstValueFrom, map } from 'rxjs';
import { LayoutService } from 'src/app/layout/service/app.layout.service';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
private httpClient = inject(HttpClient);


myAppURL="http://10.5.50.100:8090/"
myApiUrl = "api/auth/login"
private tokenKey = 'authToken';

  constructor(private http:HttpClient, public layoutService: LayoutService) { }

  register(formValue: any){

    return firstValueFrom(
      this.httpClient.post(`${this.myAppURL + this.myApiUrl}`, formValue)
    )
  }

  loginUser(formValue: any): Observable<any> {
    
    return this.http.post<any>(this.myAppURL + this.myApiUrl, formValue).pipe(

      map(response => {

        if (response && response.resultado.token) {

          this.layoutService.removeToken(this.tokenKey);

          this.saveToken(response.resultado.token);

          console.log("Token guardar inicio de sesion", response.resultado.token);

        }
        return response; // Devuelve la respuesta original
      })
    );
  }

  isLoggedIn(){    

    let longToken : string;    

    longToken = this.layoutService.getToken(); //this.getToken();

    return longToken.length > 0;
    
  }

  saveToken(token: string) {
    // Guarda el token en el localStorage
    sessionStorage.setItem(this.tokenKey, token);
  }

}
