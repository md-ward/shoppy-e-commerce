import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
export const authCheck = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    const token = req.cookies.authToken;
    console.log(token);

    if (!token) {
      res.status(401).send({ msg: "No token, authorization denied" });
    } else {
      const decoded = jwt.verify(token, process.env.SECRET as string);
      console.log({ decoded });
      req.body.user = decoded;
      next();
    }
  } catch (error) {
    console.log({ error });

    res.status(401).send({ msg: "Token is not valid" });
  }
};

export const authorizationToAction = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.body.user.role === "Admin") {
    next();
  } else {
    res
      .status(403)
      .send({ msg: "You are not authorized to perform this action" });
  }
};
