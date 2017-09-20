import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  MdListModule,
  MdIconModule,
  MdButtonModule,
  MdCardModule,
  MdMenuModule,
  MdSlideToggleModule,
  MdGridListModule
 } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

import { CSComponent } from './cs/cs.component';
import { SelfPickupComponent } from './self-pickup/self-pickup.component';
import { ContactUsRoutes } from "./contact-us.routing";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MdListModule,
    MdIconModule,
    MdButtonModule,
    MdCardModule,
    MdMenuModule,
    MdSlideToggleModule,
    MdGridListModule,
    FlexLayoutModule,
    RouterModule.forChild(ContactUsRoutes)
  ],
  declarations: [CSComponent, SelfPickupComponent]
})
export class ContactUsModule { }
