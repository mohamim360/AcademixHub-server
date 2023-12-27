
import { TCourse } from './course.interface';
import { Course } from './course.model';
import { calculateDuration } from './utilities';

const createCourseIntoDB = async (courseData: TCourse, AdminId: string) => {
  const newCourseData = await Course.create({ ...courseData, createdBy: AdminId });
  return newCourseData;
};

const getCoursesFromDB = async (query: Record<string, unknown>) => {
  const page = parseInt(query.page as string) || 1;
  const limit = parseInt(query.limit as string) || 10;

  const sortBy = query.sortBy as string;
  const sortOrder = query.sortOrder === 'desc' ? -1 : 1;

  const minPrice = parseFloat(query.minPrice as string);
  const maxPrice = parseFloat(query.maxPrice as string);
  const tags = query.tags as string;
  const startDate = query.startDate as string;
  const endDate = query.endDate as string;
  const language = query.language as string;
  const provider = query.provider as string;
  const durationInWeeks = parseInt(query.durationInWeeks as string);
  const level = query.level as string;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const filter: Record<string, any> = {};
  if (minPrice !== undefined && maxPrice !== undefined) {
    filter.price = { $gte: minPrice, $lte: maxPrice };
  }
  if (tags) {
    filter['tags.name'] = tags;
  }
  if (startDate && endDate) {
    filter.startDate = { $gte: startDate, $lte: endDate };
  }
  if (language) {
    filter.language = language;
  }
  if (provider) {
    filter.provider = provider;
  }
  if (!isNaN(durationInWeeks)) {
    filter.durationInWeeks = durationInWeeks;
  }
  if (level) {
    filter['details.level'] = level;
  }

  const courses = await Course.find(filter)
    .sort({ [sortBy]: sortOrder })
    .skip((page - 1) * limit)
    .limit(limit);

  const total = await Course.countDocuments(filter);

  return {
    courses,
    total,
    page,
    limit,
  };
};

const getBestCourseFromDB = async () => {
  const bestCourse = await Course.aggregate([
    {
      $lookup: {
        from: 'reviews',
        localField: '_id',
        foreignField: 'courseId',
        as: 'reviews',
      },
    },
    {
      $unwind: '$reviews',
    },
    {
      $group: {
        _id: '$_id',
        course: { $first: '$$ROOT' },
        averageRating: { $avg: '$reviews.rating' },
        reviewCount: { $sum: 1 },
      },
    },

    { $sort: { averageRating: -1 } },
    { $limit: 1 },
  ]);

  return bestCourse[0];
};

const updateCourseInDB = async (
  courseId: string,
  updateData: Partial<TCourse>,
) => {
  const {
    tags,
    details,
    startDate: newStartDate,
    endDate: newEndDate,
    ...rest
  } = updateData;

  const existingCourse = await Course.findById(courseId);
  if (!existingCourse) {
    throw new Error('Course not found');
  }

  const { startDate: existingStartDate, endDate: existingEndDate } =
    existingCourse;

  const modifiedUpdatedData: Record<string, unknown> = {
    ...rest,
  };

  if (tags && tags.length > 0) {
    // filter out the deleted fields
    const deletedtags = tags
      .filter((el) => el.name && el.isDeleted)
      .map((el) => el.name);

    await Course.findByIdAndUpdate(
      courseId,
      {
        $pull: {
          tags: { name: { $in: deletedtags } },
        },
      },
      {
        new: true,
        runValidators: true,
      },
    );

    // filter out the new course fields
    const newTags = tags.filter((el) => el.name && !el.isDeleted);

    await Course.findByIdAndUpdate(
      courseId,
      {
        $addToSet: { tags: { $each: newTags } },
      },
      {
        new: true,
        runValidators: true,
      },
    );
  }

  if (details && Object.keys(details).length) {
    for (const [key, value] of Object.entries(details)) {
      modifiedUpdatedData[`details.${key}`] = value;
    }
  }

  if (newEndDate && existingStartDate) {
    modifiedUpdatedData.startDate = existingStartDate;
  } else if (newStartDate) {
    // Otherwise, use the newStartDate
    modifiedUpdatedData.startDate = newStartDate;
  }

  if (newStartDate && existingEndDate) {
    modifiedUpdatedData.endDate = existingEndDate;
  } else if (newEndDate) {
    // Otherwise, use the newEndDate
    modifiedUpdatedData.endDate = newEndDate;
  }

  // Check if either startDate or endDate is updated
  if (newStartDate || newEndDate) {
    // Calculate and update durationInWeeks
    const durationInWeeks = calculateDuration(
      modifiedUpdatedData.startDate as string,
      modifiedUpdatedData.endDate as string,
    );
    modifiedUpdatedData.durationInWeeks = durationInWeeks;
  }

  const updatedCourse = await Course.findByIdAndUpdate(
    courseId,
    modifiedUpdatedData,
    { new: true, runValidators: true },
  );

  return updatedCourse;
};
export const CourseServices = {
  createCourseIntoDB,
  getBestCourseFromDB,
  updateCourseInDB,
  getCoursesFromDB,
};
