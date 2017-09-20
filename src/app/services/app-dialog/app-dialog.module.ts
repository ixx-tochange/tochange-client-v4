import { 
  MdDialogModule,
  MdSnackBarModule,
  MdButtonModule
 } from '@angular/material';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppDialogService } from './app-dialog.service';
import { AppAlertComponent } from './app-alert.component';
import { AppComfirmComponent } from './app-confirm.component';

@NgModule({
  imports: [
    MdDialogModule,
    MdSnackBarModule,
    MdButtonModule,
    FlexLayoutModule
  ],
  exports: [AppAlertComponent, AppComfirmComponent],
  declarations: [AppAlertComponent, AppComfirmComponent],
  providers: [AppDialogService],
  entryComponents: [AppAlertComponent, AppComfirmComponent]
})
export class AppDialogModule { }