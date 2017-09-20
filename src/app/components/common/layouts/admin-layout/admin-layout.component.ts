import { Component, OnInit, ViewChild } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from "rxjs/Subscription";
import { MdSidenav } from '@angular/material';
import { TranslateService } from 'ng2-translate/ng2-translate';
import * as Ps from 'perfect-scrollbar';
import * as domHelper from '../../../../helpers/dom.helper';

import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.template.html'
})
export class AdminLayoutComponent implements OnInit {
  private isMobile;
  screenSizeWatcher: Subscription;
  isSidenavOpen: Boolean = false;
  url;
  @ViewChild(MdSidenav) private sideNave: MdSidenav;
  
  public me = {
      name: '',
      _id: '',
      avatar: 'avatar-2.png'
  };
  
  constructor(
        private router: Router,
        private http: Http,
        public translate: TranslateService,
        private authService: AuthService) {
    
    // Close sidenav after route change in mobile
    router.events.filter(event => event instanceof NavigationEnd).subscribe((routeChange: NavigationEnd) => {
      this.url = routeChange.url;
      if(this.isNavOver()) {
        this.sideNave.close()
      }
    });
    
    // Translator init
    const browserLang: string = translate.getBrowserLang();
    translate.use(browserLang.match(/en|fr/) ? browserLang : 'en');
  }
  ngOnInit() {
    // Initialize Perfect scrollbar for sidenav
    let navigationHold = document.getElementById('scroll-area');
    Ps.initialize(navigationHold, {
      suppressScrollX: true
    });
    
    this.authService.me()
        .then((response: Response) => {
            this.me = response.json()
            localStorage.setItem('me', JSON.stringify(this.me));
        })
        .catch((error) => {
            if(error.status==401){
                this.router.navigate(['/sessions/signin']);
            }
        })
        
  }

  isNavOver() {
    if(this.url === '/inbox') {
      return true;
    } else {
      return window.matchMedia(`(max-width: 960px)`).matches;
    }
  }
}