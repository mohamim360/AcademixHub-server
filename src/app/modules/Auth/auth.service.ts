
import config from '../../config';
import {  PasswordHistory, TUser } from '../user/user.interface';
import { User } from '../user/user.model';
import { TLoginUser } from './auth.interface';
import jwt, { JwtPayload } from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const registerUser = async (user: TUser) => {
  const savedUser = await User.create(user);
  const result = await User.findOne(
    { _id: savedUser._id },
    { password: 0, passwordHistory: 0 },
  );
  return result;
};

const loginUser = async (userData: TLoginUser) => {
  // checking if the user is exist
  const user = await User.findOne({ username: userData.username });

  if (!user) {
    throw new Error('User not found');
  }

  if (!(await User.isPasswordMatched(userData.password, user.password))) {
    throw new Error('Password do not  matched');
  }

  const JwtPayload = {
    _id: user._id,
    role: user.role,
    email: user.email,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + 4000,
  };
  const token = jwt.sign(JwtPayload, config.jwt_secret as string);

  return {
    user: {
      _id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
    },
    token,
  };
};

const changePassword = async (
  userData: JwtPayload,
  password: { currentPassword: string; newPassword: string },
) => {
  const user = await User.findOne({ _id: userData._id });

  if (!user) {
    throw new Error('User not found');
  }

  //checking if the password is correct

  if (
    !(await User.isPasswordMatched(password.currentPassword, user?.password))
  ) {
    throw new Error('Password do not  matched');
  }

  const previousPasswords = user.passwordHistory;

  const comparisonPromises = previousPasswords.map(async (entry) => {
    return await bcrypt.compare(password.newPassword, entry.password);
  });

  const comparisons = await Promise.all(comparisonPromises);

  if (
    comparisons.some((result) => result) ||
    (await bcrypt.compare(password.newPassword, user.password)) === true ||
    password.newPassword === password.currentPassword
  ) {
    return {
      success: false,
      statusCode: 400,
      message:
        'Password change failed. Ensure the new password is unique and not among the last 2 used (last used on 2023-01-01 at 12:00 PM).',
      data: null,
    };
  }

  //hash new password
  const newHashedPassword = await bcrypt.hash(
    password.newPassword,
    Number(config.bcrypt_salt_rounds),
  );

  const currentPasswordHistory: PasswordHistory = {
    password: user.password,
    timestamp: new Date(), 
  };

  user.passwordHistory.unshift(currentPasswordHistory);

  user.passwordHistory = user.passwordHistory.slice(0, 2);

 const updatedUser = await User.findOneAndUpdate(
    {
      _id: userData._id,
      role: userData.role,
    },
    {
      password: newHashedPassword,
      passwordHistory: user.passwordHistory,
    },	
  ).select({password:0,passwordHistory:0});

  return {
    success: true,
    statusCode: 200,
    message: 'Password changed successfully',
    data: updatedUser,
  };
};

export const AuthServices = {
  registerUser,
  loginUser,
  changePassword,
};
