import { Routes } from '@angular/router';

export const TochangeRoutes: Routes = [
  { 
    path: '', 
    children: [{
        path: 'news',
        loadChildren: './news/news.module#NewsModule', 
        data: { title: '最新消息', breadcrumb: '最新消息'}
      },{
        path: 'waybills',
        loadChildren: './waybills/waybills.module#WaybillsModule', 
        data: { title: '貨物清單', breadcrumb: '貨物清單'}
      },
      {
        path: 'consignment-bills',
        loadChildren: './consignment-bills/consignment-bills.module#ConsignmentBillsModule', 
        data: { title: '集運紀錄', breadcrumb: '集運紀錄'}
      },
      {
        path: 'addresses',
        loadChildren: './addresses/addresses.module#AddressesModule', 
        data: { title: '收貨地址', breadcrumb: '收貨地址'}
      },
      {
        path: 'introduction',
        loadChildren: './introduction/introduction.module#IntroductionModule', 
        data: { title: '集運導航', breadcrumb: '集運導航'}
      },
      {
        path: 'contact-us',
        loadChildren: './contact-us/contact-us.module#ContactUsModule', 
        data: { title: '聯絡我們', breadcrumb: '聯絡我們'}
      },
      { 
        path: '**', 
        redirectTo: 'news', 
        pathMatch: 'full' 
      }]
  }
  
];