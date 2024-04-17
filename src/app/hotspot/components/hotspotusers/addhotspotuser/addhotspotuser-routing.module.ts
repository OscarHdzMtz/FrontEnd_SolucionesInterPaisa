import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddhotspotuserComponent } from './addhotspotuser.component';

const routes: Routes = [{path:'', component: AddhotspotuserComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddhotspotuserRoutingModule { }
