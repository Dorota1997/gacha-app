import { Resolve } from '@angular/router';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';

import { AuthService } from './auth.service';
import { IStatus } from '@interfaces/status.interface';

@Injectable({
  providedIn: 'root',
})
export class StatusResolverService implements Resolve<IStatus> {
  private authService = inject(AuthService);
  private userStatusSubject: BehaviorSubject<IStatus> =
    new BehaviorSubject<IStatus>({
      userId: '',
      username: '',
    });

  public userStatus$: Observable<IStatus> =
    this.userStatusSubject.asObservable();

  resolve(): Observable<IStatus> {
    return this.authService.getStatus().pipe(
      tap((value: IStatus) => {
        this.userStatusSubject.next(value);
      }),
    );
  }
}
