import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PerfilfichasComponent } from '../components/hotspot/perfilfichas/perfilfichas.component';

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

    savePlanesFichas(planes: any): Observable<any>{
        return this.http.post(this.myAppURL + this.myApiUrl, planes);
    }
}
