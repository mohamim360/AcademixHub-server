import express from 'express';

import { createCategory, getAllCategories } from './category.controller';
import validateRequest from '../../middlewares/validateRequest';
import { categoryValidation } from './category.validation';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

//Create a Category
router.post(
  '/categories',
  auth(USER_ROLE.admin),
  validateRequest(categoryValidation),
  createCategory,
);

router.get('/categories', getAllCategories);

export const CategoryRoutes = router;
