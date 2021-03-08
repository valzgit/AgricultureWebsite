CREATE DATABASE  IF NOT EXISTS `users` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `users`;
-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: localhost    Database: users
-- ------------------------------------------------------
-- Server version	8.0.19

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
-- Table structure for table `datumi`
--

DROP TABLE IF EXISTS `datumi`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `datumi` (
  `id` int NOT NULL AUTO_INCREMENT,
  `idproizv` int NOT NULL,
  `datum` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idproizv_idx` (`idproizv`),
  CONSTRAINT `idproizv` FOREIGN KEY (`idproizv`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=59 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `datumi`
--

LOCK TABLES `datumi` WRITE;
/*!40000 ALTER TABLE `datumi` DISABLE KEYS */;
INSERT INTO `datumi` VALUES (1,35,'2020-04-28'),(2,35,'2020-04-23'),(3,35,'2020-04-22'),(4,35,'2020-04-07'),(5,35,'2020-04-28'),(6,35,'2020-04-28'),(7,35,'2020-04-28'),(8,35,'2020-04-28'),(9,35,'2020-04-29'),(10,35,'2020-04-30'),(11,35,'2020-04-30'),(12,35,'2020-04-30'),(13,35,'2020-04-30'),(14,35,'2020-04-30'),(15,35,'2020-05-01'),(16,35,'2020-05-01'),(17,35,'2020-05-01'),(22,35,'2020-05-09'),(26,35,'2020-05-09'),(29,35,'2020-05-09'),(35,35,'2020-05-12'),(37,35,'2020-05-12'),(38,35,'2020-05-31'),(39,35,'2020-05-31'),(40,35,'2020-05-31'),(41,35,'2020-05-31'),(42,35,'2020-06-01'),(43,35,'2020-06-01'),(44,35,'2020-06-02'),(45,35,'2020-06-02'),(46,35,'2020-06-02'),(47,35,'2020-06-02'),(48,35,'2020-06-04'),(49,35,'2020-06-04'),(50,35,'2020-06-04'),(51,45,'2020-06-04'),(52,35,'2020-06-04'),(53,35,'2020-06-04'),(54,45,'2020-06-04'),(55,35,'2020-06-04'),(56,45,'2020-06-04'),(57,45,'2020-06-04'),(58,35,'2020-06-18');
/*!40000 ALTER TABLE `datumi` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dozvole`
--

DROP TABLE IF EXISTS `dozvole`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dozvole` (
  `iddozvole` int NOT NULL AUTO_INCREMENT,
  `iduser` int NOT NULL,
  `idproiz` int NOT NULL,
  `komentarisao` int DEFAULT '0',
  PRIMARY KEY (`iddozvole`),
  KEY `iduser_idx` (`iduser`),
  KEY `idproiz_idx` (`idproiz`),
  CONSTRAINT `idproiz` FOREIGN KEY (`idproiz`) REFERENCES `proizvodi` (`idproizvodi`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `iduser` FOREIGN KEY (`iduser`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=60 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dozvole`
--

LOCK TABLES `dozvole` WRITE;
/*!40000 ALTER TABLE `dozvole` DISABLE KEYS */;
INSERT INTO `dozvole` VALUES (2,2,5,1),(3,2,6,1),(7,2,5,1),(8,2,5,1),(10,2,5,1),(11,2,6,1),(15,2,6,0),(18,2,5,0),(20,2,6,0),(21,2,5,0),(22,2,5,0),(23,2,6,0),(25,2,5,0),(26,2,6,0),(28,2,5,0),(29,2,6,0),(31,46,5,0),(32,46,6,0),(33,46,29,0),(34,2,5,0),(35,2,6,0),(36,2,29,1),(37,2,5,0),(38,2,6,0),(39,2,29,1),(40,2,29,1),(41,2,5,0),(42,2,5,0),(43,2,6,0),(44,2,29,1),(45,26,153,1),(46,2,153,1),(47,2,153,1),(48,46,153,1),(49,2,5,0),(50,2,6,0),(51,2,29,0),(52,2,151,1),(53,2,151,1),(54,2,151,1),(55,2,5,0),(56,2,6,0),(57,2,29,0),(58,2,5,0),(59,26,151,1);
/*!40000 ALTER TABLE `dozvole` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `generator`
--

DROP TABLE IF EXISTS `generator`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `generator` (
  `id` int NOT NULL AUTO_INCREMENT,
  `broj` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=81 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `generator`
--

LOCK TABLES `generator` WRITE;
/*!40000 ALTER TABLE `generator` DISABLE KEYS */;
INSERT INTO `generator` VALUES (6,NULL),(7,0),(8,0),(9,0),(10,0),(11,0),(12,0),(13,0),(14,0),(15,0),(16,0),(17,0),(18,0),(19,0),(20,0),(21,0),(22,0),(23,0),(24,0),(25,0),(26,0),(27,0),(28,0),(29,0),(30,0),(31,0),(32,0),(33,0),(34,0),(35,0),(36,0),(37,0),(38,0),(39,0),(40,0),(41,0),(42,0),(43,0),(44,0),(45,0),(46,0),(47,0),(48,0),(49,0),(50,0),(51,0),(52,0),(53,0),(54,0),(55,0),(56,0),(57,0),(58,0),(59,0),(60,0),(61,0),(62,0),(63,0),(64,0),(65,0),(66,0),(67,0),(68,0),(69,0),(70,0),(71,0),(72,0),(73,0),(74,0),(75,0),(76,0),(77,0),(78,0),(79,0),(80,0);
/*!40000 ALTER TABLE `generator` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `komentari`
--

DROP TABLE IF EXISTS `komentari`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `komentari` (
  `id` int NOT NULL AUTO_INCREMENT,
  `iduse` int NOT NULL,
  `idpro` int NOT NULL,
  `komentar` varchar(200) NOT NULL,
  `ocena` double NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idu_idx` (`iduse`),
  KEY `idp_idx` (`idpro`),
  CONSTRAINT `idpro` FOREIGN KEY (`idpro`) REFERENCES `proizvodi` (`idproizvodi`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `iduse` FOREIGN KEY (`iduse`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `komentari`
--

LOCK TABLES `komentari` WRITE;
/*!40000 ALTER TABLE `komentari` DISABLE KEYS */;
INSERT INTO `komentari` VALUES (4,2,5,'Fenomenalno!',5),(5,2,6,'Dobar',3),(6,2,29,'#### Svidja mi se proizvod ######',3),(7,26,153,'Prelepe ruze!',5),(8,2,153,'Divna ruza zaista!',4),(9,46,153,'Moje ruze i ne deluju tako lepo :(',3),(10,2,151,'Nikada lepse ljubicice nisu stigle u moj rasadnik!',5),(11,26,151,'Fenomenalne ljubicice!',4);
/*!40000 ALTER TABLE `komentari` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `kuriri`
--

DROP TABLE IF EXISTS `kuriri`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `kuriri` (
  `id` int NOT NULL AUTO_INCREMENT,
  `idpreduzeca` int NOT NULL,
  `k` double NOT NULL DEFAULT '0',
  `status` varchar(45) NOT NULL DEFAULT 'spreman',
  `duplikat` double NOT NULL DEFAULT '0',
  `por` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `kuriri`
--

LOCK TABLES `kuriri` WRITE;
/*!40000 ALTER TABLE `kuriri` DISABLE KEYS */;
INSERT INTO `kuriri` VALUES (1,35,0,'spreman',0,0),(2,35,0,'spreman',0,0),(3,35,0,'spreman',0,0),(4,35,0,'spreman',0,0),(5,35,70.85,'vraca',0,76),(21,45,0,'spreman',0,NULL),(22,45,128,'vraca',0,78),(23,45,0,'spreman',0,0),(24,45,0,'spreman',0,0),(25,45,0,'spreman',0,0),(26,48,0,'spreman',0,NULL),(27,48,0,'spreman',0,NULL),(28,48,0,'spreman',0,NULL),(29,48,0,'spreman',0,NULL),(30,48,0,'spreman',0,NULL),(31,50,0,'spreman',0,NULL),(32,50,0,'spreman',0,NULL),(33,50,0,'spreman',0,NULL),(34,50,0,'spreman',0,NULL),(35,50,0,'spreman',0,NULL);
/*!40000 ALTER TABLE `kuriri` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `polj`
--

DROP TABLE IF EXISTS `polj`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `polj` (
  `id` int NOT NULL AUTO_INCREMENT,
  `Ime` varchar(45) NOT NULL,
  `Prezime` varchar(45) NOT NULL,
  `Datum` varchar(45) NOT NULL,
  `Mesto` varchar(45) NOT NULL,
  `Telefon` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `id` FOREIGN KEY (`id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=50 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `polj`
--

LOCK TABLES `polj` WRITE;
/*!40000 ALTER TABLE `polj` DISABLE KEYS */;
INSERT INTO `polj` VALUES (2,'Poljo','srere','\"1999-02-12\"','Novi Sad','4314134','mail@email.com'),(26,'Milan','Milic','\"1999-02-12\"','Sarajevo','5245245','email@email.com'),(32,'Mario','Milic','\"1997-07-07\"','Budapest','5246246','hmej@l.com'),(46,'Proba','Zamejl','\"1111-11-11\"','Pozarevac','5245245','xovic98965@lywenw.com'),(47,'NoviPoljoprivrednik','Hej','\"1111-11-11\"','Stara Pazova','34124314134','mejl@mejl.com');
/*!40000 ALTER TABLE `polj` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pred`
--

DROP TABLE IF EXISTS `pred`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pred` (
  `idp` int NOT NULL,
  `ime` varchar(45) NOT NULL,
  `datum` varchar(45) NOT NULL,
  `mesto` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  PRIMARY KEY (`idp`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pred`
--

LOCK TABLES `pred` WRITE;
/*!40000 ALTER TABLE `pred` DISABLE KEYS */;
INSERT INTO `pred` VALUES (35,'Monsanto','\"2020-1-1\"','Nis','madrid@madrid.com'),(41,'Komercijalna Banka','\"1972-12-12\"','Beograd','kombank@mejl.com'),(42,'NekoPreduzece','\"1992-11-11\"','Kragagafe','krakaga@lol.mail'),(43,'NovoPreduzece','\"2020-06-01\"','Beograd','novo@mail.com'),(45,'Mario','\"1323-11-11\"','Beograd','kombank@mejl.com'),(48,'Josjedno','\"0001-01-01\"','Nova Pazova','pravimejl@mejl.com'),(50,'Adminovopred','\"2001-02-22\"','Pristina','mejl@mail.com');
/*!40000 ALTER TABLE `pred` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `proizvodi`
--

DROP TABLE IF EXISTS `proizvodi`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `proizvodi` (
  `idproizvodi` int NOT NULL AUTO_INCREMENT,
  `idvlasnika` int NOT NULL,
  `naziv` varchar(45) NOT NULL,
  `kol` int NOT NULL DEFAULT '0',
  `proizvodjac` int NOT NULL,
  `vrsta` varchar(45) NOT NULL,
  `idrasadnika` int DEFAULT NULL,
  `dani` int DEFAULT '60',
  `brojocena` int DEFAULT '0',
  `ocena` double DEFAULT NULL,
  `cena` int DEFAULT NULL,
  `datum` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idproizvodi`),
  KEY `idvlasnika_idx` (`idvlasnika`),
  KEY `proizvodjac_idx` (`proizvodjac`),
  KEY `idrasadnika_idx` (`idrasadnika`),
  CONSTRAINT `idrasadnika` FOREIGN KEY (`idrasadnika`) REFERENCES `rasadnici` (`id`),
  CONSTRAINT `idvlasnika` FOREIGN KEY (`idvlasnika`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `proizvodjac` FOREIGN KEY (`proizvodjac`) REFERENCES `pred` (`idp`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=166 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `proizvodi`
--

LOCK TABLES `proizvodi` WRITE;
/*!40000 ALTER TABLE `proizvodi` DISABLE KEYS */;
INSERT INTO `proizvodi` VALUES (5,35,'BiljnaPomoc',96,35,'p',NULL,100,1,5,100,NULL),(6,35,'PomocnoSredstvo',110,35,'p',NULL,60,1,3,150,NULL),(15,2,'JosSemenja',19,35,'s',9,60,0,NULL,NULL,NULL),(16,2,'BiljnaPomoc',22,35,'p',9,100,0,NULL,NULL,NULL),(29,35,'Seme',113,35,'s',NULL,60,1,3,10,NULL),(50,2,'BiljnaPomoc',5,35,'p',12,100,0,24,NULL,NULL),(55,2,'PomocnoSredstvo',1,35,'p',9,60,0,27,-1,'2020-04-22'),(56,2,'JosSemenja',4,35,'s',12,60,0,28,NULL,'2020-04-28'),(122,2,'BiljnaPomoc',5,35,'p',9,100,0,59,NULL,'2020-05-31'),(123,2,'PomocnoSredstvo',12,35,'p',9,60,0,60,NULL,'2020-05-31'),(124,2,'BiljnaPomoc',15,35,'p',9,100,0,61,NULL,'2020-05-31'),(125,2,'PomocnoSredstvo',10,35,'p',9,60,0,61,NULL,'2020-05-31'),(126,2,'Seme',14,35,'s',9,60,0,61,NULL,'2020-05-31'),(127,2,'BiljnaPomoc',4,35,'p',12,100,0,62,NULL,'2020-05-31'),(128,2,'PomocnoSredstvo',5,35,'p',12,60,0,62,NULL,'2020-05-31'),(130,2,'BiljnaPomoc',4,35,'p',14,100,0,63,NULL,'2020-06-01'),(131,2,'PomocnoSredstvo',4,35,'p',14,60,0,63,NULL,'2020-06-01'),(133,2,'Seme',6,35,'s',14,60,0,64,-1,'2020-06-01'),(134,2,'BiljnaPomoc',4,35,'p',14,100,0,64,-1,'2020-06-01'),(135,2,'BiljnaPomoc',5,35,'p',9,100,0,65,NULL,'2020-06-02'),(136,2,'PomocnoSredstvo',5,35,'p',9,60,0,65,NULL,'2020-06-02'),(137,2,'Seme',5,35,'s',9,60,0,65,NULL,'2020-06-02'),(138,2,'BiljnaPomoc',10,35,'p',13,100,0,66,NULL,'2020-06-02'),(139,2,'PomocnoSredstvo',9,35,'p',13,60,0,66,NULL,'2020-06-02'),(140,2,'Seme',9,35,'s',13,60,0,66,NULL,'2020-06-02'),(141,46,'BiljnaPomoc',5,35,'p',15,100,0,67,-1,'2020-06-02'),(142,46,'PomocnoSredstvo',5,35,'p',15,60,0,67,-1,'2020-06-02'),(143,46,'Seme',5,35,'s',15,60,0,67,-1,'2020-06-02'),(144,2,'BiljnaPomoc',5,35,'p',9,100,0,68,-1,'2020-06-02'),(145,2,'PomocnoSredstvo',5,35,'p',9,60,0,68,-1,'2020-06-02'),(146,2,'Seme',5,35,'s',9,60,0,68,-1,'2020-06-02'),(147,2,'BiljnaPomoc',5,35,'p',9,100,0,69,-1,'2020-06-04'),(148,2,'BiljnaPomoc',10,35,'p',12,100,0,70,NULL,'2020-06-04'),(149,2,'PomocnoSredstvo',10,35,'p',12,60,0,70,NULL,'2020-06-04'),(150,2,'Seme',10,35,'s',12,60,0,70,NULL,'2020-06-04'),(151,35,'Ljubicica',955,35,'s',NULL,1,2,4.5,5,NULL),(152,2,'Ljubicica',20,35,'s',12,1,0,71,NULL,'2020-06-04'),(153,45,'Ruza',75,45,'s',NULL,1,3,4,10,NULL),(154,2,'Ruza',10,45,'s',13,1,0,72,NULL,'2020-06-04'),(155,2,'Ljubicica',10,35,'s',13,1,0,73,NULL,'2020-06-04'),(156,2,'BiljnaPomoc',5,35,'p',14,100,0,74,NULL,'2020-06-04'),(157,2,'PomocnoSredstvo',5,35,'p',14,60,0,74,NULL,'2020-06-04'),(158,2,'Ruza',5,45,'s',14,1,0,75,NULL,'2020-06-04'),(159,2,'Seme',5,35,'s',14,60,0,74,NULL,'2020-06-04'),(160,2,'Ljubicica',5,35,'s',14,1,0,74,NULL,'2020-06-04'),(161,26,'Ljubicica',2,35,'s',16,1,0,76,-1,'2020-06-04'),(162,26,'Ruza',4,45,'s',16,1,0,77,NULL,'2020-06-04'),(163,46,'Ruza',5,45,'s',15,1,0,78,NULL,'2020-06-04'),(164,2,'Seme',10,35,'s',9,60,-1,79,NULL,'2020-06-18'),(165,2,'Ljubicica',5,35,'s',9,1,-1,79,NULL,'2020-06-18');
/*!40000 ALTER TABLE `proizvodi` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rasadnici`
--

DROP TABLE IF EXISTS `rasadnici`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rasadnici` (
  `id` int NOT NULL AUTO_INCREMENT,
  `idv` int NOT NULL,
  `naziv` varchar(45) NOT NULL,
  `mesto` varchar(45) NOT NULL,
  `povrsina` int NOT NULL,
  `temp` double NOT NULL,
  `voda` int NOT NULL,
  `slobodno` int NOT NULL,
  `zauzeto` int NOT NULL,
  `duz` int DEFAULT NULL,
  `sir` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idv_idx` (`idv`),
  CONSTRAINT `idv` FOREIGN KEY (`idv`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rasadnici`
--

LOCK TABLES `rasadnici` WRITE;
/*!40000 ALTER TABLE `rasadnici` DISABLE KEYS */;
INSERT INTO `rasadnici` VALUES (9,2,'Dodati','Prizren',11,18.5,190,11,0,5,3),(12,2,'Floor','Prizren',27,19,198,20,7,6,5),(13,2,'KulRasadnik','Pozarevac',15,19,196,14,1,3,5),(14,2,'MojRasadnik1','Beograd',25,17,194,20,5,5,5),(15,46,'MojRasadnik1','Novi Pazar',20,18.5,187,20,0,10,2),(16,26,'Rasadnik','Beograd',16,18.5,187,12,4,4,4);
/*!40000 ALTER TABLE `rasadnici` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sadnice`
--

DROP TABLE IF EXISTS `sadnice`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sadnice` (
  `id` int NOT NULL AUTO_INCREMENT,
  `idr` int NOT NULL,
  `proizvod` varchar(45) NOT NULL DEFAULT 'Prazan',
  `zasadjen` int DEFAULT NULL,
  `izvadi` int DEFAULT NULL,
  `proizvodjac` varchar(45) DEFAULT NULL,
  `trajanje` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idr_idx` (`idr`),
  CONSTRAINT `idr` FOREIGN KEY (`idr`) REFERENCES `rasadnici` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=257 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sadnice`
--

LOCK TABLES `sadnice` WRITE;
/*!40000 ALTER TABLE `sadnice` DISABLE KEYS */;
INSERT INTO `sadnice` VALUES (23,9,'Pending',NULL,565,NULL,3000),(24,9,'Prazan',NULL,NULL,NULL,2933),(25,9,'Pending',NULL,982,NULL,1440),(26,9,'Pending',NULL,930,NULL,1842),(27,9,'Pending',NULL,565,NULL,1200),(28,9,'Pending',NULL,964,NULL,86400),(29,9,'Pending',NULL,552,NULL,0),(30,9,'Pending',NULL,552,NULL,0),(31,9,'Pending',NULL,552,NULL,0),(32,9,'Pending',NULL,565,NULL,0),(33,9,'Pending',NULL,1006,NULL,86400),(154,12,'Pending',NULL,565,NULL,0),(155,12,'Pending',NULL,716,NULL,86400),(156,12,'Pending',NULL,1063,NULL,86400),(157,12,'Pending',NULL,1071,NULL,86400),(158,12,'Pending',NULL,1120,NULL,86400),(159,12,'Pending',NULL,1266,NULL,86400),(160,12,'Pending',NULL,1266,NULL,86400),(161,12,'Pending',NULL,1266,NULL,86400),(162,12,'Pending',NULL,1266,NULL,86400),(163,12,'Pending',NULL,1158,NULL,86400),(164,12,'Pending',NULL,1266,NULL,86400),(165,12,'Seme',20,86124,'Monsanto',86400),(166,12,'JosSemenja',56,86127,'Monsanto',86400),(167,12,'Pending',NULL,334,NULL,1246),(168,12,'Pending',NULL,1254,NULL,86400),(169,12,'Pending',NULL,1267,NULL,86400),(170,12,'Seme',59,86129,'Monsanto',86400),(171,12,'Seme',59,86130,'Monsanto',86400),(172,12,'Seme',129,86145,'Monsanto',86400),(173,12,'Pending',NULL,1267,NULL,86400),(174,12,'Seme',129,0,'Monsanto',86400),(175,12,'Pending',NULL,1267,NULL,86400),(176,12,'Pending',NULL,1274,NULL,86400),(177,12,'Prazan',NULL,NULL,NULL,NULL),(178,12,'Prazan',NULL,NULL,NULL,NULL),(179,12,'Prazan',NULL,NULL,NULL,NULL),(180,12,'JosSemenja',56,86394,'Monsanto',86400),(181,13,'Pending',NULL,551,NULL,14400),(182,13,'Pending',NULL,1267,NULL,14400),(183,13,'Prazan',NULL,NULL,NULL,NULL),(184,13,'Pending',NULL,552,NULL,14398),(185,13,'Prazan',NULL,NULL,NULL,NULL),(186,13,'Prazan',NULL,NULL,NULL,NULL),(187,13,'Prazan',NULL,NULL,NULL,NULL),(188,13,'Prazan',NULL,NULL,NULL,NULL),(189,13,'Prazan',NULL,NULL,NULL,NULL),(190,13,'Pending',NULL,560,NULL,14400),(191,13,'Pending',NULL,560,NULL,1200),(192,13,'Prazan',NULL,NULL,NULL,NULL),(193,13,'Prazan',NULL,NULL,NULL,NULL),(194,13,'Seme',140,86349,'Monsanto',86400),(195,13,'Prazan',NULL,NULL,NULL,NULL),(196,14,'Seme',132,86137,'Monsanto',86400),(197,14,'Seme',132,86137,'Monsanto',86400),(198,14,'Seme',132,0,'Monsanto',86400),(199,14,'Seme',132,86137,'Monsanto',86400),(200,14,'Prazan',NULL,NULL,NULL,NULL),(201,14,'Prazan',NULL,NULL,NULL,NULL),(202,14,'Pending',NULL,1389,NULL,86400),(203,14,'Prazan',NULL,NULL,NULL,NULL),(204,14,'Prazan',NULL,NULL,NULL,NULL),(205,14,'Prazan',NULL,NULL,NULL,NULL),(206,14,'Prazan',NULL,NULL,NULL,NULL),(207,14,'Prazan',NULL,NULL,NULL,NULL),(208,14,'Seme',132,86137,'Monsanto',86400),(209,14,'Prazan',NULL,NULL,NULL,NULL),(210,14,'Prazan',NULL,NULL,NULL,NULL),(211,14,'Prazan',NULL,NULL,NULL,NULL),(212,14,'Prazan',NULL,NULL,NULL,NULL),(213,14,'Prazan',NULL,NULL,NULL,NULL),(214,14,'Prazan',NULL,NULL,NULL,NULL),(215,14,'Prazan',NULL,NULL,NULL,NULL),(216,14,'Prazan',NULL,NULL,NULL,NULL),(217,14,'Prazan',NULL,NULL,NULL,NULL),(218,14,'Prazan',NULL,NULL,NULL,NULL),(219,14,'Prazan',NULL,NULL,NULL,NULL),(220,14,'Prazan',NULL,NULL,NULL,NULL),(221,15,'Prazan',NULL,NULL,NULL,NULL),(222,15,'Prazan',NULL,NULL,NULL,NULL),(223,15,'Prazan',NULL,NULL,NULL,NULL),(224,15,'Prazan',NULL,NULL,NULL,NULL),(225,15,'Prazan',NULL,NULL,NULL,NULL),(226,15,'Prazan',NULL,NULL,NULL,NULL),(227,15,'Prazan',NULL,NULL,NULL,NULL),(228,15,'Prazan',NULL,NULL,NULL,NULL),(229,15,'Prazan',NULL,NULL,NULL,NULL),(230,15,'Prazan',NULL,NULL,NULL,NULL),(231,15,'Prazan',NULL,NULL,NULL,NULL),(232,15,'Prazan',NULL,NULL,NULL,NULL),(233,15,'Prazan',NULL,NULL,NULL,NULL),(234,15,'Prazan',NULL,NULL,NULL,NULL),(235,15,'Prazan',NULL,NULL,NULL,NULL),(236,15,'Prazan',NULL,NULL,NULL,NULL),(237,15,'Prazan',NULL,NULL,NULL,NULL),(238,15,'Prazan',NULL,NULL,NULL,NULL),(239,15,'Prazan',NULL,NULL,NULL,NULL),(240,15,'Prazan',NULL,NULL,NULL,NULL),(241,16,'Ljubicica',161,1377,'Monsanto',1440),(242,16,'Ljubicica',161,1377,'Monsanto',1440),(243,16,'Ruza',162,1377,'Mario',1440),(244,16,'Ljubicica',161,1377,'Monsanto',1440),(245,16,'Prazan',NULL,NULL,NULL,NULL),(246,16,'Prazan',NULL,NULL,NULL,NULL),(247,16,'Prazan',NULL,NULL,NULL,NULL),(248,16,'Prazan',NULL,NULL,NULL,NULL),(249,16,'Prazan',NULL,NULL,NULL,NULL),(250,16,'Prazan',NULL,NULL,NULL,NULL),(251,16,'Prazan',NULL,NULL,NULL,NULL),(252,16,'Prazan',NULL,NULL,NULL,NULL),(253,16,'Prazan',NULL,NULL,NULL,NULL),(254,16,'Prazan',NULL,NULL,NULL,NULL),(255,16,'Prazan',NULL,NULL,NULL,NULL),(256,16,'Prazan',NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `sadnice` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  `type` char(1) NOT NULL,
  `accepted` char(1) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `username_UNIQUE` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'admin','admin','a','y'),(2,'polj','polj','k','y'),(26,'polj2','polj2','k','y'),(32,'poljo','Qwerty1!','k','n'),(35,'pred','pred','p','y'),(45,'pred2','pred2','p','y'),(46,'polj3','polj3','k','y'),(47,'hejjasamnov','Hejjasamnov1!','k','n'),(48,'jj','Josjednopreduzece1!','p','y');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'users'
--

--
-- Dumping routines for database 'users'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-06-18 23:03:21
