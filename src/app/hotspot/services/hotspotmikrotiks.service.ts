import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LayoutService } from 'src/app/layout/service/app.layout.service';

@Injectable({
    providedIn: 'root',
})
export class HotspotmikrotiksService {    
    //myAppURL="https://localhost:5001/"
    myAppURL = 'http://10.5.50.100:8090/';
    myApiUrl = 'api/MikrotikHotspot';

    myApiUrlSystemResource = 'api/System/resource';
    myApiUrlSystemRouterBoard = 'api/System/routerboard';
    myApiUrlSystemIdentity = 'api/System/identity';
    myApiUrlSystemLog= 'api/System/log';

    myApiValidarConexionHotspotMikrotiks= 'api/MikrotikHotspot/validarconexion/';

    constructor(private http: HttpClient, public layoutService: LayoutService) {        
    }

    getHotspotMikrotiks(): Observable<any> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + this.layoutService.getToken(), // Aquí se agrega el token
            }),
        };
        return this.http.get(this.myAppURL + this.myApiUrl, httpOptions);
    }

    getValidarConexionHotspotMikrotiksService(id: number): Observable<any> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + this.layoutService.getToken(), // Aquí se agrega el token
            }),
        };
        return this.http.get(this.myAppURL + this.myApiValidarConexionHotspotMikrotiks + id, httpOptions);
    }

    getSystemResourceHotspotMikrotiks(): Observable<any> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + this.layoutService.getToken(), // Aquí se agrega el token
            }),
        };
        return this.http.get(this.myAppURL + this.myApiUrlSystemResource, httpOptions);
    }
    getSystemRouterBoardHotspotMikrotiks(): Observable<any> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + this.layoutService.getToken(), // Aquí se agrega el token
            }),
        };
        return this.http.get(this.myAppURL + this.myApiUrlSystemRouterBoard, httpOptions);
    }
    getSystemIdentityHotspotMikrotiks(): Observable<any> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + this.layoutService.getToken(), // Aquí se agrega el token
            }),
        };
        return this.http.get(this.myAppURL + this.myApiUrlSystemIdentity, httpOptions);
    }
    getSystemLogHotspotMikrotiks(): Observable<any> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + this.layoutService.getToken(), // Aquí se agrega el token
            }),
        };
        return this.http.get(this.myAppURL + this.myApiUrlSystemLog, httpOptions);
    }
}

