import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from '../../services/auth'; // Sincronizado con tu clase Auth
import { LoginUser } from '../../dto/login-user';
import { NuevoUsuario } from '../../dto/nuevo-usuario';
import { JwtDto } from '../../dto/jwt-dto';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  private authService = inject(Auth); // Inyectamos tu clase Auth
  private router = inject(Router);

  // Variable para la animación del panel deslizante del HTML
  isActive = false; 

  // Objetos para el enlace de datos (ngModel)
  usuarioLogin: LoginUser = {
    username: '',
    password: ''
  };

  usuarioRegistro: NuevoUsuario = {
    username: '',
    email: '',
    password: ''
  };

  errorMessage = '';

  /**
   * Cambia el estado para activar la animación de paneles en el HTML
   */
  togglePanels(): void {
    this.isActive = !this.isActive;
    this.errorMessage = '';
  }

  /**
   * Ejecuta el inicio de sesión
   */
  entrar(): void {
    if (!this.usuarioLogin.username || !this.usuarioLogin.password) {
      this.errorMessage = 'Por favor, ingrese usuario y contraseña';
      return;
    }

    this.authService.login(this.usuarioLogin).subscribe({
      next: (data: JwtDto) => {
        // Guardamos el token usando el método de tu servicio
        this.authService.setToken(data.token);
        
        // Redirigimos al inicio
        this.router.navigate(['/inicio']);
      },
      error: (err) => {
        this.errorMessage = 'Credenciales inválidas. Intente de nuevo.';
        console.error('Error en login:', err);
      }
    });
  }

  /**
   * Ejecuta el registro de un nuevo usuario
   */
  registrarse(): void {
    if (!this.usuarioRegistro.username || !this.usuarioRegistro.email || !this.usuarioRegistro.password) {
      alert('Debe completar todos los campos para el registro');
      return;
    }

    // Usamos el método .nuevo() de tu servicio Auth
    this.authService.nuevo(this.usuarioRegistro).subscribe({
      next: (res) => {
        alert('¡Registro exitoso! Ya puede iniciar sesión.');
        this.isActive = false; // Movemos el panel de vuelta al login
        this.limpiarFormularios();
      },
      error: (err) => {
        this.errorMessage = 'Error al intentar registrar el usuario';
        console.error('Error en registro:', err);
      }
    });
  }

  private limpiarFormularios() {
    this.usuarioLogin = { username: '', password: '' };
    this.usuarioRegistro = { username: '', email: '', password: '' };
    this.errorMessage = '';
  }
}