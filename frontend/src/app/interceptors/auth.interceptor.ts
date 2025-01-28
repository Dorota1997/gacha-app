import { Router } from '@angular/router';
import { inject, Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private router = inject(Router);
  private loggedUser = { username: '', token: '' };

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (localStorage.getItem('token')) {
      this.loggedUser = JSON.parse(localStorage.getItem('token')!);
    }

    if (this.loggedUser?.token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.loggedUser?.token}`,
        },
      });
    }

    return next.handle(request).pipe(
      catchError((err) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            this.router.navigate(['login']);
          }
        }
        return throwError(err);
      })
    );
  }
}
