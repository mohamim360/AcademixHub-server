import { z } from 'zod';

export const userValidationSchema = z.object({
  body: z.object({
    username: z.string().min(1, { message: 'Username is required' }),
    email: z.string().email({ message: 'Invalid email format' }),
    password: z
      .string({
        invalid_type_error: 'Password must be string',
      })
      .min(6, { message: 'Password must be at least 6 characters long' }),
    role: z.enum(['user', 'admin']),
  }),
});

export const UserValidation = {
  userValidationSchema,
};
