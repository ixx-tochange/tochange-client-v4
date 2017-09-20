import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MdSnackBar } from '@angular/material';

import { AuthService } from '../../../services/auth.service';
import { AppDialogService } from '../../../services/app-dialog/app-dialog.service';

@Component({
  selector: 'app-activation',
  template: '{{ token }}',
})
export class ActivationComponent implements OnInit {
    token : string = '';

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authService: AuthService,
        public dialogService: AppDialogService,
        public snackBar: MdSnackBar) { }

    ngOnInit() {
        
        this.token = this.route.snapshot.queryParams['token'];
        
        this.authService.activation(this.token)
        .then((response: Response) => {
            let user = response.json();
            if (user && user['token']) {
                localStorage.setItem('currentUser', JSON.stringify(user));
                
                this.snackBar.open('你的電郵地址已確認。', 'close', {
                  duration: 3000
                });
                
                this.router.navigate(['/']);
            }
        })
        .catch((error) => {
            this.snackBar.open('驗證碼已過期。', 'close', {
                duration: 3000
            });
            this.router.navigate(['/sessions/confirmation']);
        })
        
    }

    
}