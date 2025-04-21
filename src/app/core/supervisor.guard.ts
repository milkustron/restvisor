import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { map, take } from 'rxjs/operators';

export const supervisorGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.hasRole('supervisor').pipe(
    take(1),
    map(isSupervisor => {
      if (isSupervisor) {
        return true;
      }
      return router.createUrlTree(['/']);
    })
  );
}; 