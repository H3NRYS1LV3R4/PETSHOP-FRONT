import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Auth } from '../services/auth'; // Importamos tu servicio Auth

export const authGuard: CanActivateFn = (route, state) => {
  // Inyectamos el servicio y el router
  const authService = inject(Auth);
  const router = inject(Router);

  // Verificamos si el usuario está logueado
  if (authService.isLogged()) {
    return true; // Si está logueado, lo dejamos pasar
  } else {
    // Si no está logueado, lo mandamos al login
    router.navigate(['/login']);
    return false;
  }
};