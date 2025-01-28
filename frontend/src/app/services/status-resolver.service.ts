import { Observable } from 'rxjs';
import { inject, Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

import { AuthService } from './auth.service';
import { IStatus } from '@interfaces/status.interface';

@Injectable({
  providedIn: 'root',
})
export class StatusResolverService implements Resolve<IStatus> {
  private authService = inject(AuthService);

  resolve(): Observable<IStatus> {
    return this.authService.getStatus();
  }
}
