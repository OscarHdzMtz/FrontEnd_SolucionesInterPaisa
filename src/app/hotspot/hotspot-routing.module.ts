import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [RouterModule.forChild([
    { path: 'dashboard', loadChildren: () => import('./components/hotspotdashboard/hotspotdashboard.module').then(m => m.HotspotdashboardModule) },
    { path: 'userprofile', loadChildren: () => import('./components/hotspotuserprofile/hotspotuserprofile.module').then(m => m.HotspotuserprofileModule) },
    { path: 'users', loadChildren: () => import('./components/hotspotusers/hotspotusers.module').then(m => m.HotspotusersModule) },
    { path: 'routers', loadChildren: () => import('./components/hotspotmikrotiks/hotspotmikrotiks.module').then(m => m.HotspotmikrotiksModule) },
    { path: 'user', loadChildren: () => import('./components/hotspotusers/addhotspotuser/addhotspotuser.module').then(m => m.AddhotspotuserModule) },
    { path: '**', redirectTo: '/notfound' }
])],
  exports: [RouterModule]
})
export class HotspotRoutingModule { }
