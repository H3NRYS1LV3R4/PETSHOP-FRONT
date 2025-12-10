import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private http = inject(HttpClient);
  private baseUrl = 'http://localhost:8080/auth'; // Tu Spring Boot

  constructor() { }

  login(datos: any) {
    // El return es OBLIGATORIO para que funcione el subscribe
    return this.http.post(`${this.baseUrl}/login`, datos);
  }

  registro(datos: any) {
    // Envía los datos a http://localhost:8080/auth/registro
    return this.http.post(`${this.baseUrl}/registro`, datos, { responseType: 'text' });
  }
}