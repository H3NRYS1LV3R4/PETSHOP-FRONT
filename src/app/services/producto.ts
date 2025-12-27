import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Productos } from '../dto/productos'; // Importamos el DTO que creaste

@Injectable({
  providedIn: 'root'
})
export class Producto {

  // URL de la API (ajustada al puerto 8080 del backend)
  productoURL = 'http://localhost:8080/api/productos';

  constructor(private httpClient: HttpClient) { }

  /**
   * Obtiene la lista de todos los productos.
   * El interceptor se encargará de agregar el token JWT automáticamente.
   */
  public lista(): Observable<Productos[]> {
    return this.httpClient.get<Productos[]>(this.productoURL);
  }

  /**
   * Obtiene un producto por su ID.
   */
  public detalle(id: number): Observable<Productos> {
    return this.httpClient.get<Productos>(`${this.productoURL}/${id}`);
  }

  /**
   * Crea un nuevo producto.
   */
  public save(producto: Productos): Observable<any> {
    return this.httpClient.post<any>(this.productoURL, producto);
  }

  /**
   * Actualiza un producto existente.
   */
  public update(id: number, producto: Productos): Observable<any> {
    return this.httpClient.put<any>(`${this.productoURL}/${id}`, producto);
  }

  /**
   * Elimina un producto por su ID.
   */
  public delete(id: number): Observable<any> {
    return this.httpClient.delete<any>(`${this.productoURL}/${id}`);
  }
}