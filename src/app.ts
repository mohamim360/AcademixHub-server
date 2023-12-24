import { ReviewRoutes } from './app/modules/reviews/review.route';

// Importing modules
import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import { CourseRoutes } from './app/modules/course/course.route';
import globalErrorHandler from './app/middlewares/globalErrorhandler';
import { CategoryRoutes } from './app/modules/category/category.route';

const app: Application = express();

//parsers
app.use(express.json());
app.use(cors());

//course routes
app.use('/api', CourseRoutes);

//review routes
app.use('/api', ReviewRoutes);

//category routes
app.use('/api', CategoryRoutes);

// global error route
app.use(globalErrorHandler)

app.use('/', (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: 'Course Review A3',
  });
});

export default app;
