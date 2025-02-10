import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ISignUp } from '@interfaces/sign-up.interface';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private httpClient = inject(HttpClient);
  private controllerName = 'users';

  signUp(body: ISignUp) {
    return this.httpClient.post(`${this.controllerName}/sign-up`, body);
  }
}
