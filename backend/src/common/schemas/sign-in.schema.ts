import { object, ObjectSchema, string } from 'yup';

import { SignInDto } from '../dto/sign-in.dto';

export const signInSchema: ObjectSchema<SignInDto> = object({
  username: string().required(),
  password: string().required(),
});
