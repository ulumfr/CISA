import express from "express";
const app = express();
const router = express.Router();
import sekolahController from "./controllers/sekolah.controller";

import testController from "./controllers/test.controller";
import kegiatanConctroller from "./controllers/kegiatan.controller";
import authController from "./controllers/auth.controller";
import uploadMiddleware from "./middlewares/upload.middleware";
import strukturController from "./controllers/struktur.controller";
import fasilitasController from "./controllers/fasilitas.controller";
import informasiController from "./controllers/informasi.controller";
import authMiddleware from "./middlewares/auth.middleware";

// router.post("/test", testController.createSchool);
// router.get("/test", testController.displayData);
// router.post("/test/array", testController.cekArray);
// router.post("/test/image", uploadMiddleware.single, testController.tesImage);

//Sekolah endpoint
router.get("/sekolah", sekolahController.displayData);
router.patch("/sekolah/:id", authMiddleware, uploadMiddleware.single, sekolahController.updateData);

//Kegiatan endpoint
router.post("/kegiatan", authMiddleware, uploadMiddleware.multiple, kegiatanConctroller.createData);
router.get("/kegiatan", kegiatanConctroller.displayData);
router.get("/kegiatan/jenis", kegiatanConctroller.displayJenisKegiatan);
router.get("/kegiatan/filter", kegiatanConctroller.filterDisplay);
router.get("/kegiatan/:id", kegiatanConctroller.selected);
router.patch("/kegiatan/:id", authMiddleware, uploadMiddleware.multiple, kegiatanConctroller.updateData);
router.delete("/kegiatan/:id", authMiddleware, kegiatanConctroller.deleteData);

//informasi
router.post("/informasi", authMiddleware, uploadMiddleware.multiple, informasiController.createData);
router.get("/informasi", informasiController.displayData);
router.get("/informasi/:id", informasiController.selected);
router.get("/informasi/filter", informasiController.filterData);
router.patch("/informasi/:id", authMiddleware, uploadMiddleware.multiple, informasiController.updateData);
router.delete("/informasi/:id", authMiddleware, uploadMiddleware.single, informasiController.deleteData);

//auth
router.post("/user/auth/login", authController.login);
// router.post("/user/auth/register", authController.register);
router.post("/user/logout", authMiddleware, authController.logout);
router.get("/user/kontak/:sekolahId",  authController.kontak);

//struktur
router.put("/struktur", authMiddleware, uploadMiddleware.single, strukturController.changeStructure);
router.get("/struktur", strukturController.getStucture);

//fasilitas
router.post("/fasilitas", authMiddleware, uploadMiddleware.single, fasilitasController.createData);
router.get("/fasilitas", fasilitasController.displayData);
router.patch("/fasilitas/:id", authMiddleware, uploadMiddleware.single, fasilitasController.updateData);
router.delete("/fasilitas/:id", authMiddleware, fasilitasController.deleteData);

export default router;
