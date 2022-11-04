import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PerfilfichasComponent } from './perfilfichas.component';



@NgModule({
    imports: [RouterModule.forChild([
		{ path: '', component: PerfilfichasComponent }
	])],
	exports: [RouterModule]
})
export class PerfilfichasRoutingModule { }
