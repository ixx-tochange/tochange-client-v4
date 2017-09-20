import { MdDialogRef } from '@angular/material';
import { Component } from '@angular/core';

@Component({
  selector: 'app-alert',
  template: `<h1 md-dialog-title>{{ title }}</h1>
    <div md-dialog-content>{{ message }}</div>
    <div md-dialog-actions>
    &nbsp;
    <span fxFlex></span>
    <button 
    type="button"
    color="accent"
    md-raised-button 
    (click)="dialogRef.close(false)">Got it!</button>
    </div>`,
})
export class AppAlertComponent {

  public title: string;
  public message: string;

  constructor(public dialogRef: MdDialogRef<AppAlertComponent>) {

  }
}