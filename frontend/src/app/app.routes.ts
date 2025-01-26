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
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login.component').then(
        (component) => component.LoginComponent
      ),
  },
  {
    path: 'main',
    loadComponent: () =>
      import('./pages/main/main.component').then(
        (component) => component.MainComponent
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
