import { Routes } from '@angular/router';

import { StatusResolverService } from '@services/status-resolver.service';

export const routes: Routes = [
  {
    path: 'dashboard',
    resolve: { status: StatusResolverService },
    loadComponent: () =>
      import('./pages/dashboard/dashboard.component').then(
        (component) => component.DashboardComponent
      ),
  },
  {
    path: '',
    loadComponent: () =>
      import('./pages/guest/guest.component').then(
        (component) => component.GuestComponent
      ),
  },
];
