import { Component, OnInit } from '@angular/core';
import { HotspotmikrotiksService } from '../../services/hotspotmikrotiks.service';
import { MenuItem, MessageService } from 'primeng/api';
import { Identitysystemhotspotmikrotiks } from '../../interfaces/systemhotspotmikrotiks/identitysystemhotspotmikrotiks';
import { Routerboardsystemhotspotmikrotiks } from '../../interfaces/systemhotspotmikrotiks/routerboardsystemhotspotmikrotiks';
import { Resourcesystemhotspotmikrotiks } from '../../interfaces/systemhotspotmikrotiks/resourcesystemhotspotmikrotiks';
import { Logsystemhotspotmikrotiks } from '../../interfaces/systemhotspotmikrotiks/logsystemhotspotmikrotiks';
import { KnobModule } from 'primeng/knob';
import { DividerModule } from 'primeng/divider';
import { Ihotspotmikrotiks } from '../../interfaces/systemhotspotmikrotiks/ihotspotmikrotiks';

interface Column {
    field: string;
    header: string;
}

@Component({
    selector: 'app-hotspotmikrotiks',
    templateUrl: './hotspotmikrotiks.component.html',
    providers: [MessageService],
})
export class HotspotmikrotiksComponent implements OnInit {
    arrayHotspotMikrotiks: Ihotspotmikrotiks[] = [];
    filterarrayHotspotMikrotiks: Ihotspotmikrotiks = {
        routers_id: 0,
        empresa_id: 0,
        nombre: '',
        identity: null,
        direccion_ip: '',
        puerto_api: 0,
        puerto_apissl: 0,
        puerto_ftp: 0,
        puerto_ssh: 0,
        puerto_telnet: 0,
        puerto_winbox: 0,
        puerto_www: 0,
        puerto_wwwssl: 0,
        usuario: '',
        password: '',
        active_status: false,
        status: false,
        created_at: '',
        updated_at: '',
        adm_empresa: {
            empresa_id: 0,
            rol_id: 0,
            nombre: '',
            descripcion: '',
            correo: '',
            sitio_web: '',
            direccion: '',
            ciudad: '',
            estado: false,
            codigo_postal: '',
            pais: '',
            telefono: '',
            logo: '',
            tipo_moneda: '',
            active_status: false,
            created_at: '',
            updated_at: '',
            rol: null,
        },
    };
    LogsystemHotspotMikrotik: Logsystemhotspotmikrotiks[] = [];
    ResourcesystemHotspotMikrotik?: Resourcesystemhotspotmikrotiks;
    RouterBoardSystemHotspotMikrotik?: Routerboardsystemhotspotmikrotiks;
    identitySystemdHotspotMikrotik?: Identitysystemhotspotmikrotiks;

    cols!: Column[];

    selectedColumns!: Column[];

    visible: boolean = false;
    visibleModalEditRouter: boolean = false;

    messageValidarConexion: string = '';
    progressSpinner: boolean = false;
    boolValidarConexion?: boolean;

    /* DATOS ResourceHotspotMikrotiks */
    private intervalgetSystemResourceHotspotMikrotiks: any;
    cpuLoad: any;
    /* DATOS ResourceHotspotMikrotiks */

    valueprueba: number = 22;
    constructor(
        private _HotspotmikrotiksService: HotspotmikrotiksService,
        private messageService: MessageService
    ) {}

    ngOnInit(): void {
        this.getHotspotMikrotiks();
        /* this.getSystemResourceHotspotMikrotiks(); */
        this.intervalgetSystemResourceHotspotMikrotiks = setInterval(() => {
            this.getSystemResourceHotspotMikrotiks();
            this.cpuLoad = this.ResourcesystemHotspotMikrotik?.cpuLoad ?? null; // O un valor predeterminado apropiado si es necesario
        }, 2000); // Actualizar cada 2 segundos
        this.getSystemRouterBoardHotspotMikrotiks();
        this.getSystemIdentityHotspotMikrotiks();
        /* this.getSystemLogHotspotMikrotiks(); */

        //Todas las columas del array
        this.cols = [
            { field: 'identity', header: 'Identity' },
            { field: 'usuario', header: 'Usuario' },
            { field: 'password', header: 'Contraseña' },
            { field: 'direccion_ip', header: 'IP mikrotik' },
            { field: 'puerto_api', header: 'Puerto api' },
            { field: 'created_at', header: 'Creado el' },
            { field: 'updated_at', header: 'Editado el' },
        ];

        //columas del array que se va cargar por default
        this.selectedColumns = [
            { field: 'usuario', header: 'Usuario' },
            { field: 'direccion_ip', header: 'IP mikrotik' },
        ];
    }

    getHotspotMikrotiks() {
        this._HotspotmikrotiksService.getHotspotMikrotiks().subscribe(
            (data) => {
                console.log(data.resultado);
                this.arrayHotspotMikrotiks = data.resultado;
            },
            (error) => {
                console.log(error);
            }
        );
    }

    ngOnDestroy(): void {
        clearInterval(this.intervalgetSystemResourceHotspotMikrotiks); // Detener el intervalo cuando el componente se destruye
    }

    getSystemResourceHotspotMikrotiks() {
        this._HotspotmikrotiksService
            .getSystemResourceHotspotMikrotiks()
            .subscribe(
                (data) => {
                    /* console.log("//");
                console.log(data.resultado); */

                    this.ResourcesystemHotspotMikrotik = data.resultado;

                    /* console.log("//");
                console.log(this.ResourcesystemHotspotMikrotik); */
                },
                (error) => {
                    console.log(error);
                }
            );
    }

    getSystemRouterBoardHotspotMikrotiks() {
        this._HotspotmikrotiksService
            .getSystemRouterBoardHotspotMikrotiks()
            .subscribe(
                (data) => {
                    console.log(data.resultado);
                    this.RouterBoardSystemHotspotMikrotik = data.resultado;
                },
                (error) => {
                    console.log(error);
                }
            );
    }

    getSystemIdentityHotspotMikrotiks() {
        this._HotspotmikrotiksService
            .getSystemIdentityHotspotMikrotiks()
            .subscribe(
                (data) => {
                    console.log(data.resultado);
                    this.identitySystemdHotspotMikrotik = data.resultado;
                },
                (error) => {
                    console.log(error);
                }
            );
    }

    getSystemLogHotspotMikrotiks() {
        this._HotspotmikrotiksService.getSystemLogHotspotMikrotiks().subscribe(
            (data) => {
                console.log(data.resultado);
                this.LogsystemHotspotMikrotik = data.resultado;
            },
            (error) => {
                console.log(error);
            }
        );
    }
    getValidarConexionMikrotik(idMikrotikHotspot: number) {
        this.messageValidarConexion = '';

        this.progressSpinner = true;

        this.showDialog();

        this._HotspotmikrotiksService
            .getValidarConexionHotspotMikrotiksService(idMikrotikHotspot)
            .subscribe(
                (data) => {
                    console.log(data);

                    this.messageValidarConexion = '¡CONEXION EXITOSA!';

                    this.progressSpinner = false;

                    this.boolValidarConexion = true;
                },
                (error) => {
                    console.log(error);

                    this.messageValidarConexion = error.error;

                    this.progressSpinner = false;

                    this.boolValidarConexion = false;
                }
            );
    }

    getSeverity(status: boolean) {
        switch (status) {
            case true:
                return 'success';
            case false:
                return 'warning';
        }
    }

    save(severity: string) {
        this.messageService.add({
            severity: severity,
            summary: 'Success',
            detail: 'Data Saved',
        });
    }

    update() {
        this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Data Updated',
        });
    }

    delete() {
        this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Data Deleted',
        });
    }

    showDialog() {
        this.visible = true;
    }

    closeDialog() {
        this.visible = false;
    }

    bytesToMiB(bytes?: number): number | 0 {
        if (bytes === undefined) {
            return 0; // O puedes devolver NaN o algún otro valor apropiado
        }
        const MiB = bytes / (1024 * 1024);
        return parseFloat(MiB.toFixed(1)); // Redondear a 1 decimal y convertir de nuevo
    }

    showDialogEditMikrotik() {
        this.visibleModalEditRouter = true;
    }

    closeDialogEditMikrotik() {
        this.visibleModalEditRouter = false;
    }

    editRouterMikrotik(idRouter: number) {
        this.showDialogEditMikrotik();

        /* let filterarrayHotspotMikrotiks: Ihotspotmikrotiks | undefined; */
        // Usamos find para encontrar el primer elemento que cumpla con la condición
        const foundHotspotMikrotiks = this.arrayHotspotMikrotiks.find(
            (id) => id.routers_id === idRouter
        );
        
        if (foundHotspotMikrotiks) {
            this.filterarrayHotspotMikrotiks = foundHotspotMikrotiks;
        } else {
            // Manejar el caso en que no se encuentra ningún elemento
        }

        console.log(this.filterarrayHotspotMikrotiks);
    }
}
