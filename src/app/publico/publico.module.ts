import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicoRoutingModule } from './publico-routing.module';
import { MainComponent } from './components/main/main.component';
import { DividerModule } from 'primeng/divider';
import { ChartModule } from 'primeng/chart';
import { PanelModule } from 'primeng/panel';
import { ButtonModule } from 'primeng/button';
import { StyleClassModule } from 'primeng/styleclass';


@NgModule({
  declarations: [
    MainComponent
  ],
  imports: [
    CommonModule,
    PublicoRoutingModule,
    DividerModule,
    StyleClassModule,
    ChartModule,
    PanelModule,
    ButtonModule    
  ],
})
export class PublicoModule { }
