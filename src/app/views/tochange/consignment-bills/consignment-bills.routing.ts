import { Routes } from '@angular/router';
import { ConsignmentBillsComponent } from './consignment-bills.component';
import { ConsignmentBillComponent } from './consignment-bill/consignment-bill.component';

export const ConsignmentBillsRoutes: Routes = [
  {
    path: '',
    component: ConsignmentBillsComponent,
    data: { title: '貨物清單', breadcrumb: '貨物清單'}
  },
  {
    path: ':id',
    component: ConsignmentBillComponent,
    data: { title: '包裹', breadcrumb: '包裹'}
  }
];