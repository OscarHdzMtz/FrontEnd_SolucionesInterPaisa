import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServidoreshotspotfichasService {
  myAppURL="http://10.5.50.100:8080/"
  myApiUrl = "api/ServerHotspotFichas"
  constructor(private http: HttpClient) { }


  getServerHotspot(): Observable<any>{
    return this.http.get(this.myAppURL + this.myApiUrl);
  }
  
}
