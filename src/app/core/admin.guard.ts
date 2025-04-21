import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { map, take } from 'rxjs/operators';

export const adminGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.hasRole('admin').pipe(
    take(1),
    map(isAdmin => {
      if (isAdmin) {
        return true;
      }
      return router.createUrlTree(['/']);
    })
  );
}; 