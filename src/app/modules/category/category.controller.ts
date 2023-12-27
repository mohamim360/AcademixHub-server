import catchAsync from '../../utils/catchAsync';
import {
  createCategoryIntoDB,
  getAllCategoriesFromDB,
} from './category.service';

//Create a Category
export const createCategory = catchAsync(async (req, res) => {
  const categoryData = req.body;
  const AdminId = req.user._id;
  const result = await createCategoryIntoDB(categoryData,AdminId);

  res.status(201).json({
    success: true,
    statusCode: 201,
    message: 'Category created successfully',
    data: result
  });
});

//Get All Categories
export const getAllCategories = catchAsync(async (req, res) => {
  const categories = await getAllCategoriesFromDB();

  res.status(200).json({
    success: true,
    statusCode: 200,
    message: 'Categories retrieved successfully',
    data: categories,
  });
});
