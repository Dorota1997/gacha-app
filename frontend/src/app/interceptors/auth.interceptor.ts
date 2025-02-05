import { Router } from '@angular/router';
import { inject, Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { catchError, Observable, of } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private router = inject(Router);

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error) => {
        if (error instanceof HttpErrorResponse) {
          if (error.status === 401) {
            this.router.navigate(['guest']);
          }
        }
        return of(error);
      })
    );
  }
}
