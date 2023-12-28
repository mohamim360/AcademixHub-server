import { Types } from 'mongoose';
import catchAsync from '../../utils/catchAsync';
import { ReviewServices } from './review.service';

//Create a Review
const createReview = catchAsync(async (req, res) => {
  const reviewData = req.body;
  const userData = req.user;
  const result = await ReviewServices.createReviewIntoDB(reviewData,userData);

  res.status(201).json({
    success: true,
		statusCode: 201,
    message: 'Review created successfully',
    data: result,
  });
});

const getCourseWithReviews = catchAsync(async (req, res) => {
  const Id = req.params.courseId;

  const courseId = new Types.ObjectId(Id);

  const result = await ReviewServices.getCourseWithReviewsFromDB(courseId);
  console.log(result);

  res.status(200).json({
    success: true,
    statusCode: 200,
    message: 'Course and Reviews retrieved successfully',
    data:result
  });
});

export const ReviewController = {
  createReview,
  getCourseWithReviews,
};
