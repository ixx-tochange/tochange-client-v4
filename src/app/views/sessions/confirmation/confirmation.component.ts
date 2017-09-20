import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MdProgressBar, MdButton, MdSnackBar } from '@angular/material';

import { AuthService } from '../../../services/auth.service';
import { AppDialogService } from '../../../services/app-dialog/app-dialog.service';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent implements OnInit {
    @ViewChild(MdProgressBar) progressBar: MdProgressBar;
    @ViewChild(MdButton) submitButton: MdButton;
    
    model = {
        email: '',
    };

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authService: AuthService,
        public dialogService: AppDialogService,
        public snackBar: MdSnackBar) { }

    ngOnInit() {
        

        
    }
    
    resend() {
        this.authService.resend(this.model.email)
            .then((response: Response) => {
                this.snackBar.open('確認信已發送到您的郵箱！', '登錄', {
                  duration: 5000
                });
                this.router.navigate(['/sessions/login']);
            })
            .catch((error) => {
                this.snackBar.open('電郵地址不正確。', '', {
                  duration: 3000
                });
                this.submitButton.disabled = false;
                this.progressBar.mode = 'determinate';
            })
    }

    
}