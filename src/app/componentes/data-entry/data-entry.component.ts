import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  ReactiveFormsModule,
  AbstractControl,
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  Validators
} from '@angular/forms';
import { NzModalService, NzModalModule  } from 'ng-zorro-antd/modal';
import { ActivatedRoute, Router } from '@angular/router';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzFormTooltipIcon } from 'ng-zorro-antd/form';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { environment } from '../../../enviroments/enviroment';

@Component({
  selector: 'app-data-entry',
  standalone: true,
  imports: [ReactiveFormsModule, NzFormModule, NzInputModule, NzSelectModule, NzDatePickerModule, NzModalModule, NzButtonModule],
  templateUrl: './data-entry.component.html',
  styleUrl: './data-entry.component.css'
})
export class DataEntryComponent {
  isLoading = false;
  isEditMode = false;
  clienteId: string | null = null;

  captchaTooltipIcon: NzFormTooltipIcon = {
    type: 'info-circle',
    theme: 'twotone'
  };
  
  validateForm: FormGroup<{
    nombre: FormControl<string>;
    email: FormControl<string>;
    telefono: FormControl<string>;
    fechaNacimiento: FormControl<Date | null>;
    nickname: FormControl<string>;
    direccion: FormControl<string>;
  }>;

  constructor(private fb: NonNullableFormBuilder, private http: HttpClient, private modal: NzModalService, private route: ActivatedRoute,
    private router: Router) {
    this.validateForm = this.fb.group({
      nombre: ['', [Validators.required]],
      email: ['', [Validators.email, Validators.required]],
      telefono: ['', [Validators.required]],
      fechaNacimiento: [null as Date | null, [Validators.required]],
      nickname: ['', [Validators.required]],
      direccion: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.clienteId = params.get('id');
      this.isEditMode = !!this.clienteId;

      if (this.isEditMode) {
        this.loadClienteData(this.clienteId!);
      }
    });
  }

  loadClienteData(id: string): void {
    this.http.get(`${environment.apiUrl}/api/clientes/${id}`).subscribe((cliente: any) => {
      this.validateForm.patchValue({
        nombre: cliente.nombre,
        email: cliente.email,
        telefono: cliente.telefono,
        fechaNacimiento: new Date(cliente.fechaNacimiento),
        nickname: cliente.nickname,
        direccion: cliente.direccion
      });
    });
  }

  submitForm(): void {
    console.log('Estado de validación:', this.validateForm.valid);
    console.log('Valores del formulario:', this.validateForm.value);

    if (this.validateForm.valid) {
      this.isLoading = true;
      const formData = this.validateForm.value;
      if (this.isEditMode) {
        // Modo edición: Actualiza el cliente existente
        this.http.put(`${environment.apiUrl}/api/clientes/${this.clienteId}`, formData).subscribe(
          (response) => {
            console.log('Cliente actualizado:', response);
            this.showSuccessModal('Cliente actualizado correctamente');
            this.isLoading = false;
          },
          (error) => {
            console.error('Error al actualizar el cliente:', error);
            this.isLoading = false;
          }
        );
      } else {
        // Modo creación: Crea un nuevo cliente
        this.http.post( `${environment.apiUrl}/api/clientes`, formData).subscribe(
          (response) => {
            console.log('Cliente registrado:', response);
            this.showSuccessModal('Cliente creado correctamente');
            this.isLoading = false;
          },
          (error) => {
            console.error('Error al registrar el cliente:', error);
            this.isLoading = false;
          }
        );
      }
    } else {
      // Si el formulario no es válido, marca todos los campos como "touched" para mostrar los errores
      Object.values(this.validateForm.controls).forEach(control => {
        
        console.log('Formulario inválido:', this.validateForm.errors);
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  showSuccessModal(message: string): void {
    this.modal.success({
      nzTitle: 'Operación exitosa',
      nzContent: message,
      nzOnOk: () => console.log('Modal cerrado'),
    });
  }
}

