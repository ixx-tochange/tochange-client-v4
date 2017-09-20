import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  MdIconModule,
  MdButtonModule,
  MdCardModule,
  MdCheckboxModule,
  MdInputModule,
  MdSelectModule,
  MdTabsModule
 } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppDialogModule } from '../../../services/app-dialog/app-dialog.module';
import { WaybillsComponent } from './waybills.component';
import { WaybillComponent } from './waybill/waybill.component';
import { WaybillsRoutes } from "./waybills.routing";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MdIconModule,
    MdButtonModule,
    MdCardModule,
    MdCheckboxModule,
    MdInputModule,
    MdSelectModule,
    MdTabsModule,
    FlexLayoutModule,
    AppDialogModule,
    RouterModule.forChild(WaybillsRoutes)
  ],
  declarations: [WaybillsComponent, WaybillComponent]
})
export class WaybillsModule { }
