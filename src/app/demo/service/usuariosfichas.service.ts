import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuariosfichasService {

    myAppURL="https://localhost:44335/"
    myApiUrl = "api/UsuariosFichas/"
  constructor(private http:HttpClient) {

  }

  getUsuariosFichas(): Observable<any>{
    return this.http.get(this.myAppURL + this.myApiUrl);
  }
}
