import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Producto } from '../../services/producto';
import { Router } from '@angular/router';

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

  productos: any[] = [];
  
  // Objeto para el formulario (Nuevo/Editar)
  productoActual: any = {
    id: null,
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
    this.productoService.obtenerTodos().subscribe({
      next: (data: any) => this.productos = data,
      error: (e: any) => console.error(e)
    });
  }

  // Guardar (Sirve para Crear O Editar)
  guardarProducto() {
    if (this.productoActual.id) {
      // Si tiene ID, es EDITAR
      this.productoService.actualizar(this.productoActual.id, this.productoActual).subscribe({
        next: () => {
          alert('Producto actualizado correctamente');
          this.cargarProductos();
          this.limpiarFormulario();
        },
        error: (e) => alert('Error al actualizar')
      });
    } else {
      // Si no tiene ID, es CREAR NUEVO
      this.productoService.crear(this.productoActual).subscribe({
        next: () => {
          alert('Producto creado correctamente');
          this.cargarProductos();
          this.limpiarFormulario();
        },
        error: (e) => alert('Error al crear')
      });
    }
  }

  // Cargar datos en el formulario para editar
  editar(producto: any) {
    this.productoActual = { ...producto }; // Copia los datos al formulario
  }

  eliminar(id: number) {
    if (confirm('¿Estás seguro de eliminar este producto?')) {
      this.productoService.eliminar(id).subscribe({
        next: () => {
          alert('Producto eliminado');
          this.cargarProductos();
        }
      });
    }
  }

  limpiarFormulario() {
    this.productoActual = { id: null, nombre: '', descripcion: '', precio: 0, stock: 0, imagenUrl: '' };
  }

  volver() {
    this.router.navigate(['/inicio']);
  }
}