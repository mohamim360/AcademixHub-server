import { Schema, model } from 'mongoose';
import { TCourse } from './course.interface';

const courseSchema = new Schema<TCourse>(
  {
    title: {
      type: String,
      unique: true,
      required: [true, 'Title is required'],
    },
    instructor: { type: String, required: [true, 'Instructor is required'] },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: [true, 'Category id is required'],
    },
    price: { type: Number, required: [true, 'Price is required'] },
    tags: [
      {
        name: { type: String, required: [true, 'Tag name is required'] },
        isDeleted: { type: Boolean, default: false },
        _id: false,
      },
    ],
    startDate: { type: String, required: [true, 'Start date is required'] },
    endDate: { type: String, required: [true, 'End date is required'] },
    language: { type: String, required: [true, 'Language is required'] },
    provider: { type: String, required: [true, 'Provider is required'] },
    durationInWeeks: { type: Number, required: [true, 'Duration is required'] },
    details: {
      level: {
        type: String,
        enum: ['Beginner', 'Intermediate', 'Advanced'],
        required: [true, 'Level is required'],
      },
      description: {
        type: String,
        required: [true, 'Description is required'],
      },
    },

    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { versionKey: false, timestamps: true },
);

export const Course = model<TCourse>('Course', courseSchema);
