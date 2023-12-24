import express from 'express';

import { ReviewController } from './review.controller';
import validateRequest from '../../middlewares/validateRequest';
import { reviewValidationSchema } from './review.validation';

const router = express.Router();

//Create a Review
router.post(
  '/reviews',
  validateRequest(reviewValidationSchema),
  ReviewController.createReview,
);

router.get('/courses/:courseId/reviews', ReviewController.getCourseWithReviews);

export const ReviewRoutes = router;
