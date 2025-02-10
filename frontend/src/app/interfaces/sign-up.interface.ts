import { ISignIn } from './sign-in.interface';

export interface ISignUp extends ISignIn {
  confirmPassword: string;
}
