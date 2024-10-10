import { Request, Response } from "express";
import connect from "../utils/database";
import fasilitasModel from "../models/fasilitas.model";
import removeFile from "../utils/remove.file";
import * as Yup from "yup";

import { db } from "../server";
const createValidationSchema = Yup.object().shape({
  namaFasilitas: Yup.string().required("Nama fasilitas harus diisi").typeError("Inputan untuk 'namaFasilitas' harus berupa huruf"),
});
const updateValidationSchema = Yup.object().shape({
  namaFasilitas: Yup.string().typeError("Inputan untuk 'namaFasilitas' harus berupa huruf"),
  sekolahId: Yup.number().typeError("Inputan untuk 'sekolahId' harus berupa angka"),
});

export default {
  async createData(req: Request, res: Response) {
    try {
      await createValidationSchema.validate(req.body);
      const conn = await db;
      const dataModel: fasilitasModel = req.body;
      const sekolahId = req.query.sekolahId;
      let date_time = new Date();

      const imagePaths = req.file as Express.Multer.File | undefined;
      const imageUrl = imagePaths?.filename;

      if (!imageUrl) return res.status(500).json({ message: "Input gambar kosong" });

      const tanggalDibuat = date_time.toISOString().slice(0,10)
      await conn.query(`insert into fasilitas (namaFasilitas, imageName,sekolahId,tanggalDibuat) values (?,?,?,?)`, [
        dataModel.namaFasilitas,
        imageUrl,
        sekolahId,
        tanggalDibuat
      ]);

      res.status(201).json({
        message: "Fasilitas Berhasil dibuat",
      });
    } catch (error) {
      const err = error as Error;
      res.status(500).json({
        information: err.message,
        message: "Gagal membuat data Fasilitas!",
      });
    }
  },
  async updateData(req: Request, res: Response) {
    try {
      await updateValidationSchema.validate(req.body);
      const conn = await db;
      const dataModel: fasilitasModel = req.body;
      const id = req.params.id;

      const [oldImage] = await conn.query<any>("select imageName from fasilitas where id = ?", [id]);

      const imagePaths = req.file as Express.Multer.File | undefined;
      const imageUrl = imagePaths?.filename;

      let updateWithImage;
      if (imageUrl) {
        removeFile(oldImage[0].imageName);
        // console.log(oldImage[0].imageName);
        // console.log("cek");
        updateWithImage = await conn.query(`update fasilitas set  imageName=? where id = ?`, [imageUrl, id]);
      }
      let updateFasilitas;

      if (dataModel.namaFasilitas || dataModel.sekolahId) {
        await conn.query(`update fasilitas set ? where id = ?`, [dataModel, id]);
      }

      return res.status(200).json({
        message: "Fasilitas berhasil diubah",
      });
    } catch (error) {
      const err = error as Error;
      res.status(500).json({
        information: err.message,
        message: "Gagal update data fasilitas!",
      });
    }
  },

  async deleteData(req: Request, res: Response) {
    try {
      const conn = await db;
      const id = req.params.id;

      const [imagePath] = await conn.query<any>(`select imageName from fasilitas where id = ?`, [id]);

      removeFile(imagePath[0].imageName);

      await conn.query(`delete from fasilitas where id = ?`, [id]);

      return res.status(200).json({ message: "Fasilitas dihapus" });
    } catch (error) {
      const err = error as Error;
      res.status(500).json({
        information: err.message,
        message: "Gagal menghapus data fasilitas!",
      });
    }
  },
  async displayData(req: Request, res: Response) {
    try {
      const conn = await db;
      const display = await conn.query(`select f.*, DATE_FORMAT(f.tanggalDibuat, '%Y-%m-%d') AS tanggalDibuat, s.namaSekolah from fasilitas f join sekolah s on f.sekolahId = s.id order by f.id desc`);
      return res.status(200).json(display[0]);
    } catch (error) {
      const err = error as Error;
      res.status(500).json({
        information: err.message,
        message: "Gagal menampilkan data fasilitas!",
      });
    }
  },
};
