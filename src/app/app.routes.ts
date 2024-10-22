import { Routes } from '@angular/router';
import { AdministracionComponent } from './páginas/privado/administracion/administracion.component';
import { CreacionComponent } from './páginas/privado/creacion/creacion.component';
import { HomeComponent } from './páginas/público/home/home.component';
import { ErrorComponent } from './páginas/público/error/error.component';
import { AuthGuard } from './servicios/auth.guard';
import { EdicionComponent } from './páginas/privado/edicion/edicion.component';


export const routes: Routes = [
    //Públicas
    { path: '', component: HomeComponent },
    { path: 'error/:code', component: ErrorComponent },
    
    //Privadas
    { path: 'client', component: AdministracionComponent, canActivate: [AuthGuard] },
    { path: 'client/crear', component: CreacionComponent, canActivate: [AuthGuard] },
    { path: 'client/:id/edit', component: EdicionComponent, canActivate: [AuthGuard] },
];