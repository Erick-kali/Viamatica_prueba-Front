import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsuariosComponent } from './Usuarios/Usuarios.Component';
import { AplicacionesComponent } from './aplicaciones/aplicaciones.component';
import { authGuard } from '../guards/auth.guard';
import { LicenciaComponent } from './licencia/licencia.component';

const routes: Routes = [

  {path:'dashboard', component:PagesComponent, canActivate:[authGuard],

  children:[

    {path:'', component:DashboardComponent, data:{titulo:'Administracion'}},
    {path:'Usuarios', component:UsuariosComponent, data:{titulo:'Usuarios'}},
    {path:'aplicaciones', component:AplicacionesComponent, data:{titulo:'Aplicacion'}},
    {path:'licencia', component:LicenciaComponent, data:{titulo:'Licencias'}}


  ]
 }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
