import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { AuthService } from '@auth0/auth0-angular';
import { HttpClient } from '@angular/common/http';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [NzMenuModule, NzButtonModule , NzBreadCrumbModule, NzLayoutModule, NzIconModule, RouterLink , RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  isCollapsed = false;

  constructor(private http: HttpClient){}

  exportarPDF() {
    this.http.get(`${environment.apiUrl}/api/clientes` ).subscribe((data: any) => {

      const doc = new jsPDF();
      
      const fechaActual = new Date();
    
      const fechaFormateada = `${fechaActual.getDate().toString().padStart(2, '0')}-${
      (fechaActual.getMonth() + 1).toString().padStart(2, '0')
      }-${fechaActual.getFullYear()}`;

      doc.setFontSize(18);
      doc.text(`Reporte de Clientes`, 14, 20);

      doc.setFontSize(12);
      doc.text(`Fecha ${fechaFormateada}`, 14, 40);

      const columns = [
        { header: 'Nombre', dataKey: 'nombre' },
        { header: 'Email', dataKey: 'email' },
        { header: 'Teléfono', dataKey: 'telefono' },
        { header: 'Dirección', dataKey: 'direccion' },
      ];

      const rows = data.map((cliente: any) => ({
        nombre: cliente.nombre,
        email: cliente.email,
        telefono: cliente.telefono,
        direccion: cliente.direccion,
      }));
      
      autoTable(doc, {
        columns: columns,
        body: rows,
        startY: 50,
        theme: 'grid', 
      });

      doc.save(`Reporte Clientes ${fechaFormateada}.pdf`);
    })
  }
}
