import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddhotspotusersComponent } from './addhotspotusers.component';

const routes: Routes = [ { path: '', component: AddhotspotusersComponent },];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddhotspotusersRoutingModule { }
