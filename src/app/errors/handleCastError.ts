import mongoose from 'mongoose';
import { TError } from '../interface/error';

const handleCastError = (err: mongoose.Error.CastError): TError => {



  const statusCode = 400;

  return {
    statusCode,
    message: 'Invalid ID',
    errorMessage: `${err.value} is not a valid ID!`,
    errorDetails: err,

  };
};

export default handleCastError;
