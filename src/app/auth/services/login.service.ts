import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, firstValueFrom, map } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
private httpClient = inject(HttpClient);


myAppURL="http://10.5.50.100:8090/"
myApiUrl = "api/auth/login"
private tokenKey = 'authToken';

  constructor(private http:HttpClient) { }

  register(formValue: any){

    return firstValueFrom(
      this.httpClient.post(`${this.myAppURL + this.myApiUrl}`, formValue)
    )
  }

  loginUser(formValue: any): Observable<any> {
    
    return this.http.post<any>(this.myAppURL + this.myApiUrl, formValue).pipe(

      map(response => {

        if (response && response.resultado.token) {

          this.saveToken(response.resultado.token);
        }
        return response; // Devuelve la respuesta original
      })
    );
  }

  isLoggedIn(){    

    let longToken : string;    

    longToken = this.getToken();

    return longToken.length > 0;
    
  }

  saveToken(token: string) {
    // Guarda el token en el localStorage
    sessionStorage.setItem(this.tokenKey, token);
  }

  getToken(): string {
    // Obtiene el token del sessionStorage
    return sessionStorage.getItem(this.tokenKey) ?? ""; // Si el valor es null, retorna una cadena vacía
  }
  
}
