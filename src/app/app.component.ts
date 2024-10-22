import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { RouterOutlet } from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NavbarComponent } from './componentes/navbar/navbar.component';
import { AdministracionComponent } from './páginas/privado/administracion/administracion.component';
import { HeaderComponent } from './componentes/header/header.component';
import { CreacionComponent } from './páginas/privado/creacion/creacion.component';
import { HomeComponent } from './páginas/público/home/home.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, 
    RouterLink,
    RouterLinkActive,
    CommonModule,
    //Componentes
    NavbarComponent, 
    HeaderComponent, 
    NzIconModule, 
    NzLayoutModule, 
    //Paginas
    //Públicas
    HomeComponent,
    //Privadas
    AdministracionComponent,
    CreacionComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  title = 'aplicacionp3';

  isCollapsed = false; // Estado inicial del sider

  toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;
  }
}
