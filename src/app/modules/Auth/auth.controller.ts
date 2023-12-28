import catchAsync from '../../utils/catchAsync';
import { AuthServices } from './auth.service';

const registerUser = catchAsync(async (req, res) => {
  const userData = req.body;
  const result = await AuthServices.registerUser(userData);

  res.status(201).json({
    success: true,
    statusCode: 201,
    message: 'User registered successfully',
    data: result,
  });
});

const loginUser = catchAsync(async (req, res) => {
  const result = await AuthServices.loginUser(req.body);

  res.status(200).json({
    success: true,
    statusCode: 200,
    message: 'User login successful',
    data: result,
  });
});

const changePassword = catchAsync(async (req, res) => {

console.log(req.body);
  const result = await AuthServices.changePassword(req.user, req.body);

  res.status(200).json(result);
});

export const AuthControllers = {
	registerUser,loginUser,changePassword
}