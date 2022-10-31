import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../database';
import { Category, CategoryModel } from '../../../models';

type Data =
  | { message: string }
  | Category
  | Category[];

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

  switch (req.method) {
    case 'POST':
      return postCategory(req, res);

    case 'GET':
      return getCategories(req, res);

    default:
      return res.status(400).json({ message: 'This method is not allowed' });
  }
}

const postCategory = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { name = '' } = req.body;

  try {
    await db.connect();
    const currentCategories = await CategoryModel.find();

    const newCategoryExists = currentCategories.find(category => category.name === name);
    if (newCategoryExists) return res.status(400).json({ message: 'Category already exists' });

    const newCategory = new CategoryModel({
      name,
      tickets: [],
      createdAt: Date.now(),
      indexOrder: !currentCategories.length ? 0 : currentCategories.length,
    });

    await newCategory.save();

    return res.status(201).json(newCategory);
  } catch (error) {
    console.log(error);

    return res.status(500).json({ message: 'Something went wrong' });
  } finally {
    await db.disconnect();
  }
};

const getCategories = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  try {
    await db.connect();
    const currentCategories = await CategoryModel.find().sort({ indexOrder: 1 });

    return res.status(200).json(currentCategories);
  } catch (error) {
    console.log(error);

    return res.status(500).json({ message: 'Something went wrong' });
  } finally {
    await db.disconnect();
  }
};