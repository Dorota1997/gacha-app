import { Routes } from '@angular/router';

import { StatusResolverService } from '@services/status-resolver.service';

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
    resolve: { status: StatusResolverService },
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
