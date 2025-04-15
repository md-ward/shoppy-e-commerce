import { Router } from "express";
import {
  createCategory,
  getCategories,
  getCategoryById,
} from "../controllers/categoryController";

const categoryRouter = Router();
categoryRouter.post("/", createCategory);
categoryRouter.get("/category/:id", getCategoryById);
categoryRouter.get("/", getCategories);
export default categoryRouter;
