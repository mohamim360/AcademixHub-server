import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AuthControllers } from '../Auth/auth.controller';
import { userValidationSchema } from '../user/user.validation';
import { AuthValidation } from './auth.validation';

const router = express.Router();

router.post(
  '/auth/register',
  validateRequest(userValidationSchema),
	AuthControllers.registerUser,
);

router.post(
  '/auth/login',
  validateRequest(AuthValidation.loginValidationSchema),
  AuthControllers.loginUser,
);


export const AuthRoutes = router;
