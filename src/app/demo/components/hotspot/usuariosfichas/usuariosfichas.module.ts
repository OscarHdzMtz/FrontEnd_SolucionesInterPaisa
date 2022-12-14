import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { FileUploadModule } from 'primeng/fileupload';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { RatingModule } from 'primeng/rating';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputNumberModule } from 'primeng/inputnumber';
import { DialogModule } from 'primeng/dialog';
import { UsuariosfichasRoutingModule } from './usuariosfichas-routing.module';
import { UsuariosfichasComponent } from './usuariosfichas.component';
import {BadgeModule} from 'primeng/badge';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { AddusuariosfichasComponent } from './addusuariosfichas/addusuariosfichas.component';



@NgModule({
  declarations: [UsuariosfichasComponent],
  imports: [
    CommonModule,
    UsuariosfichasRoutingModule,
    TableModule,
    FileUploadModule,
    FormsModule,
    ButtonModule,
    RippleModule,
    ToastModule,
    ToolbarModule,
    RatingModule,
    InputTextModule,
    InputTextareaModule,
    DropdownModule,
    RadioButtonModule,
    InputNumberModule,
    DialogModule,
    BadgeModule,
    ConfirmDialogModule,
  ]
})
export class UsuariosfichasModule { }
