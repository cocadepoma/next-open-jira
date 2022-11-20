import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../database';
import { CategoryModel, EntryModel, IEntry } from '../../../models';

type Data =
  | { message: string }
  | { entry: IEntry }
  | IEntry[];

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

  switch (req.method) {
    case 'GET':
      return getEntries(res);

    case 'POST':
      return postEntry(req, res);
    default:
      return res.status(400).json({ message: 'This method is not allowed' });
  }
}

const getEntries = async (res: NextApiResponse<Data>) => {
  try {
    await db.connect();
    const entries = await EntryModel.find().sort({ indexOrder: 'ascending' });

    res.status(200).json(entries);
  } catch (error) {
    console.log({ error });

    await db.disconnect();
    return res.status(500).json({ message: 'Something went wrong' });
  }
};

const postEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { description = '', content = '', categoryId } = req.body;

  try {
    await db.connect();

    const category = await CategoryModel.findById(categoryId);
    if (!category) return res.status(500).json({ message: 'Category does not exist' });

    const newEntry = new EntryModel({
      content,
      description,
      createdAt: Date.now(),
      categoryId: category._id
    });

    await newEntry.save();

    await CategoryModel.findByIdAndUpdate(categoryId, { name: category.name, tickets: [...category.tickets, newEntry] }, { runValidators: true, new: true });

    return res.status(201).json({ entry: newEntry });
  } catch (error) {
    console.log({ error });

    await db.disconnect();
    return res.status(500).json({ message: 'Something went wrong' });
  }
};