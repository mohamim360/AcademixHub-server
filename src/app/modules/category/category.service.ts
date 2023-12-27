import { TCategory } from './category.interface';
import { Category } from './category.model';

//Create a Category into
export const createCategoryIntoDB = async (
  categoryData: TCategory,
  AdminId: string,
) => {
  const result = await Category.create({ ...categoryData, createdBy: AdminId });
  return result;
};

//Get All Categories
export const getAllCategoriesFromDB = async () => {
  const result = await Category.find().populate({path:'createdBy',select: '_id username email role'});
  return result;
};
