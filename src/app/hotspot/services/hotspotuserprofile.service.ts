import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LayoutService } from 'src/app/layout/service/app.layout.service';

@Injectable({
    providedIn: 'root',
})
export class HotspotuserprofileService {
    //myAppURL="https://localhost:5001/"
    myAppURL = 'http://10.5.50.100:8090/'; //'http://localhost:5172/'
    myApiUrl = 'api/HotspotUserProfile/hotspot/userprofile'//'api/PlanesFichas/';
    myApiUrlPOST = 'api/HotspotUserProfile/hotspot/adduserprofile';
    myApiUrlDELETE = 'api/HotspotUserProfile/hotspot/delete/';

    constructor(private http: HttpClient, public layoutService: LayoutService) {
        
    }

    getHotspotUserProfilesService(): Observable<any> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + this.layoutService.getToken(), // Aquí se agrega el token
            }),
        };
        return this.http.get(this.myAppURL + this.myApiUrl,httpOptions);
    }

    postHotspotUserProfileService(PlanesFichas: any): Observable<any> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + this.layoutService.getToken(), // Aquí se agrega el token
            }),
        };
        return this.http.post(this.myAppURL + this.myApiUrlPOST, PlanesFichas, httpOptions);
    }

    deleteHotspotUserProfileService(id: string): Observable<any> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + this.layoutService.getToken(), // Aquí se agrega el token
            }),
        };
        return this.http.delete(this.myAppURL + this.myApiUrlDELETE + id, httpOptions);
    }
}
