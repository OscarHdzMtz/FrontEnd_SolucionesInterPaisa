import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RoutersfichasComponent } from './routersfichas.component';



@NgModule({
  /* declarations: [], */
  imports: [RouterModule.forChild([
    { path: '', component: RoutersfichasComponent }
])],
exports: [RouterModule]
})
export class RoutersfichasRoutingModule { }
