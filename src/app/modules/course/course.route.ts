import express from 'express';
import { CourseController } from './course.controller';
import validateRequest from '../../middlewares/validateRequest';
import {
  UpdateCourseValidationSchema,
  courseValidationSchema,
} from './course.validation';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

//Create a Course
router.post(
  '/courses',
  auth(USER_ROLE.admin),
  validateRequest(courseValidationSchema),

  CourseController.createCourse,
);

//get best course
router.get('/course/best', CourseController.getBestCourse);

//pagination and filtering
router.get('/courses', CourseController.getCourses);

//update course
router.put(
  '/courses/:courseId',auth(USER_ROLE.admin),
  validateRequest(UpdateCourseValidationSchema),
  CourseController.updateCourse,
);

export const CourseRoutes = router;
