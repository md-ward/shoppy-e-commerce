import express from "express";
import cors from "cors";
import { configDotenv } from "dotenv";
import userRouter from "./router/userRouter";
import productRouter from "./router/productRouter";
import categoryRouter from "./router/categoryRouter";
import cookieParser from "cookie-parser";
configDotenv();
const app: express.Application = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/public", express.static("./public"));

app.use(
  cors({
    credentials: true,
    origin:'*',
  })
);
app.use("/users", userRouter);
app.use("/products", productRouter);
app.use("/categories", categoryRouter);

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
