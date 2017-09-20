import { Observable } from 'rxjs/Rx';
import { MdDialogRef, MdDialog, MdDialogConfig } from '@angular/material';
import { Injectable } from '@angular/core';

import { AppAlertComponent } from './app-alert.component';
import { AppComfirmComponent } from './app-confirm.component';

@Injectable()
export class AppDialogService {

  constructor(
    private dialog: MdDialog) { }

  public alert(title: string, message: string): Observable<boolean> {
    let dialogRef: MdDialogRef<AppAlertComponent>;
    dialogRef = this.dialog.open(AppAlertComponent, {disableClose: true});
    dialogRef.updateSize('380px');
    dialogRef.componentInstance.title = title;
    dialogRef.componentInstance.message = message;
    return dialogRef.afterClosed();
  }
  
  public confirm(title: string, message: string): Observable<boolean> {
    let dialogRef: MdDialogRef<AppComfirmComponent>;
    dialogRef = this.dialog.open(AppComfirmComponent, {disableClose: true});
    dialogRef.updateSize('380px');
    dialogRef.componentInstance.title = title;
    dialogRef.componentInstance.message = message;
    return dialogRef.afterClosed();
  }
}