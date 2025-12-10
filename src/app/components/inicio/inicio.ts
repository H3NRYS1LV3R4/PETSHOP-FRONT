import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Producto } from '../../services/producto';
import { Router } from '@angular/router'; // Importamos Router

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './inicio.html',
  styleUrl: './inicio.css'
})
export class Inicio implements OnInit {

  private productoService = inject(Producto);
  private router = inject(Router); // Inyectamos Router para navegar
  
  productos: any[] = [];
  esAdmin: boolean = false;
  nombreUsuario: string = ''; // Variable para saber si es jefe

  ngOnInit(): void {
    this.cargarProductos();
    this.verificarRol();
    this.verificarUsuario();
  }

  verificarUsuario() {
    const usuarioGuardado = sessionStorage.getItem('username');
    if (usuarioGuardado) {
      this.nombreUsuario = usuarioGuardado; // Lo guardamos en la variable
    }

    // Leemos los roles
    const rolesGuardados = sessionStorage.getItem('roles');
    if (rolesGuardados) {
      const roles = JSON.parse(rolesGuardados);
      this.esAdmin = roles.includes('ADMIN'); 
    }
  }

  verificarRol() {
    // Leemos los roles de la memoria
    const rolesGuardados = sessionStorage.getItem('roles');
    
    if (rolesGuardados) {
      // Si existen, buscamos si tiene "ADMIN"
      const roles = JSON.parse(rolesGuardados);
      this.esAdmin = roles.includes('ADMIN'); 
    }
  }

  cargarProductos() {
    this.productoService.obtenerTodos().subscribe({
      next: (data: any) => {
        this.productos = data;
      },
      error: (error: any) => {
        console.error('Error:', error);
      }
    });
  }

  // Función para ir al panel de admin (que crearemos pronto)
  irAdmin() {
    this.router.navigate(['/admin-productos']);
  }
}