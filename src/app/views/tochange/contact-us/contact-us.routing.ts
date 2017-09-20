import { Routes } from '@angular/router';
import { CSComponent } from './cs/cs.component';
import { SelfPickupComponent } from './self-pickup/self-pickup.component';

export const ContactUsRoutes: Routes = [
  {
    path: 'cs',
    component: CSComponent,
    data: { title: '客戶服務', breadcrumb: '客戶服務'}
  },
  {
    path: 'self-pickup',
    component: SelfPickupComponent,
    data: { title: '自取點', breadcrumb: '自取點'}
  },
  { 
    path: '', 
    redirectTo: 'cs', 
    pathMatch: 'full' 
  }
];