import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'error2', loadChildren: () => import('./error/error.module').then(m => m.ErrorModule) },
        { path: 'access2', loadChildren: () => import('./access/access.module').then(m => m.AccessModule) },
        { path: 'login2', loadChildren: () => import('./login/login.module').then(m => m.LoginModule) },
        { path: '**', redirectTo: '/notfound' }
    ])],
    exports: [RouterModule]
})
export class AuthRoutingModule { }
