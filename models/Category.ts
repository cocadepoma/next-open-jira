import mongoose, { Model, Schema } from "mongoose";
import { Category } from "../interfaces";
import { entrySchema, IEntry } from "./Entry";

export interface ICategory extends Category { }

const categorySchema = new Schema({
  name: { type: String, required: true },
  tickets: {
    type: [entrySchema],
    default: []
  },
  createdAt: { type: Number },
  indexOrder: { type: Number },
});

const CategoryModel: Model<Category> = mongoose.models.Category || mongoose.model('Category', categorySchema);

export default CategoryModel;