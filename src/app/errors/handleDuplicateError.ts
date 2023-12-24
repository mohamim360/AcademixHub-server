/* eslint-disable @typescript-eslint/no-explicit-any */
import { TError } from '../interface/error';

const handleDuplicateError = (err: any): TError => {
  const match = err.message.match(/"([^"]*)"/);

  const extractedMessage = match && match[1];

  const statusCode = 400;

  return {
    statusCode,
    message: 'Duplicate Entry',
    errorMessage: `${extractedMessage} is already exists`,
    errorDetails: err,
  };
};

export default handleDuplicateError;
