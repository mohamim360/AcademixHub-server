import jwt, { JwtPayload } from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import config from '../config';
import { User } from '../modules/user/user.model';

const auth = () => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized Access',
        errorMessage:
          'You do not have the necessary permissions to access this resource.',
        errorDetails: null,
        stack: null,
      });
    }
    const decoded = jwt.verify(
      token as string,
      config.jwt_secret as string,
    ) as JwtPayload;

    const { role, email, _id, iat } = decoded;
		const user = await User.findOne({_id});
		if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized Access',
        errorMessage:
          'You do not have the necessary permissions to access this resource.',
        errorDetails: null,
        stack: null,
      });
    }
    next();
  });
};

export default auth;
