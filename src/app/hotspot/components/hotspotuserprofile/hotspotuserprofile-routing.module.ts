import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HotspotuserprofileComponent } from './hotspotuserprofile.component';

const routes: Routes = [{ path: '', component: HotspotuserprofileComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HotspotuserprofileRoutingModule { }
