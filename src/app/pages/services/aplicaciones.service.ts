import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AplicacionInterface } from '../../interfaces/aplicacion.interface'; // Importar la interfaz de Aplicación

@Injectable({
  providedIn: 'root'
})
export class AplicacionesService {

  private apiUrl = 'http://127.0.0.1:8000/api/aplicaciones'; // URL base de la API de Laravel

  constructor(private http: HttpClient) {}

  // Obtener todas las aplicaciones
  getAplicaciones(): Observable<AplicacionInterface[]> {
    return this.http.get<AplicacionInterface[]>(this.apiUrl);
  }

  // Obtener una aplicación por su ID
  getAplicacion(id: number): Observable<AplicacionInterface> {
    return this.http.get<AplicacionInterface>(`${this.apiUrl}/${id}`);
  }

  // Crear una nueva aplicación
  createAplicacion(aplicacion: AplicacionInterface): Observable<AplicacionInterface> {
    return this.http.post<AplicacionInterface>(this.apiUrl, aplicacion);
  }

  // Actualizar una aplicación
  updateAplicacion(id: number, aplicacion: AplicacionInterface): Observable<AplicacionInterface> {
    return this.http.put<AplicacionInterface>(`${this.apiUrl}/${id}`, aplicacion);
  }

  // Eliminar una aplicación
  deleteAplicacion(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
