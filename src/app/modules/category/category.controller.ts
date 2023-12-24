import catchAsync from '../../utils/catchAsync';
import {
  createCategoryIntoDB,
  getAllCategoriesFromDB,
} from './category.service';

//Create a Category
export const createCategory = catchAsync(async (req, res) => {
  const categoryData = req.body;
	console.log(categoryData);
  const result = await createCategoryIntoDB(categoryData);

  res.status(201).json({
    success: true,
    statusCode: 201,
    message: 'Category created successfully',
    data: {
      _id: result._id,
      name: result.name,
    },
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
