import { isValidObjectId } from "mongoose";
import { db } from ".";
import { IEntry, EntryModel } from "../models";

export const getTicketById = async (id: string): Promise<IEntry | null> => {

  if (!isValidObjectId) return null;

  await db.connect();

  const ticket = await EntryModel.findById(id).lean();

  await db.disconnect();

  return JSON.parse(JSON.stringify(ticket));
};