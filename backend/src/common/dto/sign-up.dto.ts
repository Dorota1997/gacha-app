import { SignInDto } from './sign-in.dto';

export type SignUpDto = SignInDto & {
  confirmPassword: string;
};
