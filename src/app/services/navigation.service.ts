import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface IMenuItem {
  type: string,       // Possible values: link/dropDown/icon/separator/extLink
  name?: string,      // Used as display text for item and title for separator type
  state?: string,     // Router state
  icon?: string,      // Item icon name
  tooltip?: string,   // Tooltip text 
  disabled?: boolean, // If true, item will not be appeared in sidenav.
  sub?: IChildItem[]  // Dropdown items
}
interface IChildItem {
  name: string,       // Display text
  state: string       // Router state
}

@Injectable()
export class NavigationService {
  constructor() {}

  defaultMenu:IMenuItem[] = [
    {
      name: '最新消息',
      type: 'link',
      tooltip: '最新消息',
      icon: 'event',
      state: 'news'
    },
    {
      name: '貨物清單',
      type: 'link',
      tooltip: '貨物清單',
      icon: 'shopping_cart',
      state: 'waybills'
    },
    {
      name: '集運紀錄',
      type: 'link',
      tooltip: '集運紀錄',
      icon: 'local_shipping',
      state: 'consignment-bills'
    },
    {
      name: '收貨地址',
      type: 'link',
      tooltip: '收貨地址',
      icon: 'map',
      state: 'addresses'
    },
    {
      name: '集運導航',
      type: 'dropDown',
      tooltip: '集運導航',
      icon: 'help',
      state: 'introduction',
      sub: [
          {name: '中轉站地址', state: 'address'},
          {name: '集運收費', state: 'price-list'},
          {name: '常見問題', state: 'faq'}
      ]
    },
    {
      name: '聯絡我們',
      type: 'dropDown',
      tooltip: '聯絡我們',
      icon: 'contact_mail',
      state: 'contact-us',
      sub: [
          {name: '自取點地址', state: 'self-pickup'},
          {name: '客戶服務', state: 'cs'}
      ]
    }
  ]
  
  
  // Icon menu TITLE at the very top of navigation.
  // This title will appear if any icon type item is present in menu.
  iconTypeMenuTitle:string = 'Frequently Accessed';
  // sets iconMenu as default;
  menuItems = new BehaviorSubject<IMenuItem[]>(this.defaultMenu);
  // navigation component has subscribed to this Observable
  menuItems$ = this.menuItems.asObservable();
}