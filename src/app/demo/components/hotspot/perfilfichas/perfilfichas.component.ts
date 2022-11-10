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

//CREAMOS LA INTERFAZ CON LOS DATOS QUE SE RECIBIRA DESDE EL MODAL
interface PerfilesFichaModal {
    nombrePerfilModal : string,
    velocidadSubidaModal?: number,
    velocidadSubidaEnModal: string,
    velocidadBajadaModal: number,
    velocidadBajadaEnModal: string
    tiempoLimiteFichaDia: number
    tiempoLimiteFichaHora: number
    tiempoLimiteFichaMin: number,
    tiemoExpiracionFichaDia:number
    tiemoExpiracionFichaHora:number
    tiemoExpiracionFichaMin:number

}


@Component({
    selector: 'app-perfilfichas',
    templateUrl: './perfilfichas.component.html',
})
export class PerfilfichasComponent implements OnInit {
    //ARREGLO DONDE SE OBTIENEN LAS PERFILES DESDE EL FRONT

    listplanesfichas: any[] = [];

    // creamos una variable con el tipo de interface de los datos que vienen desde el modal y INICIALIZAMOS LOS VARIABLES QUE VENDRAN DESDE EL MODAL
    perfilDesdeModal: PerfilesFichaModal = {
    nombrePerfilModal : '',
    velocidadSubidaModal: 0,
    velocidadSubidaEnModal: '',
    velocidadBajadaModal: 0,
    velocidadBajadaEnModal: '',
    tiempoLimiteFichaDia: 0,
    tiempoLimiteFichaHora: 0,
    tiempoLimiteFichaMin: 0,
    tiemoExpiracionFichaDia:0,
    tiemoExpiracionFichaHora:0,
    tiemoExpiracionFichaMin:0
    }

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
    seleccionVelocidadsubida: TipoFicha[];

    seleccionVelocidadbajada: TipoFicha[];


    constructor(private _perfilfichasService: PerfilfichasService, private toastr: ToastrService) {
        this.selectTipoFicha = [
            { nombre: 'Corrido', value: 'CORRIDO', status: true },
            { nombre: 'Pausado', value: 'PAUSADO', status: true },
            { nombre: 'Megas', value: 'MEGAS', status: true },
        ];
        this.seleccionVelocidadsubida = [
            { nombre: 'Kbps', value: 'K', status: true },
            { nombre: 'Mbps', value: 'M', status: true },
        ];
        this.seleccionVelocidadbajada = [
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
        /* this.planes = {}; */
        this.submitted = false;
        this.perfilModalDialog = true;
    }

    obtenerplanesfichas() {
        this._perfilfichasService.getPlanesFichas().subscribe(
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
        //VALIDAMOS SI LA HORA ES MENOR A 10 Y LE AGREGAMOS UN CERO ANTES PARA QUE LO RECONOSCA MIKROTIK
        var tiempoLimiteFichaHoraConCero
        var tiempoLimiteFichaMinConCero
        if(this.perfilDesdeModal.tiempoLimiteFichaHora < 10 || this.perfilDesdeModal.tiempoLimiteFichaMin < 10 ){
            tiempoLimiteFichaHoraConCero ="0" + this.perfilDesdeModal.tiempoLimiteFichaHora
            tiempoLimiteFichaMinConCero = "0" + this.perfilDesdeModal.tiempoLimiteFichaMin
        }else{
            tiempoLimiteFichaHoraConCero = this.perfilDesdeModal.tiempoLimiteFichaHora
            tiempoLimiteFichaMinConCero = this.perfilDesdeModal.tiempoLimiteFichaMin
        }

    console.log(" valor" + this.perfilDesdeModal.velocidadSubidaEnModal);
    //CREAMOS UNA VARIABLE CON LOS DATOS QUE SE ENVIARA EL BACKEND Y GUARDAR AL MIKROTIK
        const PlanesFichas: any = {
            nameProfile: this.perfilDesdeModal.nombrePerfilModal,
            addressPoolProfile: 'none',
            velocidadSubidaBajadaProfile: this.perfilDesdeModal.velocidadSubidaModal + this.perfilDesdeModal.velocidadSubidaEnModal + "/" + this.perfilDesdeModal.velocidadBajadaModal + this.perfilDesdeModal.velocidadBajadaEnModal,
            limiteDeTiempoProfile: this.perfilDesdeModal.tiempoLimiteFichaDia + "d " + tiempoLimiteFichaHoraConCero + ":" + tiempoLimiteFichaMinConCero + ":00",
            onLoginProfile: '',
            onLogoutProfile: 'planesFichas.onLogoutProfil',
        };
        this._perfilfichasService.savePlanesFichas(PlanesFichas).subscribe(
            (data) => {
                this.toastr.success(
                    PlanesFichas.nameProfile + ' Agregado Correctamente',
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
        /* this.planes = { ...planes }; */
        this.perfilModalDialog = true;
    }
//METODO QUE CIERRA EL MODAL
    hideDialog() {
        this.perfilModalDialog = false;
        this.submitted = false;
    }
}
