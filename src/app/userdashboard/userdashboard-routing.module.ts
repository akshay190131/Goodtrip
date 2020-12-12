import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserdashComponent } from './userdash/userdash.component';
import { RouteguardService } from '../routeguard.service';


const routes: Routes = [
{ path: 'dashboard' , component: UserdashComponent, canActivate: [RouteguardService] }
    
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserdashboardRoutingModule { }
