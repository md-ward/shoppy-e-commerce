import { Router } from "express";
import { getUsers, loginUser, newUser } from "../controllers/userController";
const userRouter = Router();
userRouter.post("/", newUser);
userRouter.post("/login", loginUser);
userRouter.get("/users", getUsers);
export default userRouter;
