import express from 'express';

import { createCategory, getAllCategories } from './category.controller';
import validateRequest from '../../middlewares/validateRequest';
import { categoryValidation } from './category.validation';

const router = express.Router();

//Create a Category
router.post('/categories', validateRequest(categoryValidation), createCategory);

router.get('/categories', getAllCategories);

export const CategoryRoutes = router;
