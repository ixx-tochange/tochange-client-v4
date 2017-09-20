import { Routes } from '@angular/router';

import { ActivationComponent } from './activation/activation.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { LockscreenComponent } from './lockscreen/lockscreen.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';

export const SessionsRoutes: Routes = [
  {
    path: '',
    children: [{
      path: 'signup',
      component: SignupComponent,
      data: { title: 'Signup' }
    }, {
      path: 'signin',
      component: SigninComponent,
      data: { title: 'Signin' }
    }, {
      path: 'forgot-password',
      component: ForgotPasswordComponent,
      data: { title: 'Forgot password' }
    }, {
      path: 'lockscreen',
      component: LockscreenComponent,
      data: { title: 'Lockscreen' }
    }, {
      path: 'activation',
      component: ActivationComponent,
      data: { title: 'Activation' }
    }, {
      path: 'confirmation',
      component: ConfirmationComponent,
      data: { title: 'Confirmation' }
    }, {
      path: 'reset-password',
      component: ResetPasswordComponent,
      data: { title: 'Reset password' }
    }]
  }
];