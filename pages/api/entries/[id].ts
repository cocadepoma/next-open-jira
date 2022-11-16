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

    case 'DELETE':
      return deleteEntry(req, res);

    default:
      return res.status(400).json({ message: 'Method not allowed' });
  }
}

const updateEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { id } = req.query;

  await db.connect();

  const entryToUpdate = await EntryModel.findById(id);

  if (!entryToUpdate) {
    return res.status(400).json({ message: `There is not a entry with the id: ${id}` });
  }

  const {
    description = entryToUpdate.description,
    categoryId = entryToUpdate.categoryId,
  } = req.body;

  try {
    const updatedEntry = await EntryModel.findByIdAndUpdate(id, { description, categoryId }, { runValidators: true, new: true });

    // entryToUpdate.description = description;
    // entryToUpdate.status = status;
    // await entryToUpdate.save();
    res.status(200).json(updatedEntry!);
  } catch (error: any) {
    await db.disconnect();

    console.log({ error });
    res.status(400).json({ message: error.errors.status.message })
  }
};

const getEntry = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { id } = req.query;

    await db.connect();

    const requestedEntry = await EntryModel.findById(id);


    if (!requestedEntry) {
      return res.status(400).json({ message: `There is not a entry with the id: ${id}` });
    }

    res.status(200).json(requestedEntry);
  } catch (error) {
    console.log({ error });

    await db.disconnect();
    return res.status(500).json({ message: 'Something went wrong' });
  }
};

const deleteEntry = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { id } = req.query;

    await db.connect();

    const deletedEntry = await EntryModel.findByIdAndRemove(id);


    if (!deletedEntry) {
      return res.status(400).json({ message: `There is not a entry with the id: ${id}` });
    }

    res.status(200).json(deletedEntry);
  } catch (error) {
    console.log({ error });

    await db.disconnect();
    return res.status(500).json({ message: 'Something went wrong' });
  }
};
