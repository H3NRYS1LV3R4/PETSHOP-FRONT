import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Producto } from '../../services/producto'; // Importamos la clase Producto
import { Auth } from '../../services/auth'; // Tu servicio Auth
import { Router } from '@angular/router';
import { Productos as ProductoDto } from '../../dto/productos'; // Usamos el DTO de productos

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './inicio.html',
  styleUrl: './inicio.css'
})
export class Inicio implements OnInit {
  // Inyectamos la clase 'Producto' tal como la nombraste
  private productoService = inject(Producto); 
  private authService = inject(Auth);
  private router = inject(Router);
  nombreUsuario: string = '';

  productos: ProductoDto[] = [];
  
  // Variables de control de vista
  isLogged = false;
  esAdmin = false; 

  ngOnInit(): void {
    this.isLogged = this.authService.isLogged();
    this.esAdmin = this.authService.isAdmin();
    this.nombreUsuario = this.authService.getUsername();
    
    this.cargarProductos();
  }

  cargarProductos() {
    // Usamos 'obtenerTodos()' que es el método de tu clase Producto
    this.productoService.lista().subscribe({
      next: (data) => {
        this.productos = data;
      },
      error: (e) => {
        console.error('Error al cargar productos en el inicio:', e);
      }
    });
  }

  // Este método lo llama el botón amarillo del HTML
  irAAdmin() {
    if (this.esAdmin) {
      this.router.navigate(['/admin-productos']);
    } else {
      // Si no es admin pero hace clic, lo mandamos al login
      this.router.navigate(['/login']);
    }
  }

  cerrarSesion() {
    this.authService.logOut();
    this.isLogged = false;
    this.esAdmin = false;
    this.router.navigate(['/login']);
  }
}