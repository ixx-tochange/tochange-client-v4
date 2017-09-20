import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MdSnackBar } from '@angular/material';

import { AuthService } from '../../../services/auth.service';
import { AppDialogService } from '../../../services/app-dialog/app-dialog.service';

@Component({
  selector: 'app-reset-password',
  template: '{{ token }}',
})
export class ResetPasswordComponent implements OnInit {
    token : string = '';

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authService: AuthService,
        public dialogService: AppDialogService,
        public snackBar: MdSnackBar) { }

    
    ngOnInit() {
        this.token = this.route.snapshot.queryParams['reset_password_token'];
        
        this.authService.reset(this.token)
            .then((response: Response) => {
                this.snackBar.open('新的密碼已發送到您的郵箱！', 'close', {
                  duration: 3000
                });
                
                this.router.navigate(['/sessions/signin']);
            })
        .catch((error) => {
            this.snackBar.open('連結失效，請重試一次！', 'close', {
                duration: 3000
            });
            this.router.navigate(['/sessions/forgot-password']);
        })
        
    }

    
}