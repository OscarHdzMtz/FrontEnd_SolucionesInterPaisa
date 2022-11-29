import { Component, OnInit } from '@angular/core';
import { UsuariosfichasService } from 'src/app/demo/service/usuariosfichas.service';
import * as FileSaver from 'file-saver';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { BadgeModule } from 'primeng/badge';
import { ConfirmationService } from 'primeng/api';
import {Message} from 'primeng//api';
import {MessageService} from 'primeng/api';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import { ToastrService } from 'ngx-toastr';
import { style } from '@angular/animations';

@Component({
    selector: 'app-usuariosfichas',
    templateUrl: './usuariosfichas.component.html',
    providers: [MessageService,ConfirmationService]
})
export class UsuariosfichasComponent implements OnInit {
    arrayUsuariosFichasFront: any[] = [];
    constructor(private _usuarioFichasService: UsuariosfichasService, private toastr: ToastrService, private messageService: MessageService, private confirmationService: ConfirmationService) {}

    cols?: any[];
    exportColumns?: any[];
    ngOnInit(): void {
        this.obtenerUsuariosFichas();

        this.cols = [
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
        }));
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

    exportExcel() {
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
            this.saveAsExcelFile(excelBuffer, 'products');
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
