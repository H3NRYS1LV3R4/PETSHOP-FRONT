import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
// Importamos la constante 'authInterceptor' directamente
import { authInterceptor } from './interceptor/auth-interceptor'; 

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes),
    // Registramos el interceptor en la configuración del cliente HTTP
    provideHttpClient(withInterceptors([authInterceptor]))
  ]
};