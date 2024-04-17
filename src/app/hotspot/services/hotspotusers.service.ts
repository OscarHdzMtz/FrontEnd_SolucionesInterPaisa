import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HotspotusersService {

    //myAppURL="https://localhost:5001/"
    myAppURL="http://10.5.50.100:8080/"
    myApiUrl = "api/UsuariosFichas/"
  constructor(private http:HttpClient) {

  }

  getUsuariosFichas(): Observable<any>{
    return this.http.get(this.myAppURL + this.myApiUrl);
  }

  saveUsuariosFichas(usuariosFichas: any): Observable<any>{
    return this.http.post(this.myAppURL + this.myApiUrl, usuariosFichas);
  }

  deleteUsuariosFichas(id: string): Observable<any>{
    return this.http.delete(this.myAppURL + this.myApiUrl + id);
  }  
}
