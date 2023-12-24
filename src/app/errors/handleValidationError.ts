import mongoose from 'mongoose';
import { TError } from '../interface/error';

const handleValidationError = (err: mongoose.Error.ValidationError): TError => {
  const issues = Object.values(err.errors).map((validationError) => {
    return {
      code: 'invalid_type',
      expected: validationError.kind,
      received: 'undefined',
      path: validationError.path,
      message: validationError.message,
    };
  });

  const statusCode = 400;
  const message = 'Validation Error';
  const errorMessage = issues
    .map((error) => `${error.message}.`)
    .join(' ');

  return {
    statusCode,
    message,
    errorMessage,
    errorDetails: {
      issues,
      name: 'ZodError',
    },
  };
};

export default handleValidationError;
