import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import{MatTableModule} from '@angular/material/table';
import{MatFormFieldModule} from '@angular/material/form-field';
import{MatButtonModule} from '@angular/material/button';
import{MatInputModule} from '@angular/material/input';
import{MatPaginatorModule} from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';




import { PagesRoutingModule } from './pages-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component'; // agregalo aqui componente y ruta
import { UsuariosComponent } from './Usuarios/Usuarios.Component';
import { AplicacionesComponent } from './aplicaciones/aplicaciones.component';
import { PagesComponent } from './pages.component';
import { SharedModule } from '../shared/shared.module';
import { LicenciaComponent } from './licencia/licencia.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';


@NgModule({
  declarations: [
    DashboardComponent,
    UsuariosComponent,
    AplicacionesComponent,
    PagesComponent,
    LicenciaComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    MatTableModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatPaginatorModule,
    MatCardModule,
    MatSelectModule,  // Asegúrate de agregarlo aquí
    MatOptionModule
  ]
})
export class PagesModule { }
