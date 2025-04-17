import multer, { diskStorage } from "multer";
import path from "path";
import fs from "fs";
import { NextFunction, Request, Response } from "express";
const storage = diskStorage({
  destination: (req, file, cb) => {
    // Define the folder path
    const uploadPath = path.join(__dirname, `../../`, "public", "products");
    console.log({ uploadPath });
    // Ensure the directory exists, create it if not

    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    cb(null, uploadPath); // Set the upload destination folder dynamically
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });
const uploadMediaMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  upload.any()(req, res, (err) => {
    console.log({ files: req.files });

    if (err instanceof multer.MulterError) {
      return res.status(400).json({ message: err.message });
    } else if (err) {
      return res.status(400).json({ message: err.message });
    }

    const files = req.files as Express.Multer.File[];

    if (!files || files.length === 0) {
      console.log("No files uploaded");
      req.body.filesURLs = [];
      return next(); // Still proceed but with empty list
    }

    const protocol = req.protocol;
    const host = req.get("host");

    const fileUrls = files.map((file) => {
      console.log("Uploaded file:", file.originalname);
      return `${protocol}://${host}/public/products/${file.filename}`;
    });

    // Assign to body so controller can access
    req.body.filesURLs = fileUrls;

    next(); // ✅ proceed AFTER processing
  });
};

export default uploadMediaMiddleware;
