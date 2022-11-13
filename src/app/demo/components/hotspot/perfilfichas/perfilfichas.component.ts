import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Table } from 'primeng/table';
import { PerfilfichasService } from 'src/app/demo/service/perfilfichas.service';
import { ConfirmationService } from 'primeng/api';
import {Message} from 'primeng//api';
import {MessageService} from 'primeng/api';
import {ConfirmDialogModule} from 'primeng/confirmdialog';


interface TipoFicha {
    nombre: string;
    value: string;
    status: boolean;
}

//CREAMOS LA INTERFAZ CON LOS DATOS QUE SE RECIBIRA DESDE EL MODAL
interface PerfilesFichaModal {
    nombrePerfilModal : string,
    tipodeFichas: string,
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
    limiteDeTraficoFicha: number,
    limiteDeTraficoFichaEnKbMbGb: string
}


@Component({
    selector: 'app-perfilfichas',
    templateUrl: './perfilfichas.component.html',
    providers: [MessageService,ConfirmationService]
})
export class PerfilfichasComponent implements OnInit {
    //ARREGLO DONDE SE OBTIENEN LAS PERFILES DESDE EL FRONT

    listplanesfichas: any[] = [];

    // creamos una variable con el tipo de interface de los datos que vienen desde el modal y INICIALIZAMOS LOS VARIABLES QUE VENDRAN DESDE EL MODAL
    perfilDesdeModal: PerfilesFichaModal = {
    nombrePerfilModal : '',
    tipodeFichas: '',
    velocidadSubidaModal: 0,
    velocidadSubidaEnModal: "",
    velocidadBajadaModal: 0,
    velocidadBajadaEnModal: '',
    tiempoLimiteFichaDia: 0,
    tiempoLimiteFichaHora: 0,
    tiempoLimiteFichaMin: 0,
    tiemoExpiracionFichaDia:0,
    tiemoExpiracionFichaHora:0,
    tiemoExpiracionFichaMin:0,
    limiteDeTraficoFicha: 0,
    limiteDeTraficoFichaEnKbMbGb: ''
    }

    //VARIABLE DE LOS VALORES DEL MODAL
    //false para que el modal no se abre cuando carga la pagina
    perfilModalDialog: boolean = false;
    submitted?: boolean;

    //VARIABLES DE VALOR POR DEFAULT TIEMPO LIMITE DE FICHAS
    defaulttimpolimiteDia: string = '0';
    defaulttimpolimiteHora: string = '0';
    defaulttimpolimiteMin: string = '0';

    //VARIABLES DE VALOR POR DEFAULT EXOIRACION DE FICHAAS
    defaultExpiracionDia: string = '0';
    defaultExpiracionHora: string = '0';
    defaultExpiracionMin: string = '0';

    //VARIABLES DE SELECCION DE TIPO DE FICHAS
    selectTipoFicha: any[];
    fichaSelected?: TipoFicha;
    //VARIABLES DE VELOCIDAD DE TIPO DE DICHAS MB/KB
    seleccionVelocidadsubida: any[];
    seleccionVelocidadbajada: any[];
    seleccionLimiteDeTrafico: any[];


    constructor(private _perfilfichasService: PerfilfichasService, private toastr: ToastrService, private messageService: MessageService, private confirmationService: ConfirmationService) {
        this.selectTipoFicha = [
            "Corrido", "Pausado", "Megas"
        ];
        //VALORES QUE SE MOSTRARAN EN EL SELECT
        this.seleccionVelocidadsubida = [
            "Kbps", "Mbps"
        ];
        this.seleccionVelocidadbajada = [
            "Kbps", "Mbps"
        ];
        this.seleccionLimiteDeTrafico = [
            "Kbps", "Mbps", "Gbps"
        ]
    }

    ngOnInit(): void {
        this.obtenerplanesfichas();
        /* this._perfilfichas.getPlanesFichas().subscribe(data => this.listplanesfichas = data); */
    }

    //METODO QUE ABRE EL MODAL
    openNew() {
        this.submitted = false;
        this.perfilModalDialog = true;
    }

    //METODO PARA OBTENER LOS PERFILES DESDE EL BACKEND
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
    //METODO PARA GENERAR CADENA ALEATORIA
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

        this.submitted = true
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

        //OBTENER EL PRIMER CARACTER DE Mbps Y Kbps ===> 'M', 'K'
        var velocidadSubidaEnModalSubstring = this.perfilDesdeModal.velocidadSubidaEnModal.substring(0, 1);
        var velocidadBajadaEnModalSubstring = this.perfilDesdeModal.velocidadBajadaEnModal.substring(0, 1);


        //CREAMOS UNA VARIABLE CON LOS DATOS QUE SE ENVIARA EL BACKEND Y GUARDAR AL MIKROTIK
        var PlanesFichas: any = {
            nameProfile: this.perfilDesdeModal.nombrePerfilModal,
            addressPoolProfile: 'none',
            velocidadSubidaBajadaProfile: this.perfilDesdeModal.velocidadSubidaModal + velocidadSubidaEnModalSubstring + "/" + this.perfilDesdeModal.velocidadBajadaModal + velocidadBajadaEnModalSubstring,
            limiteDeTiempoProfile: this.perfilDesdeModal.tiempoLimiteFichaDia + "d " + tiempoLimiteFichaHoraConCero + ":" + tiempoLimiteFichaMinConCero + ":00",
            onLoginProfile: '',
            onLogoutProfile: 'planesFichas.onLogoutProfil',
        };

        //Enviamos los datos del variable al
        this._perfilfichasService.savePlanesFichas(PlanesFichas).subscribe(
            (data) => {
                this.toastr.success(
                    this.perfilDesdeModal.nombrePerfilModal + ' Agregado Correctamente',
                    'Perfil Agregado', {progressBar: true}
                );
                //MANDA A TRAER EL METODO OBTENER PLANES PARA QUE SE ACTUALIZE LA TABLA CON EL NUEVO PERFIL EN TIEMP REAL
                this.obtenerplanesfichas();
            },
            (error) => {
                this.toastr.error(error.status + ', ' + error.name, 'Error',{
                    progressBar: true
                });
                console.log(error);
            }
        );
        //CON ESTO RESTABLECEMOS LOS VALORES DEL MODAL A VACIO
        this.perfilDesdeModal = {
            nombrePerfilModal : '',
            tipodeFichas: '',
            velocidadSubidaModal: 0,
            velocidadSubidaEnModal: "",
            velocidadBajadaModal: 0,
            velocidadBajadaEnModal: '',
            tiempoLimiteFichaDia: 0,
            tiempoLimiteFichaHora: 0,
            tiempoLimiteFichaMin: 0,
            tiemoExpiracionFichaDia:0,
            tiemoExpiracionFichaHora:0,
            tiemoExpiracionFichaMin:0,
            limiteDeTraficoFicha: 0,
            limiteDeTraficoFichaEnKbMbGb: ''
        };
        //Cierra el Modal
        this.hideDialog();

    }
    /* deletePlanesFichas(id: string) {
        this._perfilfichasService.deletePlanesFichas(id).subscribe(data =>{
            this.toastr.success('Plan eliminada con Exito', 'Plan Eliminado');
            this.obtenerplanesfichas();
        }, error => {
            this.toastr.error(error.status, 'Error')
        })
    } */
    deletePlanesFichas(id: string, nombrePerfil: string) {
        this.confirmationService.confirm({
            message: 'Estas seguro que quieres Eliminar ' + nombrePerfil +' ?',
            header: 'Eliminar',
            icon: 'pi pi-trash',
            accept: () => {
                this._perfilfichasService.deletePlanesFichas(id).subscribe(data => {
                    /* this.toastr.warning('Perfil ' + nombrePerfil + ' eliminada con Exito','Eliminado'); */
                    this.messageService.add({severity:'success', summary: 'Eliminado', detail: 'Perfil ' + nombrePerfil + ' eliminada con Exito', life: 3000});
                    this.obtenerplanesfichas();
                }, error => {
                    /* this.toastr.error(error.status + ' ' +  error.name, 'Error') */
                    this.messageService.add({severity:'error', summary: 'Error', detail: error.status + ' ' +  error.name, life: 3000});
                });
            }
        });

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
