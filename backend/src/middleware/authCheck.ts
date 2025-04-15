import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
export const authCheck = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header("authToken");
  if (!token) {
    return res.status(401).send({ msg: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET as string);
    req.body.user = decoded;
    next();
  } catch (error) {
    res.status(401).send({ msg: "Token is not valid" });
  }
};
