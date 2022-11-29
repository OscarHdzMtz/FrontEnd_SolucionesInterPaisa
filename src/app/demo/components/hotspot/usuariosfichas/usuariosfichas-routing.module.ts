import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UsuariosfichasComponent } from './usuariosfichas.component';



@NgModule({
  /* declarations: [], */
  imports: [RouterModule.forChild([
    { path: '', component: UsuariosfichasComponent },
    { path: 'addusuariosfichas', loadChildren: () => import('./addusuariosfichas/addusuariosfichas.module').then(m => m.AddusuariosfichasModule) },
])],
exports: [RouterModule]
})
export class UsuariosfichasRoutingModule { }
