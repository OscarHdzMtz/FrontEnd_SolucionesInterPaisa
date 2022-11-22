import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CrearvenderusuariosfichasComponent } from './crearvenderusuariosfichas.component';
import { RouterModule } from '@angular/router';



@NgModule({
    imports: [RouterModule.forChild([
		{ path: '', component: CrearvenderusuariosfichasComponent }
	])],
	exports: [RouterModule]
})
export class CrearvenderusuariosfichasRoutingModule { }
