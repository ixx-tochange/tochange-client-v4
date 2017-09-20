import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MdProgressBar, MdButton, MdSnackBar } from '@angular/material';

import { AuthService } from '../../../services/auth.service';
import { AppDialogService } from '../../../services/app-dialog/app-dialog.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  @ViewChild(MdProgressBar) progressBar: MdProgressBar;
  @ViewChild(MdButton) submitButton: MdButton;

  model = {
    email: '',
    password: ''
  }
  returnUrl: string;
  
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authService: AuthService,
        public dialogService: AppDialogService,
        public snackBar: MdSnackBar) { }

    ngOnInit() {
        // reset login status
        this.authService.logout();

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
        
        // get email from route parameters
        this.model.email = this.route.snapshot.queryParams['email'] || '';
    }

    signin() {
        this.submitButton.disabled = true;
        this.progressBar.mode = 'indeterminate';
        
        this.authService.login(this.model.email, this.model.password)
            .then((response: Response) => {
                let user = response.json();
                if (user && user['token']) {
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    
                    this.router.navigate([this.returnUrl]);
                }
            })
            .catch((error) => {
                if(error.status==401){
                    this.dialogService.alert('登入失敗', '電郵地址或密碼不正確。');
                }else if(error.status==417){
                    this.dialogService.alert('登入失敗', '你的電郵地址尚未確認，請檢查你的電子郵箱！');
                }else if(error.status==419){
                    this.dialogService.alert('系統升級', '由於系統升級關係，我們已把新密碼寄到您登記的電子郵箱。');
                }else if(error.status==424){
                    this.snackBar.open('系統繁忙，請稍後再試。(424)', 'close', {
                      duration: 3000
                    });
                }else{
                    this.snackBar.open('系統繁忙，請稍後再試。(' + error.status + ')', 'close', {
                      duration: 3000
                    });
                }
                this.submitButton.disabled = false;
                this.progressBar.mode = 'determinate';
            })
                    
            
    }
    
}