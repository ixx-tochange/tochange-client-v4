import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {
  public authToken;
  private isAuthenticated = true; // Set this value dynamically
  
  constructor(private router: Router) { }
  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (localStorage.getItem('currentUser')) {
        // logged in so return true
        return true;
    }
    
    this.router.navigate(['/sessions/signin'], { queryParams: { returnUrl: state.url }});
    return false;
  }
}