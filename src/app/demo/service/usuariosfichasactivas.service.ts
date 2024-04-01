import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuariosfichasactivasService {

  //myAppURL="https://localhost:44335/"
  myAppURL="http://10.5.50.100:8080/"
    myApiUrl = "api/usuariosFichasActivos/"
  constructor(private http:HttpClient) { }
//Obteniendo fichas activas desde el mikrotik
  getUsuariosFichasActivos(): Observable<any>{
    return this.http.get(this.myAppURL + this.myApiUrl);
  }
}
