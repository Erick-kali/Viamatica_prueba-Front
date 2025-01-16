import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Usuarios } from '../../interfaces/usuarios.interface';
import { Rol } from '../../interfaces/rol.interface';
import { Catalogo } from '../../interfaces/catalogo.interface';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  usuarios: Usuarios[] = [];
  dataSource!: MatTableDataSource<Usuarios>;
  form: FormGroup;
  editMode: boolean = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  roles: Rol[] = [];
  estados: Catalogo[] = [];

  displayedColumns: string[] = [
    'id_usuario',
    'nombres',
    'apellidos',
    'email',
    'cedula',
    'id_rol',
    'id_estado',
    'numero_intento',
    'acciones'
  ];

  intentosList: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  constructor(
    private authService: AuthService,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      id_usuario: [null],  // Mantener el campo para manejar el id
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      cedula: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]], // Validación para cédula
      contrasena: ['', [Validators.required, Validators.minLength(6)]], // Validación para contraseña
      id_rol: [1, Validators.required],  // Valor predeterminado de rol
      id_estado: [1, Validators.required], // Valor predeterminado de estado
      numero_intento: [1, Validators.required], // Valor predeterminado de intentos
      usuario_creacion: [''], // Agregar campo para usuario de creación
      fecha_creacion: [new Date()], // Fecha de creación por defecto
      usuario_modificacion: [''], // Agregar campo para usuario de modificación
      fecha_modificacion: [null], // Fecha de modificación
      usuario_eliminacion: [''], // Agregar campo para usuario de eliminación
      fecha_eliminacion: [null] // Fecha de eliminación
    });
  }

  ngOnInit(): void {
    this.cargarUsuarios();
    this.cargarRoles();
    this.cargarEstados();
  }

  cargarUsuarios(): void {
    this.authService.obtenerUsuarios().subscribe({
      next: (usuarios: Usuarios[]) => {
        this.usuarios = usuarios;
        this.dataSource = new MatTableDataSource(this.usuarios);
        this.dataSource.paginator = this.paginator;
      },
      error: (err: any) => console.error('Error al cargar usuarios:', err)
    });
  }

  cargarRoles(): void {
    this.authService.obtenerRoles().subscribe({
      next: (roles: Rol[]) => {
        this.roles = roles;
      },
      error: (err: any) => console.error('Error al cargar roles:', err)
    });
  }

  cargarEstados(): void {
    this.authService.obtenerCatalogo().subscribe({
      next: (estados: Catalogo[]) => {
        this.estados = estados;
      },
      error: (err: any) => console.error('Error al cargar estados:', err)
    });
  }

  obtenerEstado(idEstado: number): string {
    const estado = this.estados.find(estado => estado.id_catalogo === idEstado);
    return estado ? estado.tipo_catalogo : 'Desconocido';
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  guardarUsuario(): void {
    if (this.form.valid) {
      const usuario = { ...this.form.value };

      if (this.editMode) {
        // Si está en modo de edición, se envía el id_usuario para la actualización
        this.authService.actualizarUsuario(usuario).subscribe({
          next: () => {
            this.cargarUsuarios();  // Recargar usuarios después de la actualización
            this.cancelarEdicion();  // Cancelar modo de edición
          },
          error: (err: any) => {
            console.error('Error al actualizar usuario:', err);
            alert('Hubo un error al actualizar el usuario.');
          }
        });
      } else {
        // Si está creando un usuario, se elimina el id_usuario antes de enviar
        delete usuario.id_usuario;
        usuario.usuario_creacion = 'admin'; // Asignar un valor predeterminado o valor desde sesión
        usuario.fecha_creacion = new Date().toISOString();
        this.authService.crearUsuario(usuario).subscribe({
          next: () => {
            this.cargarUsuarios();  // Recargar usuarios después de la creación
            this.form.reset({ id_rol: 1, id_estado: 1, numero_intento: 1 });  // Resetear formulario
          },
          error: (err: any) => {
            console.error('Error al crear usuario:', err);
            alert('Hubo un error al crear el usuario.');
          }
        });
      }
    } else {
      alert('Por favor, complete todos los campos requeridos.');
    }
  }

  editarUsuario(usuario: Usuarios): void {
    this.form.patchValue(usuario);  // Rellenar formulario con datos del usuario a editar
    this.editMode = true;  // Activar modo de edición
  }

  eliminarUsuario(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
      this.authService.eliminarUsuario(id).subscribe({
        next: () => {
          this.cargarUsuarios();  // Recargar usuarios después de la eliminación
        },
        error: (err: any) => {
          console.error('Error al eliminar usuario:', err);
          alert('Hubo un error al eliminar el usuario.');
        }
      });
    }
  }

  cancelarEdicion(): void {
    this.editMode = false;  // Desactivar modo de edición
    this.form.reset({ id_rol: 1, id_estado: 1, numero_intento: 1 });  // Resetear formulario
  }
}
