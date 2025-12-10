import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Producto {

  private http = inject(HttpClient);
  
  private apiUrl = 'http://localhost:8080/api/productos';

  constructor() { }

  private getHeaders() {
    const auth = sessionStorage.getItem('auth');
    return {
      headers: new HttpHeaders({
        'Authorization': auth || ''
      })
    };
  }

  obtenerTodos(): Observable<any> {
    return this.http.get(this.apiUrl, this.getHeaders());
  }

  crear(producto: any): Observable<any> {
    return this.http.post(this.apiUrl, producto, this.getHeaders());
  }

  actualizar(id: number, producto: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, producto, this.getHeaders());
  }

  eliminar(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, this.getHeaders());
  }

}