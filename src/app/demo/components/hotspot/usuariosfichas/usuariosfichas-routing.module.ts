import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UsuariosfichasComponent } from './usuariosfichas.component';



@NgModule({
  /* declarations: [], */
  imports: [RouterModule.forChild([
    { path: '', component: UsuariosfichasComponent }
])],
exports: [RouterModule]
})
export class UsuariosfichasRoutingModule { }
