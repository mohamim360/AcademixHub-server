import { Types } from 'mongoose';
import { Course } from '../course/course.model';
import { TReview } from './review.interface';
import { Review } from './review.model';

//Create a Review Into DB
const createReviewIntoDB = async (reviewData: TReview) => {
  const result = await Review.create(reviewData);
  return result;
};

const getCourseWithReviewsFromDB = async (courseId: Types.ObjectId) => {
  const result = await Course.aggregate([
    {
      $match: {
        _id: new Types.ObjectId(courseId),
      },
    },
    {
      $lookup: {
        from: 'reviews',
        localField: '_id',
        foreignField: 'courseId',
        as: 'reviews',
      },
    },
    {
      $project: {
        "reviews._id": 0,
      },
    },
  ]);
  return result;
};

export const ReviewServices = {
  createReviewIntoDB,
  getCourseWithReviewsFromDB,
};
