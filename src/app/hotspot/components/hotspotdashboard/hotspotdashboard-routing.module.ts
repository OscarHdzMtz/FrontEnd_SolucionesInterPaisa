import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HotspotdashboardComponent } from './hotspotdashboard.component';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild([
		{ path: '', component: HotspotdashboardComponent }
	])],
  exports: [RouterModule]
})
export class HotspotdashboardRoutingModule { }
