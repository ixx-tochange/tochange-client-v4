import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { Http, HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule, TranslateLoader, TranslateStaticLoader } from 'ng2-translate/ng2-translate';


import { rootRouterConfig } from './app.routes';
import { AppCommonModule } from "./components/common/app-common.module";
import { AppComponent } from './app.component';

import { RoutePartsService } from './services/route-parts/route-parts.service';
import { NavigationService } from "./services/navigation.service";
import { AuthGuard } from './services/auth.guard';
import { AuthService } from './services/auth.service';

import { AddressService } from './services/address.service';
import { WaybillService } from './services/waybill.service';
import { LogisticsCompanyService } from './services/logistics-company.service';
import { CountryService } from './services/country.service';
import { AddressTypeService } from './services/address-type.service';
import { ConsignmentBillService } from './services/consignment-bill.service';
import { PriceListService } from './services/price-list.service';
import { CollectAddressService } from './services/collect-address.service';


export function createTranslateLoader(http: Http) {
  return new TranslateStaticLoader(http, './assets/i18n', '.json');
}

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    AppCommonModule,
    TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: (createTranslateLoader),
      deps: [Http]
    }),
    RouterModule.forRoot(rootRouterConfig, { useHash: false }),
  ],
  declarations: [AppComponent],
  providers: [RoutePartsService, NavigationService, AuthGuard, AuthService, AddressService, WaybillService, LogisticsCompanyService, CountryService, AddressTypeService, ConsignmentBillService, PriceListService, CollectAddressService],
  bootstrap: [AppComponent]
})
export class AppModule { }