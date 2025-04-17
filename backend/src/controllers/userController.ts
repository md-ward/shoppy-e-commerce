import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { ExpiryOption, generateToken } from "../util/generateTokens";
import { Prisma, PrismaClient } from "../../prisma/generated";

const prisma = new PrismaClient();

export const getUsers = async (req: Request, res: Response): Promise<void> => {

  try {
  
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        phone: true,
      },
    });
    res.status(200).json(users);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: `Error retrieving users: ${error.message}` });
  }
};

export const newUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password, phone } = req.body as typeof req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        name,
        password: hashedPassword,
        email,
        phone,
        role: "User",
      },
    });

    const token = generateToken(
      { id: newUser.id, email: newUser.email },
      ExpiryOption.oneMonth
    );
    res.header("Access-Control-Allow-Credentials", "true");
    res.cookie("authToken", token, { httpOnly: true, sameSite: false });
    res.status(201).json({ message: "User registered successfully." });
  } catch (error: any) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      if (error.meta?.target === "email") {
        res.status(400).json({ message: "Email is already in use." });
      }
    }
    res.status(500).json({ message: `Error creating user: ${error.message}` });
  }
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body as typeof req.body;
  try {
    const user = await prisma.user.findUnique({
      where: { email: email },
    });

    if (!user) {
      res.status(401).json({ message: "Invalid username or password" });
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (isPasswordValid) {
      const token = generateToken(
        {
          id: user.id,
          email: user.email,
          role: user.role,
        },
        ExpiryOption.oneMonth
      );
      res.cookie("authToken", token, { httpOnly: true, secure: false });
      res.status(200).json({
        message: "Login successful",
      });
    } else {
      res.status(401).json({ message: "Invalid username or password" });
    }
  } catch (error: any) {
    res.status(500).json({ message: `Error logging in: ${error.message}` });
  }
};
