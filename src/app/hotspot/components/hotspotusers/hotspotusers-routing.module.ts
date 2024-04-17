import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HotspotusersComponent } from './hotspotusers.component';

const routes: Routes = [{ path: '', component: HotspotusersComponent },
{ path: 'add', loadChildren: () => import('./addhotspotusers/addhotspotusers.module').then(m => m.AddhotspotusersModule) },];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HotspotusersRoutingModule { }
