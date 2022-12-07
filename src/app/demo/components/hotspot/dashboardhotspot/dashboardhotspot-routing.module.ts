import { DashboardhotspotComponent } from './dashboardhotspot.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';



@NgModule({
  imports: [RouterModule.forChild([
		{ path: '', component: DashboardhotspotComponent }
	])],
	exports: [RouterModule]
})
export class DashboardhotspotRoutingModule { }
