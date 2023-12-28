import { Schema, model } from 'mongoose';
import { TUser, UserModel } from './user.interface';
import config from '../../config';
import bcrypt from 'bcrypt';

const passwordHistorySchema = new Schema({
  password: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const userSchema = new Schema<TUser, UserModel>(
  {
    username: {
      type: String,
      unique: true,
      required: [true, 'Username is required'],
    },
    email: {
      type: String,
      unique: true,
      required: [true, 'Email is required'],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
		passwordHistory: [passwordHistorySchema], 
  },
  { versionKey: false, timestamps: true },
);

userSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  if (!user.password) {
    return next(new Error('Password is required.'));
  }

  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );

  next();
});

userSchema.statics.isPasswordMatched = async function (
  plainTextPassword,
  hashedPassword,
) {

  return await bcrypt.compare(plainTextPassword, hashedPassword);
};

export const User = model<TUser, UserModel>('User', userSchema);
