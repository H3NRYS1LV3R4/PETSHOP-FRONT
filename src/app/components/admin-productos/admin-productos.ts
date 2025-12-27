import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Producto } from '../../services/producto'; // Importamos tu servicio
import { Router } from '@angular/router';
import { Productos } from '../../dto/productos'; // Importamos la interfaz DTO

@Component({
  selector: 'app-admin-productos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-productos.html',
  styleUrl: './admin-productos.css'
})
export class AdminProductos implements OnInit {

  private productoService = inject(Producto);
  private router = inject(Router);

  // Usamos el tipo Productos[] en lugar de any[]
  productos: Productos[] = [];
  
  // Tipamos el objeto del formulario para el bindeo con ngModel
  productoActual: Productos = {
    id: undefined,
    nombre: '',
    descripcion: '',
    precio: 0,
    stock: 0,
    imagenUrl: ''
  };

  ngOnInit(): void {
    this.cargarProductos();
  }

  cargarProductos() {
    // CAMBIO: 'obtenerTodos' por 'lista' para coincidir con tu servicio
    this.productoService.lista().subscribe({
      next: (data: Productos[]) => {
        this.productos = data;
      },
      error: (e: any) => {
        console.error('Error al cargar productos:', e);
        // Manejo de error: Si el token expiró o no es válido (401 o 403)
        if (e.status === 403 || e.status === 401) {
          alert('Tu sesión ha expirado o no tienes permisos. Por favor, inicia sesión.');
          this.router.navigate(['/login']);
        }
      }
    });
  }

  guardarProducto() {
    if (this.productoActual.id) {
      // CAMBIO: 'actualizar' por 'update' para coincidir con tu servicio
      this.productoService.update(this.productoActual.id, this.productoActual).subscribe({
        next: () => {
          alert('Producto actualizado correctamente');
          this.cargarProductos();
          this.limpiarFormulario();
        },
        error: (e) => {
          console.error(e);
          alert('Error al actualizar el producto');
        }
      });
    } else {
      // CAMBIO: 'crear' por 'save' para coincidir con tu servicio
      this.productoService.save(this.productoActual).subscribe({
        next: () => {
          alert('Producto creado correctamente');
          this.cargarProductos();
          this.limpiarFormulario();
        },
        error: (e) => {
          console.error(e);
          alert('Error al crear el producto');
        }
      });
    }
  }

  editar(producto: Productos) {
    // Hacemos una copia del objeto para no modificar la fila de la tabla directamente
    this.productoActual = { ...producto }; 
  }

  eliminar(id: number | undefined) {
    if (id === undefined) return;

    if (confirm('¿Estás seguro de eliminar este producto?')) {
      // CAMBIO: 'eliminar' por 'delete' para coincidir con tu servicio
      this.productoService.delete(id).subscribe({
        next: () => {
          alert('Producto eliminado');
          this.cargarProductos();
        },
        error: (e) => {
          console.error(e);
          if (e.status === 403) {
            alert('No tienes permisos de administrador para realizar esta acción.');
          } else {
            alert('Error al eliminar');
          }
        }
      });
    }
  }

  limpiarFormulario() {
    this.productoActual = { 
      id: undefined, 
      nombre: '', 
      descripcion: '', 
      precio: 0, 
      stock: 0, 
      imagenUrl: ''
    };
  }

  volver() {
    this.router.navigate(['/inicio']);
  }
}