import { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../database";
import { Category } from "../../../interfaces";
import { CategoryModel } from "../../../models";

type Data =
  | { message: string }
  | Category;

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

  switch (req.method) {
    case 'PUT':
      return updateCategory(req, res);

    case 'GET':
      return getCategory(req, res);

    case 'DELETE':
      return deleteCategory(req, res);

    default:
      return res.status(400).json({ message: 'This method is not allowed' });
  }
}

const updateCategory = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { id } = req.query;

  try {
    await db.connect();
    const categoryToUpdate = await CategoryModel.findById(id);

    if (!categoryToUpdate) {
      await db.disconnect();
      return res.status(400).json({ message: 'Category already exists' });
    }

    const { name = '', tickets = [], indexOrder } = req.body;

    const updatedCategory = await CategoryModel.findByIdAndUpdate(id, { name, tickets, indexOrder }, { runValidators: true, new: true })

    return res.status(200).json(updatedCategory!);
  } catch (error: any) {
    await db.disconnect();
    return res.status(400).json({ message: error.errors.status.message })
  }
};

const getCategory = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  try {
    const { id } = req.query;

    await db.connect();

    const requestedCategory = await CategoryModel.findById(id);

    if (!requestedCategory) {
      return res.status(400).json({ message: `There is not a category with the id: ${id}` });
    }

    res.status(200).json(requestedCategory);
  } catch (error) {
    console.log(error);

    await db.disconnect();
    return res.status(500).json({ message: 'Something went wrong' });
  }
};

const deleteCategory = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  try {
    const { id } = req.query;

    await db.connect();

    const deletedCategory = await CategoryModel.findByIdAndRemove(id);

    if (!deletedCategory) {
      return res.status(400).json({ message: `There is not a category with the id: ${id}` });
    };

    return res.status(200).json(deletedCategory);
  } catch (error) {
    console.log(error);

    await db.disconnect();
    return res.status(500).json({ message: 'Something went wrong' });
  }
};