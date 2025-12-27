import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from '../../services/auth'; // Sincronizado con tu nombre de archivo y clase
import { NuevoUsuario } from '../../dto/nuevo-usuario';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './registro.html',
  styleUrl: './registro.css'
})
export class Registro {

  private authService = inject(Auth); // Inyectamos la clase Auth tal como la tienes
  private router = inject(Router);

  username = '';
  email = '';
  password = '';
  
  errorMessage = '';
  successMessage = '';

  onRegistro(): void {
    const nuevoUsuario: NuevoUsuario = {
      username: this.username,
      email: this.email,
      password: this.password
    };

    // Usamos el método .nuevo() de tu servicio Auth
    this.authService.nuevo(nuevoUsuario).subscribe({
      next: (data) => {
        this.successMessage = 'Usuario registrado con éxito. Redirigiendo...';
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      },
      error: (err) => {
        this.errorMessage = 'No se pudo completar el registro. Intente con otro usuario o email.';
        console.error('Error en registro:', err);
      }
    });
  }

  volver(): void {
    this.router.navigate(['/login']);
  }
}