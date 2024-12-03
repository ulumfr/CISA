import multer from "multer";
import path from "path";
import { encryptImage } from "../utils/encryption";
import sharpCompression from "sharp";
import compressImage from "../utils/compress.image";
import { Request, Response, NextFunction, RequestHandler } from "express";

const storage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, "./storage/uploads");
  },
  filename(req, file, callback) {
    const KEY_UPLOAD: string = process.env.SECRET || "";
    const hash = encryptImage(KEY_UPLOAD, file.originalname);
    const ext = path.extname(file.originalname);
    callback(null, `${file.fieldname}-${hash}${ext}`);
  },
});

const handleMulterError = (err: any, req: any, res: any, next: Function) => {
  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_UNEXPECTED_FILE") {
      // console.log(req);
      
      return res.status(400).json({ message:"Pilihan maksimal 5 foto" });
    }
    // Handle other Multer errors
    return res.status(400).json({ error: err.message });
  }
  next(err); // Pass other errors to the default error handler
};
const compress: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  if (req.file && req.file.size > 1000) {
    await compressImage(req.file.filename);
  }
  next();
};

// Multiple files compression middleware
const compressImages: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  if (req.files && Array.isArray(req.files)) {
    for (const img of req.files) {
      if (img.size > 5000) {
        await compressImage(img.filename);
      }
    }
  }
  next();
};
const upload = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 20000,
  },

  fileFilter(_, file, callback) {
    const allowedMimes = ["image/jpeg", "image/png", "image/jpg"];
    if (allowedMimes.includes(file.mimetype)) {
      callback(null, true);
    } else {
      callback(new Error(`Permitted ${file.mimetype}. Only JPEG and PNG files are allowed.`));
    }
  },
});

// export const single = upload.single("file");
// export const multiple = upload.array("files", 10);

export const single = [upload.single("file"), compress];
export const multiple = [upload.array("files", 5), compressImages,handleMulterError];

export default {
  single,
  multiple,
};
