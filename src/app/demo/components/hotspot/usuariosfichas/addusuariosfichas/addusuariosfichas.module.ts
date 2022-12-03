import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddusuariosfichasRoutingModule } from './addusuariosfichas-routing.module';
import { TableModule } from 'primeng/table';
import { FileUploadModule } from 'primeng/fileupload';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { BadgeModule } from 'primeng/badge';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { AddusuariosfichasComponent } from './addusuariosfichas.component';
import {DividerModule} from 'primeng/divider';
import {SliderModule} from 'primeng/slider';
import {ProgressBarModule} from 'primeng/progressbar';
import {ProgressSpinnerModule} from 'primeng/progressspinner';

@NgModule({
  declarations: [AddusuariosfichasComponent],
  imports: [
    CommonModule,
    AddusuariosfichasRoutingModule,
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
    DividerModule,
    SliderModule,
    DialogModule,
    ConfirmDialogModule,
    BadgeModule,
    ProgressBarModule,
    ProgressSpinnerModule,
    ReactiveFormsModule
  ]
})
export class AddusuariosfichasModule { }
