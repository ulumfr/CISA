import { Request, Response } from "express";
import connect from "../utils/database";
import strukturModel from "../models/struktur.model";
import removeFile from "../utils/remove.file";

import { db } from "../server";
export default {
  async changeStructure(req: Request, res: Response) {
    try {
      const strukturModel: strukturModel = req.body;
      const conn = await db;
      const [oldImage] = await conn.query<any>(`select imageName from struktur where id = 1`);
      // console.log(oldImage[0].imageName);

      removeFile(oldImage[0].imageName);
      const imagePaths = req.file as Express.Multer.File | undefined;
      const imageUrl = imagePaths?.filename;

      if (!imageUrl) return res.status(500).json({ message: "Input gambar kosong" });
      console.log(imageUrl);

      await conn.query("update struktur set imageName = ? where id=1", [imageUrl]);

      res.status(200).json({
        message: "Berhasil Mengganti Struktur",
        // result: imageUrl,
      });
    } catch (error) {
      const err = error as Error;
      res.status(500).json({
        information: err.message,
        message: "Gagal update data struktur!",
      });
    }
  },
  async getStucture(req: Request, res: Response) {
    try {
      const conn = await db;
      const [result] = await conn.query<any>("select imageName from struktur where id = 1");

      return res.status(200).json({
        result,
      });
    } catch (error) {
      const err = error as Error;
      res.status(500).json({
        information: err.message,
        message: "Gagal menampilkan struktur!",
      });
    }
  },
};
