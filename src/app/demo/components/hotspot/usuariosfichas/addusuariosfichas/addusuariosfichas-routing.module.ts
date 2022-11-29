import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddusuariosfichasComponent } from './addusuariosfichas.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [],
  imports: [RouterModule.forChild([
    { path: '', component: AddusuariosfichasComponent },
])],
exports: [RouterModule]
})
export class AddusuariosfichasRoutingModule { }
