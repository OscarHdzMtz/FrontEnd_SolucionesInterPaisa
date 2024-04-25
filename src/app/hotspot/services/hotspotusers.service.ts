import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { layouts } from 'chart.js';
import { Observable } from 'rxjs';
import { LayoutService } from 'src/app/layout/service/app.layout.service';

@Injectable({
    providedIn: 'root',
})
export class HotspotusersService {
    //myAppURL="https://localhost:5001/"
    myAppURL = 'http://10.5.50.100:8090/';
    myApiUrl = 'api/HotspotUser/hotspot/users'; //"api/UsuariosFichas/"
    myApiUrlPOST = 'api/HotspotUser/hotspot/addhotspotuser';
    myApiUrlDELETE = 'api/HotspotUser/';

    constructor(private http: HttpClient, public layoutService: LayoutService) {        
    }

    getHotspotUsersService(): Observable<any> {
        //console.log('token ' + this.token);
        // Configuración de los encabezados con el token
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + this.layoutService.getToken(), // Aquí se agrega el token
            }),
        };
        // Realización de la solicitud HTTP con los encabezados configurados
        return this.http.get(this.myAppURL + this.myApiUrl, httpOptions);
    }

    postHotspotUsersService(usuariosFichas: any): Observable<any> {
        // Configuración de los encabezados con el token
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + this.layoutService.getToken(), // Aquí se agrega el token
            }),
        };
        return this.http.post(
            this.myAppURL + this.myApiUrlPOST,
            usuariosFichas,
            httpOptions
        );
    }

    deleteHotspotUsersService(id: string): Observable<any> {
        // Configuración de los encabezados con el token
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + this.layoutService.getToken(), // Aquí se agrega el token
            }),
        };

        return this.http.delete(
            this.myAppURL + this.myApiUrlDELETE + id,
            httpOptions
        );
    }
}
