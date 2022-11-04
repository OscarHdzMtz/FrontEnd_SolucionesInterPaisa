import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';



@NgModule({
  /* declarations: [], */
  imports: [RouterModule.forChild([
    { path: 'perfilfichas', loadChildren: () => import('./perfilfichas/perfilfichas.module').then(m => m.PerfilfichasModule) },
    { path: 'usuariosfichas', loadChildren: () => import('./usuariosfichas/usuariosfichas.module').then(m => m.UsuariosfichasModule) },
    { path: 'routersfichas', loadChildren: () => import('./routersfichas/routersfichas.module').then(m => m.RoutersfichasModule) },
    //{ path: '**', redirectTo: '/notfound' }
])],
exports: [RouterModule]
})
export class HotspotRoutingModule { }
