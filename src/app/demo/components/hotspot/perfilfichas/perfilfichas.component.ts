import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { PerfilfichasService } from 'src/app/demo/service/perfilfichas.service';

interface TipoFicha {
    nombre: string,
    value: string
    status: boolean;
}

@Component({
  selector: 'app-perfilfichas',
  templateUrl: './perfilfichas.component.html',
})


export class PerfilfichasComponent implements OnInit {
//ARREGLO DONDE SE OBTIENEN LAS PERFILES DESDE EL FRONT

//variables prueba
listplanesfichas: any[] = [];
planes: any;

//VARIABLE DE LOS VALORES DEL MODAL
//false para que el modal no se abre cuando carga la pagina
productDialog: boolean = false;
submitted: boolean = false;

//VARIABLES DE VALOR POR DEFAULT TIEMPO LIMITE DE FICHAS
defaulttimpolimiteDia: string = "0";
defaulttimpolimiteHora: string = "0";
defaulttimpolimiteMin: string = "0";

//VARIABLES DE VALOR POR DEFAULT EXOIRACION DE FICHAAS
defaultExpiracionDia: string = "0";
defaultExpiracionHora: string = "0";
defaultExpiracionMin: string = "0";

//VARIABLES DE SELECCION DE TIPO DE FICHAS
selectTipoFicha : TipoFicha [];
fichaSelected? : TipoFicha;
//VARIABLES DE VELOCIDAD DE TIPO DE DICHAS MB/KB
selectVelocidadsubida : TipoFicha [];
velocidadSelectedsubida? : TipoFicha;
selectVelocidadbajada : TipoFicha [];
velocidadSelectedbajada? : TipoFicha;


  constructor(private _perfilfichas: PerfilfichasService) {
    this.selectTipoFicha = [
        {nombre: "Corrido", value: "CORRIDO", status: true},
        {nombre: "Pausado", value: "PAUSADO", status: true},
        {nombre: "Megas", value: "MEGAS", status: true},
    ];
    this.selectVelocidadsubida = [{nombre : "Kbps", value: "K", status: true}, {nombre : "Mbps", value: "M", status: true}]
    this.selectVelocidadbajada = [{nombre : "Kbps", value: "K", status: true}, {nombre : "Mbps", value: "M", status: true}]
  }


  ngOnInit(): void {
    this.obtenerplanesfichas();
    /* this._perfilfichas.getPlanesFichas().subscribe(data => this.listplanesfichas = data); */
  }

//Abre el modal de A
  openNew() {
    this.planes = {};
    this.submitted = false;
    this.productDialog = true;
}

  obtenerplanesfichas(){
        this._perfilfichas.getPlanesFichas().subscribe(data =>{
            console.log(data)
            this.listplanesfichas = data;
        }, error => {
            console.log(error);
        })
  }

  editProduct(planes: any) {
    console.log("el plan es" + planes);
    this.planes = {...planes};
    this.productDialog = true;
}

  hideDialog() {
    this.productDialog = false;
    this.submitted = false;
}



}
