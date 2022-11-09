import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { PerfilfichasService } from 'src/app/demo/service/perfilfichas.service';


interface TipoFicha {
    nombre: string;
    value: string;
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
    perfilModalDialog: boolean = false;
    submitted: boolean = false;

    //VARIABLES DE VALOR POR DEFAULT TIEMPO LIMITE DE FICHAS
    defaulttimpolimiteDia: string = '0';
    defaulttimpolimiteHora: string = '0';
    defaulttimpolimiteMin: string = '0';

    //VARIABLES DE VALOR POR DEFAULT EXOIRACION DE FICHAAS
    defaultExpiracionDia: string = '0';
    defaultExpiracionHora: string = '0';
    defaultExpiracionMin: string = '0';

    //VARIABLES DE SELECCION DE TIPO DE FICHAS
    selectTipoFicha: TipoFicha[];
    fichaSelected?: TipoFicha;
    //VARIABLES DE VELOCIDAD DE TIPO DE DICHAS MB/KB
    selectVelocidadsubida: TipoFicha[];
    velocidadSelectedsubida?: TipoFicha;
    selectVelocidadbajada: TipoFicha[];
    velocidadSelectedbajada?: TipoFicha;

    constructor(private _perfilfichas: PerfilfichasService, private toastr: ToastrService) {
        this.selectTipoFicha = [
            { nombre: 'Corrido', value: 'CORRIDO', status: true },
            { nombre: 'Pausado', value: 'PAUSADO', status: true },
            { nombre: 'Megas', value: 'MEGAS', status: true },
        ];
        this.selectVelocidadsubida = [
            { nombre: 'Kbps', value: 'K', status: true },
            { nombre: 'Mbps', value: 'M', status: true },
        ];
        this.selectVelocidadbajada = [
            { nombre: 'Kbps', value: 'K', status: true },
            { nombre: 'Mbps', value: 'M', status: true },
        ];
    }

    ngOnInit(): void {
        this.obtenerplanesfichas();
        /* this._perfilfichas.getPlanesFichas().subscribe(data => this.listplanesfichas = data); */
    }

    //METODO QUE ABRE EL MODAL
    openNew() {
        this.planes = {};
        this.submitted = false;
        this.perfilModalDialog = true;
    }

    obtenerplanesfichas() {
        this._perfilfichas.getPlanesFichas().subscribe(
            (data) => {
                console.log(data);
                this.listplanesfichas = data;
            },
            (error) => {
                console.log(error);
            }
        );
    }

    CadenaAleatoria() {
        let result = '';
        const characters =
            'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        for (let i = 0; i < 6; i++) {
            result += characters.charAt(
                Math.floor(Math.random() * charactersLength)
            );
        }
        return result;
    }


    agregarPlanesFichas() {
        const planes2: any = {
            nameProfile: this.CadenaAleatoria(),
            addressPoolProfile: 'none',
            velocidadSubidaBajadaProfile: '1M/3M',
            limiteDeTiempoProfile: '5d',
            onLoginProfile: '',
            onLogoutProfile: 'planesFichas.onLogoutProfil',
        };
        this._perfilfichas.savePlanesFichas(planes2).subscribe(
            (data) => {
                this.toastr.success(
                    planes2.nameProfile + ' Agregado Correctamente',
                    'Perfil Agregado', {progressBar: true}
                );
                //MANDA A TRAER EL METODO OBTENER PLANES PARA QUE SE ACTUALIZE LA TABLA CON EL NUEVO PERFIL EN TIEMP REAL
                this.obtenerplanesfichas();
            },
            (error) => {
                this.toastr.error(error.status + ', ' + error.name, 'Errorr');
                console.log(error);
            }
        );
        //Cierra el Modal
        this.hideDialog();
    }

    editProduct(planes: any) {
        console.log('el plan es' + planes);
        this.planes = { ...planes };
        this.perfilModalDialog = true;
    }
//METODO QUE CIERRA EL MODAL
    hideDialog() {
        this.perfilModalDialog = false;
        this.submitted = false;
    }
}
