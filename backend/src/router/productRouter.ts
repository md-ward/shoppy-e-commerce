import { Router } from "express";
import {
  addProduct,
  getProductById,
  getProducts,
  getProductsByCategory,
} from "../controllers/productController";

const productRouter = Router();
productRouter.post("/", addProduct);
productRouter.get("/category/:id", getProductsByCategory);
productRouter.get("/", getProducts);
productRouter.get("/:id", getProductById);
export default productRouter;
