import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MdCardModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

import { NewsComponent } from './news.component';
import { NewsRoutes } from "./news.routing";

@NgModule({
  imports: [
    CommonModule,
    MdCardModule,
    FlexLayoutModule,
    RouterModule.forChild(NewsRoutes)
  ],
  declarations: [NewsComponent]
})
export class NewsModule { }
