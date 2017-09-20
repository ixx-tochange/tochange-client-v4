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
  MdSelectModule
 } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { AppDialogModule } from '../../../services/app-dialog/app-dialog.module';
import { ConsignmentBillsComponent } from './consignment-bills.component';
import { ConsignmentBillComponent } from './consignment-bill/consignment-bill.component';
import { ConsignmentBillsRoutes } from "./consignment-bills.routing";

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
    FlexLayoutModule,
    NgxDatatableModule,
    AppDialogModule,
    RouterModule.forChild(ConsignmentBillsRoutes)
  ],
  declarations: [ConsignmentBillsComponent, ConsignmentBillComponent]
})
export class ConsignmentBillsModule { }
