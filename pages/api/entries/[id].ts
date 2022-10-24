import type { NextApiRequest, NextApiResponse } from 'next';
import mongoose from 'mongoose';

import { db } from '../../../database';
import { EntryModel, IEntry } from '../../../models';

type Data =
  | { message: string }
  | IEntry;

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { id } = req.query;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ message: `The id ${id} is not a valid id` })
  }

  switch (req.method) {
    case 'PUT':
      return updateEntry(req, res);

    case 'GET':
      return getEntry(req, res);

    default:
      return res.status(400).json({ message: 'Method not allowed' });
  }
}

const updateEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { id } = req.query;

  await db.connect();

  const entryToUpdate = await EntryModel.findById(id);

  if (!entryToUpdate) {
    await db.disconnect();
    return res.status(400).json({ message: `There is not a entry with the id: ${id}` });
  }

  const {
    description = entryToUpdate.description,
    status = entryToUpdate.status
  } = req.body;

  try {
    const updatedEntry = await EntryModel.findByIdAndUpdate(id, { description, status }, { runValidators: true, new: true });

    // entryToUpdate.description = description;
    // entryToUpdate.status = status;
    // await entryToUpdate.save();
    res.status(200).json(updatedEntry!);
  } catch (error: any) {
    console.log({ error });
    res.status(400).json({ message: error.errors.status.message })
  } finally {
    await db.disconnect();
  }
};
const getEntry = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;

  await db.connect();

  const requestedEntry = await EntryModel.findById(id);

  await db.disconnect();

  if (!requestedEntry) {
    return res.status(400).json({ message: `There is not a entry with the id: ${id}` });
  }

  res.status(200).json(requestedEntry);
};