import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PerfilfichasService {
    myAppURL="https://localhost:44335/"
    myApiUrl = "api/PlanesFichas/"
  constructor(private http:HttpClient) {}


    getPlanesFichas(): Observable<any>{
        return this.http.get(this.myAppURL + this.myApiUrl);
    }
}
