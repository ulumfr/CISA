import { Request, Response } from "express";
import Sekolah from "../models/sekolah.model";

import { db } from "../server";
import userModel from "../models/user.model";

export default {
  async displayData(req: Request, res: Response) {
    try {
      const conn = await db;
      const result =
        await conn.query(`SELECT sekolah.*,users.id as userId, users.noHandphone FROM sekolah 
     LEFT JOIN users ON users.sekolahId = sekolah.id `);
      return res.status(200).json(result[0]);
    } catch (error) {
      const err = error as Error;
      res.status(500).json({
        information: err.message,
        message: "Gagal menampilkan data sekolah!",
      });
    }
  },
  async updateData(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const users: userModel = req.body;
      const updateSekolah: Sekolah = req.body;
      const conn = await db;

      if (
        !updateSekolah.namaSekolah &&
        !users.noHandphone &&
        !updateSekolah.jumlahAnak &&
        !updateSekolah.jumlahPengajar &&
        !updateSekolah.jumlahRuangan &&
        !updateSekolah.jamPulang
      ) {
        return res.status(400).json({ message: "Semua kolom harus diisi" });
      } else if (!updateSekolah.namaSekolah) {
        return res.status(400).json({ message: "Nama sekolah harus diisi" });
      } else if (!users.noHandphone) {
        return res.status(400).json({ message: "No handphone harus diisi" });
      } else if (!updateSekolah.jumlahAnak) {
        return res.status(400).json({ message: "Jumlah anak harus diisi" });
      } else if (!updateSekolah.jumlahPengajar) {
        return res.status(400).json({ message: "Jumlah pengajar harus diisi" });
      } else if (!updateSekolah.jumlahRuangan) {
        return res.status(400).json({ message: "Jumlah ruangan harus diisi" });
      } else if (!updateSekolah.jamPulang) {
        return res.status(400).json({ message: "Jam pulang harus diisi" });
      }

      if (users.noHandphone) {
        const [getIdUser] = await conn.query<any>(
          `select id from users where sekolahId = ?`,
          [id]
        );
        if (getIdUser.length > 0) {
          await conn.query(`UPDATE users SET noHandphone = ? WHERE id = ?`, [
            users.noHandphone,
            getIdUser[0].id,
          ]);
        }
      }

      await conn.query(
        `UPDATE sekolah SET 
          namaSekolah = ?, 
          jumlahAnak = ?, 
          jumlahPengajar = ?, 
          jumlahRuangan = ?, 
          jamPulang = ? 
        WHERE id = ?`,
        [
          updateSekolah.namaSekolah,
          updateSekolah.jumlahAnak,
          updateSekolah.jumlahPengajar,
          updateSekolah.jumlahRuangan,
          updateSekolah.jamPulang,
          id,
        ]
      );

      return res.status(200).json({
        message: "Data sekolah berhasil diupdate",
      });
    } catch (error) {
      const err = error as Error;
      res.status(500).json({
        information: err.message,
        message: "Gagal update data sekolah!",
      });
    }
  },
};
