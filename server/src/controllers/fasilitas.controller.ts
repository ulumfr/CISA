import { Request, Response } from "express";
import fasilitasModel from "../models/fasilitas.model";
import removeFile from "../utils/remove.file";
import { db } from "../server";

export default {
  async createData(req: Request, res: Response) {
    try {
      const conn = await db;
      const dataModel: fasilitasModel = req.body;
      const sekolahId = req.query.sekolahId;
      let date_time = new Date();

      const imagePaths = req.file as Express.Multer.File | undefined;
      const imageUrl = imagePaths?.filename;

      if (!dataModel.namaFasilitas && !sekolahId && !imageUrl) {
        return res.status(400).json({message: "Semua kolom harus diisi"});
      } else if (!dataModel.namaFasilitas) {
        return res.status(400).json({message: "Judul fasilitas harus diisi"});
      } else if (!sekolahId) {
        return res.status(400).json({message: "Harus memilih sekolah"});
      } else if (!imageUrl) {
        return res.status(400).json({message: "Minimal upload gambar"});
      }

      const tanggalDibuat = date_time.toISOString().slice(0,10)
      await conn.query(`insert into fasilitas (namaFasilitas, imageName,sekolahId,tanggalDibuat) values (?,?,?,?)`, [
        dataModel.namaFasilitas,
        imageUrl,
        sekolahId,
        tanggalDibuat
      ]);

      res.status(201).json({
        message: "Fasilitas berhasil dibuat",
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
      const conn = await db;
      const dataModel: fasilitasModel = req.body;
      const id = req.params.id;

      const [oldImage] = await conn.query<any>("select imageName from fasilitas where id = ?", [id]);
      const imagePaths = req.file as Express.Multer.File | undefined;
      const imageUrl = imagePaths?.filename;

      if (!dataModel.namaFasilitas && !dataModel.sekolahId && !imageUrl) {
        return res.status(400).json({message: "Semua kolom harus diisi"});
      } else if (!dataModel.namaFasilitas) {
        return res.status(400).json({message: "Judul fasilitas harus diisi"});
      } else if (!dataModel.sekolahId) {
        return res.status(400).json({message: "Harus memilih sekolah"});
      } else if (!imageUrl) {
        return res.status(400).json({message: "Minimal upload gambar"});
      }
      
      let updateWithImage;
      if (imageUrl) {
        removeFile(oldImage[0].imageName);
        updateWithImage = await conn.query(`update fasilitas set  imageName=? where id = ?`, [imageUrl, id]);
      }

      if (dataModel.namaFasilitas || dataModel.sekolahId) {
        await conn.query(`update fasilitas set ? where id = ?`, [dataModel, id]);
      }

      return res.status(200).json({
        message: "Fasilitas berhasil diupdate",
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

      return res.status(200).json({ message: "Fasilitas berhasil dihapus" });
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
