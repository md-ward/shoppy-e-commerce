import { Request, Response } from "express";
import { PrismaClient } from "../../prisma/generated";
const prisma = new PrismaClient();

export const addProduct = async (req: Request, res: Response) => {
  try {
    const { name, description, price, categoryId, stock, images } = req.body;
    const product = await prisma.product.create({
      data: {
        name,
        description,
        price,
        categoryId,
        stock,
        images,
      },
    });

    res.status(201).send({ message: "Product added successfully", product });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error adding product" });
  }
};

export const getProducts = async (req: Request, res: Response) => {
  try {
    const page = req.query.page ? Number(req.query.page) : 1;
    const limit = req.query.limit ? Number(req.query.limit) : 10;
    const products = await prisma.product.findMany({
      skip: (page - 1) * limit,
      take: limit,
      select: {
        id: true,
        name: true,
        description: true,
        price: true,
        images: true,
        category: true,
        updatedAt: true,
      },
    });
    res
      .status(200)
      .send({ message: "Products fetched successfully", products });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error fetching products" });
  }
};

export const getProductById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await prisma.product.findUnique({
      where: { id: Number(id) },
    });
    res.status(200).send({ message: "Product fetched successfully", product });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error fetching product" });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, description, price, categoryId, stock, images } = req.body;
    const product = await prisma.product.update({
      where: { id: Number(id) },
      data: {
        name,
        description,
        price,
        categoryId,
        stock,
        images,
      },
    });
    res.status(200).send({ message: "Product updated successfully", product });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error updating product" });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await prisma.product.delete({
      where: { id: Number(id) },
    });
    res.status(200).send({ message: "Product deleted successfully", product });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error deleting product" });
  }
};

export const getProductsByCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const products = await prisma.product.findMany({
      where: { categoryId: Number(id) },
    });
    res
      .status(200)
      .send({ message: "Products fetched successfully", products });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error fetching products" });
  }
};

export const searchProducts = async (req: Request, res: Response) => {
  try {
    const { query } = req.params;
    const products = await prisma.product.findMany({
      where: {
        OR: [
          { name: { contains: query } },
          { description: { contains: query } },
        ],
      },
    });
    res
      .status(200)
      .send({ message: "Products fetched successfully", products });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error fetching products" });
  }
};

export const getRelatedProducts = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const products = await prisma.product.findMany({
      take: 4,
      where: { NOT: { id: Number(id) }, AND: { categoryId: Number(id) } },
    });
    res
      .status(200)
      .send({ message: "Products fetched successfully", products });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error fetching products" });
  }
};
