import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';

@Injectable({
    providedIn: 'root'
})

export class AuthGuard {
  
  constructor(private router: Router, private authService : AuthService) { }

  canActivate() {
    this.authService.isAuthenticated$.subscribe( login =>{
      console.log(login);
    
        if(!login) this.router.navigate(['./error/403']);
      })
    return true;
  }
}