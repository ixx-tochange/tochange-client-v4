import { Routes } from '@angular/router';
import { WaybillsComponent } from './waybills.component';
import { WaybillComponent } from './waybill/waybill.component';

export const WaybillsRoutes: Routes = [
  {
    path: '',
    component: WaybillsComponent,
  },
  {
    path: ':id',
    component: WaybillComponent
  }
];