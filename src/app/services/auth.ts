import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginUser } from '../dto/login-user';
import { NuevoUsuario } from '../dto/nuevo-usuario';
import { JwtDto } from '../dto/jwt-dto';

@Injectable({
  providedIn: 'root'
})
export class Auth {

  private http = inject(HttpClient);
  private authURL = 'http://localhost:8080/auth/'; 

  public nuevo(nuevoUsuario: NuevoUsuario): Observable<any> {
    return this.http.post<any>(this.authURL + 'registro', nuevoUsuario);
  }

  public login(loginUser: LoginUser): Observable<JwtDto> {
    return this.http.post<JwtDto>(this.authURL + 'login', loginUser);
  }

  public setToken(token: string): void {
    localStorage.removeItem('token');
    localStorage.setItem('token', token);
  }

  public getToken(): string | null {
    return localStorage.getItem('token');
  }

  public isLogged(): boolean {
    return this.getToken() != null;
  }

  /**
   * Extrae el nombre de usuario (subject) del payload del token.
   */
  public getUsername(): string {
    const token = this.getToken();
    if (!token) return '';

    try {
      const payload = token.split('.')[1];
      const decodedPayload = JSON.parse(atob(payload));
      return decodedPayload.sub || ''; 
    } catch (error) {
      return '';
    }
  }

  public isAdmin(): boolean {
    const token = this.getToken();
    if (!token) return false;

    try {
      const payload = token.split('.')[1];
      const decodedPayload = JSON.parse(atob(payload));
      
      // Buscamos 'ADMIN' en la lista de roles
      const roles = decodedPayload.roles || [];
      return roles.includes('ADMIN'); 
    } catch (error) {
      return false;
    }
  }

  public logOut(): void {
    localStorage.clear();
  }
}