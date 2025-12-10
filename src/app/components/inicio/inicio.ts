import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Producto } from '../../services/producto';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './inicio.html',
  styleUrl: './inicio.css'
})
export class Inicio implements OnInit {

  private productoService = inject(Producto);
  private router = inject(Router);
  
  productos: any[] = [];
  esAdmin: boolean = false;
  nombreUsuario: string = '';

  ngOnInit(): void {
    this.cargarProductos();
    this.verificarSesion();
  }

  verificarSesion() {
    const auth = sessionStorage.getItem('auth');
    
    if (auth) {
      this.esAdmin = true;
    } else {
      this.esAdmin = false;
    }
  }

  cargarProductos() {
    this.productoService.obtenerTodos().subscribe({
      next: (data: any) => {
        this.productos = data;
      },
      error: (error: any) => {
        console.error('Error al cargar productos:', error);
      }
    });
  }

  irAAdmin() {
    if (this.esAdmin) {
      this.router.navigate(['/admin-productos']);
    } else {
      this.router.navigate(['/login']);
    }
  }

  cerrarSesion() {
    sessionStorage.clear();
    window.location.reload();
  }
}