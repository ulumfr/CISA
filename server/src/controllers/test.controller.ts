import { Request, Response } from "express";
import connect from "../utils/database";
import Sekolah from "../models/sekolah.model";

export default {
  async createSchool(req: Request, res: Response) {
    const newPost: Sekolah = req.body;
    const conn = await connect();
    const result = await conn.query(`INSERT INTO test set ?`, [newPost]);
    return res.json({
      message: "Sekolah created",
      result,
    });
  },
  async displayData(req: Request, res: Response) {
    const conn = await connect();
    const result = await conn.query("SELECT * FROM test");
    return res.json(result[0]);
  },
  async cekArray(req: Request, res: Response) {
    const tag = req.body;
    console.log(tag);
    const tagsArray = tag.tagSekolah.split(",");

    for (const display of tagsArray) {
      console.log(display);
    }

    return res.json(tagsArray);
  },
  async tesImage(req: Request, res: Response) {
    const conn = await connect();
    const imagePaths = req.file as Express.Multer.File | undefined;
    const imageUrl = imagePaths?.filename;

    console.log(imagePaths)

    // return res.json({
    //   imagePaths[0]
    // })

  },
};
