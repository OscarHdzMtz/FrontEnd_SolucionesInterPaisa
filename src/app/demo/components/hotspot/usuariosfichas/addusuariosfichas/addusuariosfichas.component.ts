import { Component, OnInit } from '@angular/core';
import {DividerModule} from 'primeng/divider';
import {SliderModule} from 'primeng/slider';
import { Location } from '@angular/common';
import { PerfilfichasService } from 'src/app/demo/service/perfilfichas.service';

interface usuarioFichas {
    address: string,
    comment: string,
    email: string,
    limitBytesIn: string,
    limitBytesOut: string,
    limitBytesTotal: string,
    limitUptime: string,
    macAddress: string,
    name: string,
    password: string,
    profile: string,
    routes: string,
    server: string,
    disabled: string,
    bytesIn: string,
    bytesOut: string,
    packetsIn: string,
    packetsOut: string,
    uptime: string
}

@Component({
  selector: 'app-addusuariosfichas',
  templateUrl: './addusuariosfichas.component.html',
  styleUrls: ['./addusuariosfichas.component.scss']
})


export class AddusuariosfichasComponent implements OnInit {
    valorLongUser?: number = 3;
    valorLongPass?: number = 3;

    tipoUsuarioGenerar: any[];
    tipoPasswordGenerar: any[];
    tipoInicioDeSesion: any[];

    arrayPlanesFichas: any[] = [];
  constructor(private _perfilfichasService: PerfilfichasService, private location:Location) {
    this.tipoUsuarioGenerar = [
        "Numeros", "Letras", "Letras y numeros"
    ]
    this.tipoPasswordGenerar = [
        "Numeros", "Letras", "Letras y numeros"
    ]
    this.tipoInicioDeSesion = [
        "Contraseña", "Pin"
    ]
  }

  ngOnInit(): void {
    this.obtenerplanesFichas();
  }

    obtenerplanesFichas(){
        this._perfilfichasService.getPlanesFichas().subscribe(
            data => {
                this.arrayPlanesFichas = data;
                console.log(data);
            },
            (error) => {
                console.log(error);
            }
        )
    }
    RegresarAtras(){
        this.location.back();
    }

}
