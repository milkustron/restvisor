import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { map, take } from 'rxjs/operators';

export const workerGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.hasRole('employee').pipe(
    take(1),
    map(isWorker => {
      if (isWorker) {
        return true;
      }
      return router.createUrlTree(['/']);
    })
  );
}; 