import sharp from "sharp";
import removeFile from "./remove.file";
import fs from "fs";

const compressImage = async (fileName: any) => {
  const inputFilePath = `storage/uploads/${fileName}`;
  const tempFilePath = `storage/uploads/tenp_${fileName}`;

  await sharp(inputFilePath).jpeg({ quality: 50 }).toFile(tempFilePath);

  fs.renameSync(tempFilePath, inputFilePath);
};

export default compressImage;
