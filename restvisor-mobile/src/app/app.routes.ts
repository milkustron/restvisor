import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '**',
    redirectTo: 'detail',
    pathMatch: 'full',
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./auth/register/register.component').then(
        (m) => m.RegisterComponent
      ),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./auth/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'favorites',
    loadComponent: () =>
      import('./favorites/favorites.component').then(
        (m) => m.FavoritesComponent
      ),
  },
  {
    path: 'detail',
    loadComponent: () =>
      import('./details/details.component').then((m) => m.DetailsComponent),
  },
];
