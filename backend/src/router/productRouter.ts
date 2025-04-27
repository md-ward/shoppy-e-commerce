import { Router } from "express";
import {
  addProduct,
  getProductById,
  getProducts,
  getProductsByCategory,
} from "../controllers/productController";
import { authCheck, authorizationToAction } from "../middleware/authCheck";
import uploadMediaMiddleware from "../middleware/uploadMedia";


const productRouter = Router();
productRouter.post(
  "/",
  authCheck,
  authorizationToAction,
  uploadMediaMiddleware,
  addProduct
);
productRouter.get("/category/:id", getProductsByCategory);
productRouter.get("/", getProducts);
productRouter.get("/:id", getProductById);
export default productRouter;
