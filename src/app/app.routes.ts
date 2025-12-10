import { Routes } from '@angular/router';
// CORRECCIÓN: Quitamos ".component" del final de la ruta para que coincida con tus archivos
import { Inicio } from './components/inicio/inicio';
import { Login } from './components/login/login';
import { Registro } from './components/registro/registro';
import { AdminProductos } from './components/admin-productos/admin-productos';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },
  { path: 'inicio', component: Inicio },
  { path: 'login', component: Login },
  { path: 'admin-productos', component: AdminProductos,canActivate: [authGuard] }
];