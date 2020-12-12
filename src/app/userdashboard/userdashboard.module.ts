import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserdashboardRoutingModule } from './userdashboard-routing.module';
import { UserdashComponent } from './userdash/userdash.component';
import { UsericonComponent } from './usericon/usericon.component';


@NgModule({
  declarations: [UserdashComponent, UsericonComponent],
  exports: [UserdashComponent, UsericonComponent],

  imports: [
    CommonModule,
    UserdashboardRoutingModule,
    FormsModule,    //added here too
    ReactiveFormsModule //added here too
  ]
})
export class UserdashboardModule { }
