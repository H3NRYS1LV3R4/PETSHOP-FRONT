import { Routes } from '@angular/router';
import { Inicio } from './components/inicio/inicio';
import { Login } from './components/login/login';
import { Registro } from './components/registro/registro';
import { AdminProductos } from './components/admin-productos/admin-productos';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
  // CAMBIO: Ahora el proyecto inicia directamente en el Login
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  
  { path: 'login', component: Login },
  { path: 'registro', component: Registro },
  
  // Ruta de la tienda, protegida para que solo entren usuarios logueados
  { path: 'inicio', component: Inicio, canActivate: [authGuard] },
  
  // Ruta de administración, protegida solo para ADMIN
  { 
    path: 'admin-productos', 
    component: AdminProductos, 
    canActivate: [authGuard] 
  },
  
  // Cualquier otra ruta redirige al login por seguridad
  { path: '**', redirectTo: 'login' }
];