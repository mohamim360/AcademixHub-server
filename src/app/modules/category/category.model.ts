import { Schema, model } from 'mongoose';
import { TCategory } from './category.interface';

const categorySchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
      required: [true, 'name is required'],
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { versionKey: false ,timestamps:true},
);

export const Category = model<TCategory>('Category', categorySchema);
