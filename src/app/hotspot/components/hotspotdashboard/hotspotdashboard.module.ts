import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HotspotdashboardRoutingModule } from './hotspotdashboard-routing.module';
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
import { HotspotdashboardComponent } from './hotspotdashboard.component';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TabViewModule } from 'primeng/tabview';
import { Avatar, AvatarModule } from 'primeng/avatar';
import { ChartModule } from 'primeng/chart';


@NgModule({
  declarations: [HotspotdashboardComponent],
  imports: [
    CommonModule,
    HotspotdashboardRoutingModule,
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
    ProgressSpinnerModule,
    TabViewModule,
    AvatarModule ,
    ChartModule 
  ]
})
export class HotspotdashboardModule { }
