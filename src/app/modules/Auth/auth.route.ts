import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AuthControllers } from '../Auth/auth.controller';
import { userValidationSchema } from '../user/user.validation';
import { AuthValidation } from './auth.validation';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';

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

router.post(
  '/auth/change-password',
  auth(USER_ROLE.admin, USER_ROLE.user),
  validateRequest(AuthValidation.changePasswordValidationSchema),
  AuthControllers.changePassword,
);

export const AuthRoutes = router;
