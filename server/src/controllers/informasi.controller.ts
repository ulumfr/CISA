import { Request, Response } from "express";
import informasiModel from "../models/informasi.model";
import removeFile from "../utils/remove.file";
import { ResultSetHeader } from "mysql2";

import { db } from "../server";

export default {
  async createData(req: Request, res: Response) {
    try {
      const conn = await db;
      const data: informasiModel = req.body;

      const files = req.files as Express.Multer.File[] | undefined;
      const imagePaths = files ? files.map((file: { filename: string }) => file.filename) : [];

      if (imagePaths.length > 5) {  
        return res.status(400).json({ message: "Pilihan maksimal 5 foto" });
      }

      const cleanedDesc = data.deskripsi.replace(/<\/?[^>]+(>|$)/g, "").trim();

      if (!data.judul && !cleanedDesc && !data.tanggal && data.sekolahId.length === 0 && imagePaths.length === 0) {
        return res.status(400).json({ message: "Semua kolom harus diisi" });
      } else if (!data.judul) {
        return res.status(400).json({ message: "Judul informasi harus diisi" });
      } else if (!cleanedDesc) {
        return res.status(400).json({ message: "Deskripsi informasi harus diisi" });
      } else if (!data.tanggal) {
        return res.status(400).json({ message: "Tanggal informasi harus diisi" });
      } else if (data.sekolahId.length === 0) {
        return res.status(400).json({ message: "Harus memilih minimal 1 sekolah" });
      } else if (imagePaths.length === 0) {
        return res.status(400).json({ message: "Minimal 1 gambar yang harus diupload" });
      }

      const [insertData] = await conn.query<ResultSetHeader>(
        `INSERT INTO informasi (judul,tanggal,deskripsi) values (?,?,?)`,
        [data.judul, data.tanggal, data.deskripsi]
      );

      const informasiId = insertData.insertId;
      const tagsArray = data.sekolahId.split(",");

      for (const sekolahId of tagsArray) await conn.query(`insert into taginformasi(informasiId,sekolahId) values (?,?) `, [informasiId, sekolahId]);

      for (const imagePath of imagePaths) await conn.query("INSERT INTO imageinformasi (informasiId, fileName) VALUES (?, ?)", [informasiId, imagePath]);

      return res.status(201).json({ message: "Informasi berhasil dibuat" });
    } catch (error) {
      const err = error as Error;
      res.status(500).json({
        information: err.message,
        message: "Gagal membuat informasi!",
      });
    }
  },
  async updateData(req: Request, res: Response) {
    try {
      const informasiId = req.params.id;
      const idImage = req.query.idImage;
      const data: informasiModel = req.body;
      const conn = await db;

      const files = req.files as Express.Multer.File[] | undefined;
      const imagePaths = files ? files.map((file: { filename: string }) => file.filename) : [];

      if (imagePaths.length > 5) {
        return res.status(400).json({ message: "Pilihan maksimal 5 foto" });
      }

      const cleanedDesc = data.deskripsi?.replace(/<\/?[^>]+(>|$)/g, "").trim();

      if (!data.judul && !cleanedDesc && !data.tanggal && data.sekolahId.length === 0 && imagePaths.length === 0) {
        return res.status(400).json({ message: "Semua kolom harus diisi" });
      } else if (!data.judul) {
        return res.status(400).json({ message: "Judul informasi harus diisi" });
      } else if (!cleanedDesc) {
        return res.status(400).json({ message: "Deskripsi informasi harus diisi" });
      } else if (!data.tanggal) {
        return res.status(400).json({ message: "Tanggal informasi harus diisi" });
      } else if (data.sekolahId.length === 0) {
        return res.status(400).json({ message: "Harus memilih minimal 1 sekolah" });
      } else if (imagePaths.length === 0) {
        return res.status(400).json({ message: "Minimal 1 gambar yang harus diupload" });
      }

      if (idImage) {
        const idImageArray = (idImage as string).split(",");
        const [oldImages] = await conn.query<any>(
          `SELECT fileName FROM imageinformasi WHERE idImage IN (?) AND informasiId = ?`,
          [idImageArray, informasiId]
        );

        for (const img of oldImages) {
          removeFile(img.fileName);
        }
        await conn.query(
          `DELETE FROM imageinformasi WHERE idImage IN (?) AND informasiId = ?`,
          [idImageArray, informasiId]
        );
      }

      for (const imagePath of imagePaths) {
        await conn.query(
          `INSERT INTO imageinformasi (informasiId, fileName) VALUES (?, ?)`,
          [informasiId, imagePath]
        );
      }

      const tagsArray = data.sekolahId.split(",");
      if (tagsArray) {
        await conn.query(`DELETE FROM taginformasi WHERE informasiId = ?`, [
          informasiId,
        ]);

        for (const sekolahId of tagsArray) {
          await conn.query(
            `INSERT INTO taginformasi (informasiId, sekolahId) VALUES (?, ?)`,
            [informasiId, sekolahId]
          );
        }
      }

      if (data.judul) {
        await conn.query(`UPDATE informasi SET judul = ? WHERE id = ?`, [
          data.judul,
          informasiId,
        ]);
      }
      if (data.deskripsi) {
        await conn.query(`UPDATE informasi SET deskripsi = ? WHERE id = ?`, [
          data.deskripsi,
          informasiId,
        ]);
      }
      if (data.tanggal) {
        await conn.query(`UPDATE informasi SET tanggal = ? WHERE id = ?`, [
          data.tanggal,
          informasiId,
        ]);
      }

      return res.status(200).json({
        message: "Informasi berhasil diupdate",
      });
    } catch (error) {
      const err = error as Error;
      res.status(500).json({
        information: err.message,
        message: "Gagal update data informasi!",
      });
    }
  },
  async deleteData(req: Request, res: Response) {
    try {
      const conn = await db;
      const id = req.params.id;

      const [imagePath] = await conn.query<any>(
        `select fileName from imageinformasi where informasiId = ?`,
        [id]
      );
      if (imagePath.length <= 0)
        return res.status(404).json({ message: "File not found" });

      for (const imageDelete of imagePath) {
        removeFile(imageDelete.fileName);
      }

      await conn.query(`delete from taginformasi where informasiId = ?`, [id]);
      await conn.query(`DELETE FROM imageinformasi  WHERE informasiId = ?`, [
        id,
      ]);
      await conn.query(`DELETE FROM informasi  WHERE id = ?`, [id]);

      return res.status(200).json({
        message: "Informasi berhasil dihapus",
      });
    } catch (error) {
      const err = error as Error;
      res.status(500).json({
        information: err.message,
        message: "Gagal hapus data informasi!",
      });
    }
  },
  async displayData(req: Request, res: Response) {
    try {
      const conn = await db;
      const [rows] = await conn.query<any>(
        `SELECT 
          i.*, 
          DATE_FORMAT(i.tanggal, '%Y-%m-%d') AS tanggal,
          GROUP_CONCAT(DISTINCT ii.idImage ORDER BY ii.idImage ASC) AS idImage, 
          GROUP_CONCAT(DISTINCT ii.fileName ORDER BY ii.idImage ASC) AS fileName,  
          (
            SELECT GROUP_CONCAT(DISTINCT s.namaSekolah ORDER BY s.id ASC)
            FROM sekolah s
            JOIN taginformasi ti ON ti.sekolahId = s.id
            WHERE ti.informasiId = i.id
          ) AS namaSekolah,
          (
            SELECT GROUP_CONCAT(DISTINCT ti.sekolahId ORDER BY ti.sekolahId ASC)
            FROM taginformasi ti
            WHERE ti.informasiId = i.id
          ) AS sekolahId
        FROM 
          informasi i 
        LEFT JOIN 
          imageinformasi ii ON i.id = ii.informasiId 
        GROUP BY 
          i.id
        order by
          tanggal desc
`
      );
      const result = (rows as any[]).map((row) => {
        const idImages = row.idImage ? row.idImage.split(",") : [];
        const fileNames = row.fileName ? row.fileName.split(",") : [];

        // Map images only if both idImages and fileNames arrays have the same length
        const images =
          idImages.length === fileNames.length
            ? fileNames.map((fileName: string, index: number) => ({
                idImage: idImages[index],
                fileName: fileName,
              }))
            : [];

        const namaSekolah = row.namaSekolah ? row.namaSekolah.split(",") : [];
        const sekolahId = row.sekolahId ? row.sekolahId.split(",") : [];

        const sekolah =
          namaSekolah.length === sekolahId.length
            ? namaSekolah.map((namaSekolah: string, index: number) => ({
                sekolahId: sekolahId[index],
                namaSekolah: namaSekolah,
              }))
            : [];

        return {
          id: row.id,
          judul: row.judul,
          tanggal: row.tanggal,
          deskripsi: row.deskripsi,
          image: images,
          sekolah: sekolah,
        };
      });

      return res.json(result);
    } catch (error) {
      const err = error as Error;
      res.status(500).json({
        information: err.message,
        message: "Gagal menampilkan data informasi!",
      });
    }
  },
  async filterData(req: Request, res: Response) {
    try {
      const sekolahId = req.query.sekolahId;
      const conn = await db;

      console.log("cek");
      if (sekolahId) {
        const [rows] = await conn.query(
          `select i.*, group_concat(ii.fileName) as fileName, s.namaSekolah from informasi i left join imageinformasi ii on i.id = ii.informasiId left join sekolah s on i.sekolahId = s.id where i.sekolahId = ? group by i.id `,
          [sekolahId]
        );
        const result = (rows as any[]).map((row) => ({
          id: row.id,
          judul: row.judul,
          tanggal: row.tanggal,
          deskripsi: row.deskripsi,
          fileName: row.fileName ? row.fileName.split(",") : [],
          namaSekolah: row.namaSekolah,
        }));
        return res.json(result);
      }
    } catch (error) {
      const err = error as Error;
      res.status(500).json({
        information: err.message,
        message: "Gagal menampilkan data informasi!",
      });
    }
  },
  async selected(req: Request, res: Response) {
    try {
      const conn = await db;
      const id = req.params.id;
      const [rows] = await conn.query(
        `SELECT 
          i.*, 
          DATE_FORMAT(i.tanggal, '%Y-%m-%d') AS tanggal,
          GROUP_CONCAT(DISTINCT ii.idImage ORDER BY ii.idImage ASC) AS idImage, 
          GROUP_CONCAT(DISTINCT ii.fileName ORDER BY ii.idImage ASC) AS fileName,  
          (
            SELECT GROUP_CONCAT(DISTINCT s.namaSekolah ORDER BY s.id ASC)
            FROM sekolah s
            JOIN taginformasi ti ON ti.sekolahId = s.id
            WHERE ti.informasiId = i.id
          ) AS namaSekolah,
          (
            SELECT GROUP_CONCAT(DISTINCT ti.sekolahId ORDER BY ti.sekolahId ASC)
            FROM taginformasi ti
            WHERE ti.informasiId = i.id
          ) AS sekolahId, 
          GROUP_CONCAT(DISTINCT ii.idImage ORDER BY ii.idImage ASC) AS idImage 
        FROM 
          informasi i 
        LEFT JOIN 
          imageinformasi ii ON i.id = ii.informasiId 
        where 
          i.id=?
        GROUP BY 
          i.id`,
        [id]
      );

      const result = (rows as any[]).map((row) => ({
        id: row.id,
        judul: row.judul,
        tanggal: row.tanggal,
        deskripsi: row.deskripsi,
        fileName: row.fileName ? row.fileName.split(",") : [],
        namaSekolah: row.namaSekolah ? row.namaSekolah.split(",") : [],
      }));
      // console.log(result)
      if (!result || result.length === 0) {
        console.log("No data found for the given id");
        return res.status(404).json({ message: "No data found" });
      }
      return res.json(result);
    } catch (error) {
      const err = error as Error;
      res.status(500).json({
        information: err.message,
        message: "Gagal menampilkan data kegiatan!",
      });
    }
  },
};
