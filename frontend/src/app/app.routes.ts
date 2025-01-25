import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'header',
    loadComponent: () =>
      import('./pages/header/header.component').then(
        (component) => component.HeaderComponent
      ),
  },
  {
    path: '',
    loadComponent: () =>
      import('./pages/header/header.component').then(
        (component) => component.HeaderComponent
      ),
  },
];
