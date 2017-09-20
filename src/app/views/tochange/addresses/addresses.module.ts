import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  MdIconModule,
  MdButtonModule,
  MdCardModule,
  MdInputModule,
  MdSelectModule
 } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppDialogModule } from '../../../services/app-dialog/app-dialog.module'
import { AddressesComponent } from './addresses.component';
import { AddressComponent } from './address/address.component';
import { AddressesRoutes } from "./addresses.routing";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MdIconModule,
    MdButtonModule,
    MdCardModule,
    MdInputModule,
    MdSelectModule,
    FlexLayoutModule,
    AppDialogModule,
    RouterModule.forChild(AddressesRoutes)
  ],
  declarations: [AddressesComponent, AddressComponent]
})
export class AddressesModule { }
