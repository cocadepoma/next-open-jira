import mongoose, { Model, Schema } from "mongoose";
import { Entry, Entries } from "../interfaces";

export interface IEntry extends Entry { }

export const entrySchema = new Schema({
  description: { type: String, },
  createdAt: { type: Number },
  categoryId: { type: String },
  content: { type: String },
  color: { type: String },
});

const EntryModel: Model<IEntry> = mongoose.models.Entry || mongoose.model('Entry', entrySchema);

export default EntryModel;