import jwt, { JwtPayload } from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import config from '../config';
import { User } from '../modules/user/user.model';
import { unauthorizedAccessError } from './constants';


const auth = (requiredRole?: string) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json(unauthorizedAccessError);
    }

    try {
      const decoded = jwt.verify(
        token as string,
        config.jwt_secret as string,
      ) as JwtPayload;

      const { role, email, _id, iat, exp } = decoded;
      const user = await User.findOne({ _id });

      if (!user || (requiredRole && role !== requiredRole)) {
        return res.status(401).json(unauthorizedAccessError);
      }

      // Check for JWT expiration
      const currentTimeInSeconds = Math.floor(Date.now() / 1000);
      if (exp && exp < currentTimeInSeconds) {
        return res.status(401).json(unauthorizedAccessError);
      }

      req.user = decoded; 
      next();
    } catch (error) {
      return res.status(401).json(unauthorizedAccessError);
    }
  });
};

export default auth;