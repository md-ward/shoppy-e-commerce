import multer, { diskStorage } from "multer";
import path from "path";
import fs from "fs";
import { NextFunction, Request, Response } from "express";
import { PrismaClient } from "../../prisma/generated";

const prisma = new PrismaClient();

const storage = diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, "../../", "public", "products");

    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname); // avoid name collisions
  },
});

const upload = multer({ storage });

const uploadMediaMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  upload.any()(req, res, async (err) => {
    if (err instanceof multer.MulterError || err) {
      return res.status(400).json({ message: err.message });
    }

    const files = req.files as Express.Multer.File[];

    if (!files || files.length === 0) {
      req.body.filesURLs = [];
      console.log("no files");
      
      return next();
    }

    const protocol = req.protocol;
    const host = req.get("host");

    try {
      const attachments = await Promise.all(
        files.map((file) => {
          return prisma.attachments.create({
            data: {
              url: `${protocol}://${host}/public/products/${file.filename}`,
            },
          });
        })
      );

      console.log({ attachments });

      req.body.filesURLs = attachments; // pass created Attachment records to controller
      next();
    } catch (uploadErr) {
      return res
        .status(500)
        .json({ message: "Failed to save attachments", error: uploadErr });
    }
  });
};

export default uploadMediaMiddleware;
