import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HotspotmikrotiksRoutingModule } from './hotspotmikrotiks-routing.module';
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
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { BadgeModule } from 'primeng/badge';
import { HotspotmikrotiksComponent } from './hotspotmikrotiks.component';
import { TagModule } from 'primeng/tag';
import { SplitButtonModule } from 'primeng/splitbutton';



@NgModule({
  declarations: [HotspotmikrotiksComponent],
  imports: [
    CommonModule,
    HotspotmikrotiksRoutingModule,
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
    ConfirmDialogModule,
    BadgeModule,
    TagModule,
    SplitButtonModule ,    
  ]
})
export class HotspotmikrotiksModule { }
