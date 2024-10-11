import { ValidationError } from 'yup';

export const formatError = (error: unknown) => {
  if (!(error instanceof ValidationError)) {
    return 'Not yup error!';
  }

  const formattedError = {};

  error.inner.forEach((value) => {
    const path = value?.path || 'unknown';
    const message = value.message;

    const key = path;

    const formattedErrorValue = formattedError[key];

    if (formattedErrorValue) {
      formattedErrorValue.push(message);
    } else {
      formattedError[key] = [message];
    }
  });

  return formattedError;
};
