import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { IStatus } from '@interfaces/status.interface';
import { ISignIn } from '@interfaces/sign-in.interface';
import { IUserDto } from '@interfaces/logged-in.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private httpClient = inject(HttpClient);
  private controllerName = 'auth';

  signIn(body: ISignIn) {
    return this.httpClient.post<IUserDto>(
      `${this.controllerName}/sign-in`,
      body
    );
  }

  getStatus() {
    return this.httpClient.get<IStatus>(`${this.controllerName}/status`);
  }
}
