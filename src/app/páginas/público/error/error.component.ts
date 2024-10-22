import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { NzExceptionStatusType, NzResultModule } from 'ng-zorro-antd/result';
import { NzButtonModule } from 'ng-zorro-antd/button';

@Component({
  selector: 'app-error',
  standalone: true,
  imports: [NzResultModule,NzButtonModule],
  templateUrl: './error.component.html',
  styleUrl: './error.component.css'
})

export class ErrorComponent {
  code: NzExceptionStatusType = '500';
  title = ""
  message = ""
  constructor(
    private route: ActivatedRoute,
    private auth: AuthService, 
    private router: Router) {
    
    switch (this.route.snapshot.paramMap.get('code')) {
      case "404":
        this.code = '404'
        this.title = '404'
        this.message = "No se encontro el recurso"
        break;
      case "500":
        this.code = '500'
        this.title = '500'
        this.message = "Ocurrió un problema en el servidor"
        break;
      case "403":
        this.code = '403'
        this.title = '403'
        this.message = "No esta autorizado a acceder al recurso"
        break;
      default:
        this.code = '500'
        this.title = "Ocurrio un problema"
        this.message = "Error desconocido"
    }
  }

  home() {
    this.router.navigate(['./']);
  }
}