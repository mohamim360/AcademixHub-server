import { CourseServices } from './course.service';
import catchAsync from '../../utils/catchAsync';
import { calculateDuration } from './utilities';
import { Course } from './course.model';

const createCourse = catchAsync(async (req, res) => {
  const courseData = req.body;
  const AdminId = req.user._id;
  const durationInWeeks = calculateDuration(
    courseData.startDate,
    courseData.endDate,
  );

  courseData.durationInWeeks = durationInWeeks;

  const result = await CourseServices.createCourseIntoDB(courseData,AdminId);

  res.status(201).json({
    success: true,
    "statusCode": 201,
    message: 'Course created successfully',
    data: result,
  });
});

const getCourses = catchAsync(async (req, res) => {
  const query = req.query;
  const result = await CourseServices.getCoursesFromDB(query);

  res.status(200).json({
    success: true,
    statusCode: 200,
    message: 'Courses retrieved successfully',
    meta: {
      page: result.page,
      limit: result.limit,
      total: result.total,
    },
    data: result.courses,
  });
});

const getBestCourse = catchAsync(async (req, res) => {
  const result = await CourseServices.getBestCourseFromDB();

  const {
    _id
  } = result.course;

  const course = await Course.findById(_id).populate(
    'createdBy',
    '_id username email role',
  );

  console.log(course);

  res.status(200).json({
    success: true,
    statusCode: 200,
    message: 'Best course retrieved successfully',
    data: {
      course: course,
      averageRating: result.averageRating,
      reviewCount: result.reviewCount,
    },
  });
});

const updateCourse = catchAsync(async (req, res) => {
  const courseId = req.params.courseId;
  const updateData = req.body;
  const result = await CourseServices.updateCourseInDB(courseId, updateData);

  res.status(200).json({
    success: true,
    statusCode: 200,
    message: 'Course updated successfully',
    data: result,
  });
});



export const CourseController = {
  createCourse,
  getBestCourse,
  updateCourse,
  getCourses
};
