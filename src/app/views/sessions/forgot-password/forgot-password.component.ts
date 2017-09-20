import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MdProgressBar, MdButton, MdSnackBar } from '@angular/material';

import { AuthService } from '../../../services/auth.service';
import { AppDialogService } from '../../../services/app-dialog/app-dialog.service';


@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
    @ViewChild(MdProgressBar) progressBar: MdProgressBar;
    @ViewChild(MdButton) submitButton: MdButton;

    model = {
        email: '',
    }

    constructor(private route: ActivatedRoute,
        private router: Router,
        private authService: AuthService,
        public dialogService: AppDialogService,
        public snackBar: MdSnackBar) { }

    ngOnInit() {
    }
    
    resetPassword() {
        this.submitButton.disabled = true;
        this.progressBar.mode = 'indeterminate';
        
        this.authService.forgot(this.model.email)
            .then((response: Response) => {
                this.snackBar.open('重設密碼的郵件已寄出', 'close', {
                    duration: 3000
                });
                this.router.navigate(['/sessions/login']);
            })
            .catch((error) => {
                this.snackBar.open('無法重設密碼的用戶', 'close', {
                    duration: 3000
                });
                this.submitButton.disabled = false;
                this.progressBar.mode = 'determinate';
            })
    }
}
