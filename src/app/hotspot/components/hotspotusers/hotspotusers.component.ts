import { Component, OnInit } from '@angular/core';
import { HotspotusersService } from '../../services/hotspotusers.service';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService, MessageService } from 'primeng/api';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-hotspotusers',
  templateUrl: './hotspotusers.component.html',  
  providers: [MessageService,ConfirmationService]
})
export class HotspotusersComponent implements OnInit {
  arrayUsuariosFichasFront: any[] = [];
    constructor(private _usuarioFichasService: HotspotusersService, private toastr: ToastrService, private messageService: MessageService, private confirmationService: ConfirmationService) {}

    cols?: any[];
    exportColumns?: any[];
    ngOnInit(): void {
        this.obtenerUsuariosFichas();

       /*  this.cols = [
            {
                field: 'code',
                header: 'Code',
                customExportHeader: 'Product Code',
            },
            { field: 'name', header: 'Name' },
            { field: 'category', header: 'Category' },
            { field: 'quantity', header: 'Quantity' },
        ];

        this.exportColumns = this.cols.map((col) => ({
            title: col.header,
            dataKey: col.field,
        })); */
    }

    //OBTENER LOS DATOS DESDE EL SERVICIO
    obtenerUsuariosFichas() {
        this._usuarioFichasService.getUsuariosFichas().subscribe(
            (data) => {
                console.log(data);
                this.arrayUsuariosFichasFront = data;
            },
            (error) => {
                console.log(error);
            }
        );
    }
    arrayUsuariosFichasPrint: any[] = [];
    exportExcel() {
        //BORRAMOS LOS DATOS QUE NO QUEREMOS QUE SE IMPRIME EN EL EXCEL CON UN FOR
        for (let i = 0; i < this.arrayUsuariosFichasFront.length; i++) {
            delete(this.arrayUsuariosFichasFront[i].id)
            delete(this.arrayUsuariosFichasFront[i].address)            
            delete(this.arrayUsuariosFichasFront[i].email)
            delete(this.arrayUsuariosFichasFront[i].limitBytesIn)
            delete(this.arrayUsuariosFichasFront[i].limitBytesOut)
            delete(this.arrayUsuariosFichasFront[i].limitBytesTotal)
            delete(this.arrayUsuariosFichasFront[i].limitUptime)
            delete(this.arrayUsuariosFichasFront[i].macAddress)
            delete(this.arrayUsuariosFichasFront[i].routes)
            delete(this.arrayUsuariosFichasFront[i].disabled)
            delete(this.arrayUsuariosFichasFront[i].bytesIn)
            delete(this.arrayUsuariosFichasFront[i].bytesOut)
            delete(this.arrayUsuariosFichasFront[i].packetsIn)
            delete(this.arrayUsuariosFichasFront[i].packetsOut)
            delete(this.arrayUsuariosFichasFront[i].uptime)
        }                       
        import('xlsx').then((xlsx) => {
            const worksheet = xlsx.utils.json_to_sheet(
                this.arrayUsuariosFichasFront
            );
            const workbook = {
                Sheets: { data: worksheet },
                SheetNames: ['data'],
            };
            const excelBuffer: any = xlsx.write(workbook, {
                bookType: 'xlsx',
                type: 'array',
            });
            this.saveAsExcelFile(excelBuffer, 'UsuariosFichas');
        });
    }

    saveAsExcelFile(buffer: any, fileName: string): void {
        let EXCEL_TYPE =
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
        let EXCEL_EXTENSION = '.xlsx';
        const data: Blob = new Blob([buffer], {
            type: EXCEL_TYPE,
        });
        FileSaver.saveAs(
            data,
            fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION
        );
    }

    deleteUsuariosFichas(id: string, nombreFicha: string) {
        this.confirmationService.confirm({
            message: 'Estas seguro que quieres Eliminar la ficha ' + nombreFicha + ' ?',
            header: 'Eliminar',
            icon: 'pi pi-trash',
            accept: () => {
                this._usuarioFichasService.deleteUsuariosFichas(id).subscribe(data => {
                    /* this.toastr.warning('Perfil ' + nombrePerfil + ' eliminada con Exito','Eliminado'); */
                    this.messageService.add({severity:'success', summary: 'Eliminado', detail: 'Usuario ' + nombreFicha + ' eliminada con Exito', life: 3000});
                    this.obtenerUsuariosFichas();
                }, error => {
                    /* this.toastr.error(error.status + ' ' +  error.name, 'Error') */
                    this.messageService.add({severity:'error', summary: 'Error', detail: error.status + ' ' +  error.name, life: 3000});
                });
            }
        });

    }

}
