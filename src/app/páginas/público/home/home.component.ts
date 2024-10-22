import { Component, Inject } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { DOCUMENT } from '@angular/common';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NzButtonModule, NzCardModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent {

  isLoggedIn: boolean = false;

  constructor(public auth: AuthService, @Inject(DOCUMENT) public document: Document){
    this.auth.isAuthenticated$.subscribe(authenticated => {
      this.isLoggedIn = authenticated;
    });
  }
  
  logout() {
    this.auth.logout({ 
      logoutParams: {
        returnTo: this.document.location.origin 
      }
    });
  }
  
}
