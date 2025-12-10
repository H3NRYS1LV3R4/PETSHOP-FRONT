import { Routes } from '@angular/router';
import { Inicio } from './components/inicio/inicio';
import { Login } from './components/login/login';
import { Registro } from './components/registro/registro';
import { AdminProductos } from './components/admin-productos/admin-productos';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
  { path: '', redirectTo: 'admin-productos', pathMatch: 'full' },
  { path: 'inicio', component: Inicio },
  { path: 'login', component: Login },
  { path: 'login', component: Registro },
  { path: 'admin-productos', component: AdminProductos,canActivate: [authGuard] }
];