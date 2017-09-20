import { Routes } from '@angular/router';
import { AddressComponent } from './address/address.component';
import { FaqComponent } from './faq/faq.component';
import { PriceListComponent } from './price-list/price-list.component';

export const IntroductionRoutes: Routes = [
  {
    path: 'address',
    component: AddressComponent,
    data: { title: '集運地址', breadcrumb: '集運地址'}
  },
  {
    path: 'price-list',
    component: PriceListComponent,
    data: { title: '集運收費', breadcrumb: '集運收費'}
  },
  {
    path: 'faq',
    component: FaqComponent,
    data: { title: '常見問題', breadcrumb: '常見問題'}
  },
  { 
    path: '', 
    redirectTo: 'faq', 
    pathMatch: 'full' 
  }
];