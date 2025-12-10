import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Producto {

  // 1. Inyectamos el cliente HTTP para conectar con Java
  private http = inject(HttpClient);
  
  // 2. La URL de tus productos en Spring Boot
  private apiUrl = 'http://localhost:8080/api/productos';

  constructor() { }

  private getHeaders() {
    const token = sessionStorage.getItem('token');
    return {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}` // Enviamos el token en la cabecera
      })
    };
  }

  // 1. LISTAR (Público)
  obtenerTodos(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  // 2. CREAR (Privado - Requiere Token)
  crear(producto: any): Observable<any> {
    return this.http.post(this.apiUrl, producto, this.getHeaders());
  }

  // 3. ACTUALIZAR (Privado - Requiere Token)
  actualizar(id: number, producto: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, producto, this.getHeaders());
  }

  // 4. ELIMINAR (Privado - Requiere Token)
  eliminar(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, this.getHeaders());
  }

}