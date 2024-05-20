import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LayoutService } from 'src/app/layout/service/app.layout.service';

@Injectable({
    providedIn: 'root',
})
export class HotspotserverService {
    myAppURL = 'http://10.5.50.100:8090/';
    myApiUrl = 'api/HotspotServers/hotspot/servers';

    constructor(
        private http: HttpClient,
        public layoutService: LayoutService
    ) {}

    getServerHotspotMikrotiks(): Observable<any> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + this.layoutService.getToken(), // Aquí se agrega el token
            }),
        };

        return this.http.get(this.myAppURL + this.myApiUrl, httpOptions);
    }
}
