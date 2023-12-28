import config from '../../config';
import { TUser } from '../user/user.interface';
import { User } from '../user/user.model';
import { TLoginUser } from './auth.interface';
import jwt from 'jsonwebtoken';

const registerUser = async (user: TUser) => {
  const savedUser = await User.create(user);
  const result = await User.findOne({ _id: savedUser._id }, { password: 0 });
  return result;
};

const loginUser = async (userData: TLoginUser) => {
  // checking if the user is exist
  const user = await User.findOne({ username: userData.username });

  console.log('user:', user); // Log the user object

  if (!user) {
    throw new Error('User not found');
  }

  console.log('user.password:', user.password);
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

export const AuthServices = {
  registerUser,
  loginUser,
};
