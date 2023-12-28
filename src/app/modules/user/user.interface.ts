/* eslint-disable no-unused-vars */
import { Model } from "mongoose";
import { USER_ROLE } from "./user.constant";

export type PasswordHistory = {
  password: string;
  timestamp: Date;
}

export interface TUser  {
  username: string;
  email: string;
  password: string;
  role: 'user' | 'admin';
  passwordHistory: PasswordHistory[]; 
}

export interface UserModel extends Model<TUser> {

  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;

}

export type TUserRole = keyof typeof USER_ROLE;