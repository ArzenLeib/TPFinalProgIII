import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { FormsModule } from '@angular/forms';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { environment } from '../../../../environments/environment';

interface DataItem {
  _id: string;       
  nombre: string;
  email: string;
  telefono: string;
  fechaNacimiento: Date;
  nickname: string;
  direccion: string;
  habilitado: boolean;
}

@Component({
  selector: 'app-administracion',
  standalone: true,
  imports: [CommonModule, FormsModule, NzMenuModule, NzButtonModule , NzBreadCrumbModule, NzLayoutModule, NzIconModule, NzTableModule, NzPaginationModule, NzSelectModule, NzToolTipModule],
  templateUrl: './administracion.component.html',
  styleUrl: './administracion.component.css'
})
export class AdministracionComponent {

  isLoading: boolean = true;

    listOfColumn = [
      {
        title: 'Nombre',
        compare: (a: DataItem, b: DataItem) => a.nombre.localeCompare(b.nombre),
        priority: false
      },
      {
        title: 'Email',
        compare: (a: DataItem, b: DataItem) => a.email.localeCompare(b.email),
        priority: 1
      },
      {
        title: 'Teléfono',
        compare: (a: DataItem, b: DataItem) => a.telefono.localeCompare(b.telefono),
        priority: 2
      },
      {
        title: 'Fecha de Nacimiento',
        compare: (a: DataItem, b: DataItem) => new Date(a.fechaNacimiento).getTime() - new Date(b.fechaNacimiento).getTime(),
        priority: 3
      },
      {
        title: 'Nickname',
        compare: (a: DataItem, b: DataItem) => a.nickname.localeCompare(b.nickname),
        priority: 4
      },
      {
        title: 'Dirección',
        compare: (a: DataItem, b: DataItem) => a.direccion.localeCompare(b.direccion),
        priority: 5
      },
      {
        title: 'Estado',
        compare: (a: DataItem, b: DataItem) => a.habilitado === b.habilitado ? 0 : a.habilitado ? -1 : 1,
        priority: 6
      },
  ];

  listOfData: DataItem[] = [];
  filteredData: DataItem[] = [];
  filterStatus: string = 'all';
  total: number = 0;
  page: number = 1; // Para que la tabla arranque en uno
  limit: number = 4; // La cantidad de filas que se puede ver por página

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.loadClientes();
  }

  loadClientes() {
    this.isLoading = true;
    const cacheBuster = new Date().getTime();
    this.http.get(`${environment.apiUrl}/api/clientes?page=${this.page}&limit=${this.limit}&_=${cacheBuster}`).subscribe((data: any) => {
      console.log('Datos obtenidos:', data);
      this.total = data.length;
      this.listOfData = data;
      this.aplicarFiltro();
      this.isLoading = false;
    });
  }

  aplicarFiltro() {
    if (this.filterStatus === 'enabled') {
      this.filteredData = this.listOfData.filter(item => item.habilitado);
    } else if (this.filterStatus === 'disabled') {
      this.filteredData = this.listOfData.filter(item => !item.habilitado);
    } else {
      this.filteredData = this.listOfData;
    }
  }

  onEdit(data: DataItem) {
    console.log('Editando:', data);
    this.router.navigate([`/client/${data._id}/edit`]);
  }

  onToggleStatus(data: DataItem) {
    const newStatus = !data.habilitado;

    this.http.put(`${environment.apiUrl}/api/cliente/estado/${data._id}`, { habilitado: newStatus })
      .subscribe(
        (response) => {
          data.habilitado = newStatus;
          console.log(data.nombre, newStatus ? 'Habilitado' : 'Deshabilitado');
          this.aplicarFiltro();
        },
        (error) => {
          console.error('Error al actualizar el estado:', error);
        }
      );
  }

  onPageChange(page: number) {
    this.page = page;
    this.loadClientes(); // Cargar nuevos clientes según la página
  }
}
