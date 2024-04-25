import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LayoutService } from 'src/app/layout/service/app.layout.service';

@Injectable({
    providedIn: 'root',
})
export class HotspotactiveusersService {
    private token: string = '';
    //myAppURL="https://localhost:44335/"
    myAppURL = 'http://10.5.50.100:8090/';
    myApiUrl = 'api/HotspotActiveUsers/hotspot/usersActive';

    constructor(private http: HttpClient, public layoutService: LayoutService) {        
    }

    //Obteniendo fichas activas desde el mikrotik
    getHotspotActiveUsersService(): Observable<any> {
        // Configuración de los encabezados con el token
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + this.layoutService.getToken(), // Aquí se agrega el token
            }),
        };

        return this.http.get(this.myAppURL + this.myApiUrl, httpOptions);
    }
}
