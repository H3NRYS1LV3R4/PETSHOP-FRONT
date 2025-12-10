import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private http = inject(HttpClient);
  private baseUrl = 'http://localhost:8080/auth'; 

  constructor() { }

  registro(datos: any) {
    return this.http.post(`${this.baseUrl}/registro`, datos, { responseType: 'text' });
  }
}