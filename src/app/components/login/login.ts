import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Para leer los inputs
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth'; // Importación correcta

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule], // Importamos módulos necesarios
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

  // 2. NUEVO: Datos para REGISTRO
  usuarioRegistro = {
    username: '',
    email: '',
    password: '',
    roles: ['user'] // Enviamos rol de usuario por defecto
  };

  // FUNCIÓN PARA CAMBIAR ENTRE PANELES
  togglePanels() {
    this.isActive = !this.isActive;
  }

  entrar() {
    console.log("Enviando:", this.usuarioLogin);

    this.authService.login(this.usuarioLogin).subscribe({
      next: (respuesta: any) => {
        console.log('Login OK:', respuesta);
        sessionStorage.setItem('token', respuesta.token);
        sessionStorage.setItem('roles', JSON.stringify(respuesta.roles)); 
        sessionStorage.setItem('username', respuesta.username);

        this.router.navigate(['/inicio']); // Redirigir
      },
      error: (error: any) => {
        console.error('Error:', error);
        alert('Error: Usuario o contraseña incorrectos');
      }
    });
  }

  registrarse() {
    console.log("Enviando registro:", this.usuarioRegistro);
    
    this.authService.registro(this.usuarioRegistro).subscribe({
      next: (respuesta: any) => {
        alert("¡Cuenta creada con éxito! Ahora inicia sesión.");
        this.togglePanels(); // Movemos el panel para que haga Login
      },
      error: (error: any) => {
        console.error(error);
        alert("Error al registrarse. El usuario o email ya existen.");
      }
    });
  }
}