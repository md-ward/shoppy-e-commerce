import { Router } from "express";
import {
  createCategory,
  getCategories,
  getCategoryById,
} from "../controllers/categoryController";
import { authCheck, authorizationToAction } from "../middleware/authCheck";

const categoryRouter = Router();
categoryRouter.post("/", createCategory);
categoryRouter.get("/category/:id", getCategoryById);
categoryRouter.get("/", authCheck, authorizationToAction, getCategories);
export default categoryRouter;
