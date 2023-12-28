/* eslint-disable no-unused-vars */
import { Model } from "mongoose";

export interface TUser  {
  username: string;
  email: string;
  password: string;
  role: 'user' | 'admin';
}

export interface UserModel extends Model<TUser> {

  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;

}