CREATE DATABASE  IF NOT EXISTS `cita_sakinah` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `cita_sakinah`;
-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: localhost    Database: cita_sakinah
-- ------------------------------------------------------
-- Server version	8.4.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `fasilitas`
--

DROP TABLE IF EXISTS `fasilitas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `fasilitas` (
  `id` int NOT NULL AUTO_INCREMENT,
  `namaFasilitas` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `imageName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `sekolahId` int NOT NULL,
  `tanggalDibuat` date NOT NULL,
  PRIMARY KEY (`id`),
  KEY `sekolahId` (`sekolahId`),
  CONSTRAINT `fasilitas_ibfk_1` FOREIGN KEY (`sekolahId`) REFERENCES `sekolah` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fasilitas`
--

LOCK TABLES `fasilitas` WRITE;
/*!40000 ALTER TABLE `fasilitas` DISABLE KEYS */;
/*!40000 ALTER TABLE `fasilitas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `imageinformasi`
--

DROP TABLE IF EXISTS `imageinformasi`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `imageinformasi` (
  `idImage` int NOT NULL AUTO_INCREMENT,
  `informasiId` int NOT NULL,
  `fileName` varchar(255) NOT NULL,
  PRIMARY KEY (`idImage`),
  KEY `InformasiId` (`informasiId`),
  CONSTRAINT `imageinformasi_ibfk_1` FOREIGN KEY (`informasiId`) REFERENCES `informasi` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=73 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `imageinformasi`
--

LOCK TABLES `imageinformasi` WRITE;
/*!40000 ALTER TABLE `imageinformasi` DISABLE KEYS */;
/*!40000 ALTER TABLE `imageinformasi` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `imagekegiatan`
--

DROP TABLE IF EXISTS `imagekegiatan`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `imagekegiatan` (
  `idImage` int NOT NULL AUTO_INCREMENT,
  `kegiatanId` int NOT NULL,
  `fileName` varchar(255) NOT NULL,
  PRIMARY KEY (`idImage`),
  KEY `kegiatanId` (`kegiatanId`),
  CONSTRAINT `imagekegiatan_ibfk_1` FOREIGN KEY (`kegiatanId`) REFERENCES `kegiatan` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `imagekegiatan`
--

LOCK TABLES `imagekegiatan` WRITE;
/*!40000 ALTER TABLE `imagekegiatan` DISABLE KEYS */;
/*!40000 ALTER TABLE `imagekegiatan` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `informasi`
--

DROP TABLE IF EXISTS `informasi`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `informasi` (
  `id` int NOT NULL AUTO_INCREMENT,
  `judul` varchar(255) NOT NULL,
  `tanggal` date NOT NULL,
  `deskripsi` longtext NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `informasi`
--

LOCK TABLES `informasi` WRITE;
/*!40000 ALTER TABLE `informasi` DISABLE KEYS */;
/*!40000 ALTER TABLE `informasi` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `kategorikegiatan`
--

DROP TABLE IF EXISTS `kategorikegiatan`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `kategorikegiatan` (
  `id` int NOT NULL AUTO_INCREMENT,
  `namaKegiatan` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `kategorikegiatan`
--

LOCK TABLES `kategorikegiatan` WRITE;
/*!40000 ALTER TABLE `kategorikegiatan` DISABLE KEYS */;
INSERT INTO `kategorikegiatan` VALUES (1,'Kegiatan Anak'),(2,'Kegiatan Guru'),(3,'Prestasi');
/*!40000 ALTER TABLE `kategorikegiatan` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `kegiatan`
--

DROP TABLE IF EXISTS `kegiatan`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `kegiatan` (
  `id` int NOT NULL AUTO_INCREMENT,
  `judul` varchar(255) NOT NULL,
  `tanggal` date NOT NULL,
  `deskripsi` longtext NOT NULL,
  `jenisKegiatan` int NOT NULL,
  `sekolahId` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `sekolahId` (`sekolahId`),
  KEY `jenisKegiatan` (`jenisKegiatan`),
  CONSTRAINT `kegiatan_ibfk_1` FOREIGN KEY (`sekolahId`) REFERENCES `sekolah` (`id`),
  CONSTRAINT `kegiatan_ibfk_2` FOREIGN KEY (`jenisKegiatan`) REFERENCES `kategorikegiatan` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `kegiatan`
--

LOCK TABLES `kegiatan` WRITE;
/*!40000 ALTER TABLE `kegiatan` DISABLE KEYS */;
/*!40000 ALTER TABLE `kegiatan` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sekolah`
--

DROP TABLE IF EXISTS `sekolah`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sekolah` (
  `id` int NOT NULL AUTO_INCREMENT,
  `namaSekolah` varchar(255) NOT NULL,
  `jamPulang` varchar(50) NOT NULL DEFAULT '',
  `jumlahAnak` int NOT NULL,
  `jumlahPengajar` int NOT NULL,
  `jumlahRuangan` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sekolah`
--

LOCK TABLES `sekolah` WRITE;
/*!40000 ALTER TABLE `sekolah` DISABLE KEYS */;
INSERT INTO `sekolah` VALUES (1,'TPA Cita Sakinah','11:03',271,6,10),(2,'KB \'Aisyiyah 24','11:00',53,6,10),(3,'TK ABA 33','11:00',21,6,10);
/*!40000 ALTER TABLE `sekolah` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `struktur`
--

DROP TABLE IF EXISTS `struktur`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `struktur` (
  `id` int NOT NULL AUTO_INCREMENT,
  `imageName` varchar(255) NOT NULL,
  `usersId` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `usersId` (`usersId`),
  CONSTRAINT `struktur_ibfk_1` FOREIGN KEY (`usersId`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `struktur`
--

LOCK TABLES `struktur` WRITE;
/*!40000 ALTER TABLE `struktur` DISABLE KEYS */;
INSERT INTO `struktur` VALUES (1,'file-c68e991f9233a069f5f8a8.png',1);
/*!40000 ALTER TABLE `struktur` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `taginformasi`
--

DROP TABLE IF EXISTS `taginformasi`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `taginformasi` (
  `id` int NOT NULL AUTO_INCREMENT,
  `informasiId` int NOT NULL,
  `sekolahId` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `informasiId` (`informasiId`),
  KEY `sekolahId` (`sekolahId`),
  CONSTRAINT `taginformasi_ibfk_1` FOREIGN KEY (`informasiId`) REFERENCES `informasi` (`id`),
  CONSTRAINT `taginformasi_ibfk_2` FOREIGN KEY (`sekolahId`) REFERENCES `sekolah` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=189 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `taginformasi`
--

LOCK TABLES `taginformasi` WRITE;
/*!40000 ALTER TABLE `taginformasi` DISABLE KEYS */;
/*!40000 ALTER TABLE `taginformasi` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `test`
--

DROP TABLE IF EXISTS `test`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `test` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nomor` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `test`
--

LOCK TABLES `test` WRITE;
/*!40000 ALTER TABLE `test` DISABLE KEYS */;
/*!40000 ALTER TABLE `test` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(255) NOT NULL,
  `noHandphone` bigint NOT NULL DEFAULT '0',
  `sekolahId` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `sekolahId` (`sekolahId`),
  CONSTRAINT `users_ibfk_1` FOREIGN KEY (`sekolahId`) REFERENCES `sekolah` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'adminTPA','d4c6febf2321217ee6fa804b22d1ea91:b5431bf70636011ae2d0b45f','admin',628111111111,1),(2,'adminKB','5cf8de8b741e15049c78e38507b845f5:b3ff3cfdbf50b92dd49935','admin',6282222222,2),(3,'adminTK','df37c5e33b83a3b1566dcdd086cafe75:695e9a55130e7bcfc14ade','admin',6283333333,3);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-10-30 14:37:15
