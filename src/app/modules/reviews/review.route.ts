import express from 'express';

import { ReviewController } from './review.controller';
import validateRequest from '../../middlewares/validateRequest';
import { reviewValidationSchema } from './review.validation';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

//Create a Review
router.post(
  '/reviews',auth(USER_ROLE.user),
  validateRequest(reviewValidationSchema),
  ReviewController.createReview,
);

router.get('/courses/:courseId/reviews', ReviewController.getCourseWithReviews);

export const ReviewRoutes = router;
