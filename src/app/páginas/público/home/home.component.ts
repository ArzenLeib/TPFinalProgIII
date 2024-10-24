import { Component, Inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { CommonModule, DOCUMENT } from '@angular/common';
import { AuthService } from '@auth0/auth0-angular';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NzButtonModule, NzCardModule, CommonModule, RouterLink, NzSpinModule, NzIconModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  isLoggedIn: boolean = false;
  isLoading: boolean = true;

  constructor(public auth: AuthService, @Inject(DOCUMENT) public document: Document) {
    this.auth.isAuthenticated$.subscribe(authenticated => {
      this.isLoggedIn = authenticated;
      this.isLoading = false;
    });
  }

  logout() {
    this.auth.logout({ 
      logoutParams: {
        returnTo: environment.baseUrl
      }
    });
  }
}
