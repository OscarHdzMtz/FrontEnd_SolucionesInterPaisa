import { Component, OnInit } from '@angular/core';
import { HotspotmikrotiksService } from '../../services/hotspotmikrotiks.service';
import { ToastrService } from 'ngx-toastr';
import { MenuItem, MessageService } from 'primeng/api';
import { Identitysystemhotspotmikrotiks } from '../../interfaces/systemhotspotmikrotiks/identitysystemhotspotmikrotiks';
import { Routerboardsystemhotspotmikrotiks } from '../../interfaces/systemhotspotmikrotiks/routerboardsystemhotspotmikrotiks';
import { Resourcesystemhotspotmikrotiks } from '../../interfaces/systemhotspotmikrotiks/resourcesystemhotspotmikrotiks';
import { Logsystemhotspotmikrotiks } from '../../interfaces/systemhotspotmikrotiks/logsystemhotspotmikrotiks';


@Component({
    selector: 'app-hotspotmikrotiks',
    templateUrl: './hotspotmikrotiks.component.html',
    providers: [MessageService],
})
export class HotspotmikrotiksComponent implements OnInit {
    arrayHotspotMikrotiks: any[] = [];
    LogsystemHotspotMikrotik: Logsystemhotspotmikrotiks[] = [];
    ResourcesystemHotspotMikrotik? : Resourcesystemhotspotmikrotiks;
    RouterBoardSystemHotspotMikrotik? : Routerboardsystemhotspotmikrotiks;
    identitySystemdHotspotMikrotik? : Identitysystemhotspotmikrotiks;

    constructor(
        private _HotspotmikrotiksService: HotspotmikrotiksService,
        private messageService: MessageService
    ) {}

    ngOnInit(): void {
        this.getHotspotMikrotiks();
        this.getSystemResourceHotspotMikrotiks();
        this.getSystemRouterBoardHotspotMikrotiks();
        this.getSystemIdentityHotspotMikrotiks();
        this.getSystemLogHotspotMikrotiks();
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

    getSystemResourceHotspotMikrotiks() {
        this._HotspotmikrotiksService.getSystemResourceHotspotMikrotiks().subscribe(
            (data) => {
                /* console.log("//");
                console.log(data.resultado); */

                this.ResourcesystemHotspotMikrotik = data.resultado;

                console.log("//");
                console.log(this.ResourcesystemHotspotMikrotik);
            },
            (error) => {
                console.log(error);
            }
        );
    }

    getSystemRouterBoardHotspotMikrotiks() {
        this._HotspotmikrotiksService.getSystemRouterBoardHotspotMikrotiks().subscribe(
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
        this._HotspotmikrotiksService.getSystemIdentityHotspotMikrotiks().subscribe(
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
}
