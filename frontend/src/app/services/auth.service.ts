import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { IStatus } from '@interfaces/status.interface';
import { ISignIn } from '@interfaces/sign-in.interface';
import { environment } from 'environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private httpClient = inject(HttpClient);
  private apiUrl = environment.apiUrl + 'auth';

  signIn(body: ISignIn) {
    return this.httpClient.post(`${this.apiUrl}/sign-in`, body);
  }

  getStatus() {
    return this.httpClient.get<IStatus>(`${this.apiUrl}/status`);
  }
}
