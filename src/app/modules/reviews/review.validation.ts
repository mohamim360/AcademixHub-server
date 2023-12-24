import { z } from 'zod';
export const reviewValidationSchema = z.object({
  body: z.object({
    courseId: z.string(),
    rating: z.number().int().min(1).max(5),
    review: z.string().min(1),
  }),
});
