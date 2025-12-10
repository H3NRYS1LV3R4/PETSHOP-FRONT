import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  private authService = inject(AuthService);
  private router = inject(Router);

  isActive = false;

  usuarioLogin = {
    username: '',
    password: ''
  };

  usuarioRegistro = {
    username: '',
    email: '',
    password: ''
  };

  togglePanels() {
    this.isActive = !this.isActive;
  }

  entrar() {
    const credenciales = btoa(this.usuarioLogin.username + ':' + this.usuarioLogin.password);
    const basicAuth = 'Basic ' + credenciales;

    sessionStorage.setItem('auth', basicAuth);
    sessionStorage.setItem('username', this.usuarioLogin.username);
    
    this.router.navigate(['/admin-productos']);
  }

  registrarse() {
    this.authService.registro(this.usuarioRegistro).subscribe({
      next: (respuesta: any) => {
        alert("¡Cuenta creada con éxito! Ahora inicia sesión.");
        this.togglePanels();
      },
      error: (error: any) => {
        console.error(error);
        alert("Error al registrarse. Verifica los datos.");
      }
    });
  }
}