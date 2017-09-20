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

import { IntroductionModule } from './introduction/introduction.module';
import { TochangeRoutes } from "./tochange.routing";

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
    RouterModule.forChild(TochangeRoutes),
    IntroductionModule
  ],
  declarations: []
})
export class TochangeModule { }
