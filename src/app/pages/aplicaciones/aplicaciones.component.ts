import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CatalogosService } from '../services/catalogos.service'; // Importa el servicio de catalogos
import { AplicacionesService } from '../services/aplicaciones.service'; // Importa el servicio de aplicaciones
import { AplicacionInterface } from '../../interfaces/aplicacion.interface'; // Importa la interfaz de aplicación

interface Estado {
  id_catalogo: number;
  tipo_catalogo: string;
}

@Component({
  selector: 'app-aplicaciones',
  templateUrl: './aplicaciones.component.html',
  styleUrls: ['./aplicaciones.component.css']
})
export class AplicacionesComponent implements OnInit {
  form: FormGroup;
  editMode = false;
  estados: Estado[] = [];
  aplicaciones: AplicacionInterface[] = [];
  displayedColumns: string[] = ['id_aplicacion', 'nombre_aplicacion', 'descripcion', 'url', 'id_estado', 'acciones'];

  constructor(
    private fb: FormBuilder,
    private catalogosService: CatalogosService,
    private aplicacionesService: AplicacionesService // Inyecta el servicio de aplicaciones
  ) {
    this.form = this.fb.group({
      id_aplicacion: [''],
      nombre_aplicacion: ['', Validators.required],
      descripcion: ['', Validators.required],
      url: ['', Validators.required],
      id_estado: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    // Obtener los catalogos
    this.catalogosService.getCatalogos().subscribe((data) => {
      this.estados = data;
    });

    // Obtener las aplicaciones
    this.getAplicaciones();
  }

  // Obtener todas las aplicaciones
  getAplicaciones(): void {
    this.aplicacionesService.getAplicaciones().subscribe((data) => {
      this.aplicaciones = data;
    });
  }

  // Guardar o actualizar una aplicación
  guardarAplicacion(): void {
    if (this.form.valid) {
      const aplicacion: AplicacionInterface = this.form.value;
      if (this.editMode) {
        // Actualizar una aplicación
        this.aplicacionesService.updateAplicacion(aplicacion.id_aplicacion, aplicacion).subscribe(() => {
          this.getAplicaciones(); // Refrescar la lista
          this.cancelarEdicion();
        });
      } else {
        // Crear una nueva aplicación
        this.aplicacionesService.createAplicacion(aplicacion).subscribe(() => {
          this.getAplicaciones(); // Refrescar la lista
          this.form.reset(); // Resetear el formulario
        });
      }
    }
  }

  // Filtrar aplicaciones
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.aplicaciones = this.aplicaciones.filter(aplicacion => 
      aplicacion.nombre_aplicacion.toLowerCase().includes(filterValue.toLowerCase()));
  }

  // Editar una aplicación
  editarAplicacion(aplicacion: AplicacionInterface): void {
    this.editMode = true;
    this.form.setValue({
      id_aplicacion: aplicacion.id_aplicacion,
      nombre_aplicacion: aplicacion.nombre_aplicacion,
      descripcion: aplicacion.descripcion,
      url: aplicacion.url,
      id_estado: aplicacion.id_estado,
    });
  }

  // Cancelar la edición y resetear el formulario
  cancelarEdicion(): void {
    this.editMode = false;
    this.form.reset();
  }

  // Eliminar una aplicación
  eliminarAplicacion(id_aplicacion: number): void {
    if (confirm('¿Estás seguro de eliminar esta aplicación?')) {
      this.aplicacionesService.deleteAplicacion(id_aplicacion).subscribe(() => {
        this.getAplicaciones(); // Refrescar la lista
      });
    }
  }
}
