import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { FlexLayoutModule } from '@angular/flex-layout';
import { TranslateModule } from 'ng2-translate/ng2-translate';
import { AdsenseModule } from 'ng2-adsense';

import { 
  MdSidenavModule,
  MdListModule,
  MdTooltipModule,
  MdOptionModule,
  MdSelectModule,
  MdMenuModule,
  MdSnackBarModule,
  MdGridListModule,
  MdToolbarModule,
  MdIconModule,
  MdButtonModule,
  MdRadioModule,
  MdCheckboxModule,
  MdCardModule
} from '@angular/material';
import { TopbarComponent } from './topbar/topbar.component';
import { NavigationComponent } from './navigation/navigation.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { CommonDirectivesModule } from '../../directives/common/common-directives.module';
import { ThemeService } from '../../services/theme.service';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    BrowserModule,
    RouterModule,
    FlexLayoutModule,
    MdSidenavModule,
    MdIconModule,
    MdListModule,
    MdTooltipModule,
    MdOptionModule,
    MdSelectModule,
    MdMenuModule,
    MdSnackBarModule,
    MdGridListModule,
    MdToolbarModule,
    MdButtonModule,
    MdRadioModule,
    MdCheckboxModule,
    MdCardModule,
    CommonDirectivesModule,
    TranslateModule,
    AdsenseModule.forRoot({
      adClient: 'ca-pub-0437258559459382'
    }),
  ],
  declarations: [
    AdminLayoutComponent,
    AuthLayoutComponent,
    TopbarComponent, 
    NavigationComponent, 
    NotificationsComponent, BreadcrumbComponent
  ],
  providers: [ThemeService],
  exports: []
})
export class AppCommonModule {}