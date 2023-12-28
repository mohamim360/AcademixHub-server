import { Types } from 'mongoose';
import { Course } from '../course/course.model';
import { TReview } from './review.interface';
import { Review } from './review.model';
import { JwtPayload } from 'jsonwebtoken';

//Create a Review Into DB
const createReviewIntoDB = async (
  reviewData: TReview,
  userData: JwtPayload,
) => {
  const result = await Review.create({
    ...reviewData,
    createdBy: userData._id,
  });
  const populatedReview = await Review.findById(result._id).populate(
    'createdBy',
    '_id username email role',
  );
  return populatedReview;
};

const getCourseWithReviewsFromDB = async (courseId: Types.ObjectId) => {
  const course = await Course.findById(courseId).populate(
    'createdBy',
    '_id username email role',
  );
  const reviews = await Review.find({ courseId }).populate(
    'createdBy',
    '_id username email role',
  );
  
  return {
    course: course,
    reviews: reviews,
  };
};

export const ReviewServices = {
  createReviewIntoDB,
  getCourseWithReviewsFromDB,
};
