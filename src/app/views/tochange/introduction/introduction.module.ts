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

import { AddressComponent } from './address/address.component';
import { FaqComponent } from './faq/faq.component';
import { PriceListComponent } from './price-list/price-list.component';
import { IntroductionRoutes } from "./introduction.routing";

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
    RouterModule.forChild(IntroductionRoutes)
  ],
  declarations: [AddressComponent, FaqComponent, PriceListComponent]
})
export class IntroductionModule { }
