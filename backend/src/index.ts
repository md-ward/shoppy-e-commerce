import express from "express";
import cors from "cors";
import { configDotenv } from "dotenv";
import userRouter from "./router/userRouter";
configDotenv();
const app: express.Application = express();
app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);
app.use("/user", userRouter);

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
