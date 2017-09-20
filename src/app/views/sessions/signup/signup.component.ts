import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MdProgressBar, MdButton, MdSnackBar } from '@angular/material';

import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  @ViewChild(MdProgressBar) progressBar: MdProgressBar;
  @ViewChild(MdButton) submitButton: MdButton;
  
  model = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    isAgreed: ''
  };

  constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authService: AuthService,
        public snackBar: MdSnackBar) {}

  ngOnInit() {
  }

  signup() {
    this.authService.register(this.model.name, this.model.email, this.model.password)
        .then((response: Response) => {
            this.snackBar.open('確認信已發送到您的郵箱！', 'close', {
              duration: 5000
            });
            this.router.navigate(['/sessions/login']);
        })
        .catch((error) => {
            this.snackBar.open('暫時無法註冊用戶', 'close', {
              duration: 3000
            });
            this.submitButton.disabled = false;
            this.progressBar.mode = 'determinate';
        })
  }

}
