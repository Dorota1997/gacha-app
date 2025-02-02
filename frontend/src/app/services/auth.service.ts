import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { IStatus } from '@interfaces/status.interface';
import { ISignIn } from '@interfaces/sign-in.interface';
import { IUserDto } from '@interfaces/logged-in.interface';
import { environment } from 'environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private httpClient = inject(HttpClient);
  private apiUrl = environment.apiUrl + 'auth';
  private httpOptions = { withCredentials: true };

  signIn(body: ISignIn) {
    return this.httpClient.post<IUserDto>(
      `${this.apiUrl}/sign-in`,
      body,
      this.httpOptions
    );
  }

  getStatus() {
    return this.httpClient.get<IStatus>(
      `${this.apiUrl}/status`,
      this.httpOptions
    );
  }
}
