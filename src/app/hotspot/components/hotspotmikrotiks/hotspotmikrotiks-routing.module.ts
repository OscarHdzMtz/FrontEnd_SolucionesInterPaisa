import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HotspotmikrotiksComponent } from './hotspotmikrotiks.component';

const routes: Routes = [{path: '', component:HotspotmikrotiksComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HotspotmikrotiksRoutingModule { }
