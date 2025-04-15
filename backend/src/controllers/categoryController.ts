import { Request, Response } from "express";
import { PrismaClient } from "../../prisma/generated";

const prisma = new PrismaClient();

export const createCategory = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name } = req.body;
    const category = await prisma.category.create({
      data: { name },
    });
    res
      .status(201)
      .send({ message: "Category created successfully", category });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error creating category" });
  }
};

export const getCategories = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const categories = await prisma.category.findMany();
    res
      .status(200)
      .send({ message: "Categories fetched successfully", categories });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error fetching categories" });
  }
};

export const getCategoryById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const category = await prisma.category.findUnique({
      where: { id: Number(id) },
    });
    if (category) {
      res
        .status(200)
        .send({ message: "Category fetched successfully", category });
    } else {
      res.status(404).send({ message: "Category not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error fetching category" });
  }
};

export const deleteCategory = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    await prisma.category.delete({
      where: { id: Number(id) },
    });
    res.status(200).send({ message: "Category deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error deleting category" });
  }
};
