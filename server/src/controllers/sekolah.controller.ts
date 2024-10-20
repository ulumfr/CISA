import { Request, Response } from "express";
import connect from "../utils/database";
import Sekolah from "../models/sekolah.model";
import * as Yup from "yup";

import { db } from "../server";
import userModel from "../models/user.model";

const updateValidationSchema = Yup.object().shape({
  namaSekolah: Yup.string().typeError("Inputan untuk 'Nama Sekolah' harus berupa huruf"),
  jamPulang: Yup.string().typeError("Inputan untuk 'Jam Pulang' harus berupa huruf"),
  jumlahAnak: Yup.number().typeError("Inputan untuk 'Jumlah Anak' harus berupa angka"),
  jumlahPengajar: Yup.number().typeError("Inputan untuk 'Jumlah Pengajar' harus berupa angka"),
  jumlahRuangan: Yup.number().typeError("Inputan untuk 'Jumlah Ruangan' harus berupa angka"),
});

export default {
  async displayData(req: Request, res: Response) {
    try {
      const conn = await db;
      const result = await conn.query(`SELECT sekolah.*,users.id as userId, users.noHandphone 
     FROM sekolah 
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
      await updateValidationSchema.validate(req.body);
      const id = req.params.id;
      const users: userModel = req.body;
      const updateSekolah: Sekolah = req.body;

      const conn = await db;
      if (users.noHandphone) {
        const [getIdUser] = await conn.query<any>(`select id from users where sekolahId = ?`, [id]);
        if (getIdUser.length > 0) {
          await conn.query(`UPDATE users SET noHandphone = ? WHERE id = ?`, [users.noHandphone, getIdUser[0].id]);
        }
      }

      if (updateSekolah.jamPulang) {
        await conn.query("UPDATE sekolah SET jamPulang = ? WHERE id = ?", [updateSekolah.jamPulang, id]);
      }
      if (updateSekolah.jumlahAnak) {
        await conn.query("UPDATE sekolah SET jumlahAnak = ? WHERE id = ?", [updateSekolah.jumlahAnak, id]);
      }
      if (updateSekolah.jumlahPengajar) {
        await conn.query("UPDATE sekolah SET jumlahPengajar = ? WHERE id = ?", [updateSekolah.jumlahPengajar, id]);
      }
      if (updateSekolah.jumlahRuangan) {
        await conn.query("UPDATE sekolah SET jumlahRuangan = ? WHERE id = ?", [updateSekolah.jumlahRuangan, id]);
      }
      if (updateSekolah.namaSekolah){
        await conn.query("UPDATE sekolah SET namaSekolah = ? WHERE id = ?", [updateSekolah.namaSekolah, id]);
      }

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
