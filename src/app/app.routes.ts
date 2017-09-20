import { Routes } from '@angular/router';

import { AdminLayoutComponent } from './components/common/layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './components/common/layouts/auth-layout/auth-layout.component';

import { AuthGuard } from './services/auth.guard';

export const rootRouterConfig: Routes = [
  { 
    path: '', 
    redirectTo: 'news', 
    pathMatch: 'full' 
  },
  {
    path: '', 
    component: AuthLayoutComponent,
    children: [{ 
        path: 'sessions', 
        loadChildren: './views/sessions/sessions.module#SessionsModule',
        data: { title: 'Session'} 
    }]
  },
  {
    path: '', 
    component: AdminLayoutComponent,
    canActivate: [AuthGuard],
    children: [{
        path: '', 
        loadChildren: './views/tochange/tochange.module#TochangeModule', 
        data: { title: 'Tochange'}
    }]
  },
  { 
    path: '**', 
    redirectTo: 'news', 
    pathMatch: 'full' 
  }
];

