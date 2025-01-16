import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CatalogosService {
  private apiUrl = 'http://localhost:8000/api/catalogos';  // La URL de tu API

  constructor(private http: HttpClient) {}

  // Método para obtener todos los catalogos
  getCatalogos(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
