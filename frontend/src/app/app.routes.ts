import { Routes } from '@angular/router';

import { StatusResolverService } from '@services/status-resolver.service';

export const routes: Routes = [
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
      import('./pages/login/login.component').then(
        (component) => component.LoginComponent
      ),
  },
];
