import { object, ObjectSchema, ref, string } from 'yup';

import { SignUpDto } from '../dto/sign-up.dto';

export const useSignUpSchema: () => ObjectSchema<SignUpDto> = () =>
  object({
    // @TODO check if username is not taken already!!
    username: string().required().min(4).max(40),
    password: string()
      .required()
      .min(7)
      .max(50)
      .matches(/\d/)
      .matches(/[a-z]/)
      .matches(/[A-Z]/)
      .matches(/[*.!@#$%^&(){}[\]:;<>,.?/~_+-=|]/),
    confirmPassword: string()
      .required()
      .oneOf([ref('password'), null]),
  });
