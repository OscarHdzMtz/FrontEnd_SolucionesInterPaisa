import { Component, ElementRef, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from "./service/app.layout.service";
import { JwtPayload, jwtDecode } from 'jwt-decode';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent {

    nombreEmpresa:string = "";
    userLoged:string = "";
    profileUser:string = "";
    
    items!: MenuItem[];

    @ViewChild('menubutton') menuButton!: ElementRef;

    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

    @ViewChild('topbarmenu') menu!: ElementRef;

    constructor(public layoutService: LayoutService) {
        
        this.nombreEmpresa = layoutService.Token_jwt_decode().empresa;
        this.userLoged = layoutService.Token_jwt_decode().usuario;
        this.profileUser = layoutService.Token_jwt_decode().perfil;
        
     }
     
}
