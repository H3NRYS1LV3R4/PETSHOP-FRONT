import { Component, inject, OnInit, DoCheck } from '@angular/core';
import { Router, RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Auth } from './services/auth'; // Importamos tu servicio Auth

@Component({
  selector: 'app-root',
  standalone: true,
  // Mantenemos estos imports; si sale el aviso NG8113, es un error de caché de Angular
  // pero son necesarios para que los enlaces funcionen.
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit, DoCheck {
  title = 'PETSHOP-FRONT';
  
  private authService = inject(Auth);
  private router = inject(Router);

  isLogged = false;
  esAdmin = false; // Añadimos esta variable para controlar el menú superior

  ngOnInit(): void {
    // Verificación inicial al cargar la app
    this.actualizarEstado();
  }

  // DoCheck detecta cambios en el localStorage (login/logout) al instante
  ngDoCheck(): void {
    this.actualizarEstado();
  }

  actualizarEstado(): void {
    this.isLogged = this.authService.isLogged();
    // Ahora la Navbar también sabe si el usuario es Admin
    this.esAdmin = this.authService.isAdmin();
  }

  onLogout(): void {
    this.authService.logOut();
    this.isLogged = false;
    this.esAdmin = false;
    this.router.navigate(['/login']);
  }
}