import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = sessionStorage.getItem('token');
  const roles = sessionStorage.getItem('roles');

  // 1. Si no hay token, fuera (al login)
  if (!token) {
    router.navigate(['/login']);
    return false;
  }

  // 2. Si intenta entrar a admin, verificamos que sea ADMIN
  if (state.url.includes('admin')) {
    if (roles && roles.includes('ADMIN')) {
      return true; // Pase jefe
    } else {
      alert('Acceso Denegado: Se requiere rol de Administrador');
      router.navigate(['/inicio']);
      return false;
    }
  }

  return true; // Si es usuario normal y va a inicio, pase
};