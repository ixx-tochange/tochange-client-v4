import { Routes } from '@angular/router';
import { AddressesComponent } from './addresses.component';
import { AddressComponent } from './address/address.component';

export const AddressesRoutes: Routes = [
  {
    path: '',
    component: AddressesComponent,
    data: { title: '收貨地址', breadcrumb: '收貨地址'}
  },
  {
    path: ':id',
    component: AddressComponent,
    data: { title: '收貨地址', breadcrumb: '收貨地址'}
  }
];