-- MySQL dump 10.13  Distrib 5.7.30, for Linux (x86_64)
--
-- Host: 127.0.0.1    Database: db
-- ------------------------------------------------------
-- Server version	5.7.30

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `authors`
--

DROP TABLE IF EXISTS `authors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `authors` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_4c25845f02be5847ed6a81ef07` (`firstName`,`lastName`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `authors`
--

LOCK TABLES `authors` WRITE;
INSERT INTO `authors` VALUES (18,'Alfred','Aho'),(4,'Andrea','diSessa'),(22,'Andrew','Hunt'),(25,'Chad','Fowler'),(23,'David','Thomas'),(14,'Don','Roberts'),(5,'Erich','Gamma'),(3,'Gerald','Sussman'),(9,'Grady','Booch'),(1,'Harold','Abelson'),(21,'Jeffrey','Ullman'),(12,'John','Brant'),(17,'John','Sonmez'),(8,'John','Vlissides'),(2,'Julie','Sussman'),(11,'Kent','Beck'),(10,'Martin','Fowler'),(16,'Michael','Feathers'),(26,'Mike','Cohn'),(19,'Monica','Lam'),(7,'Ralph','Johnson'),(20,'Ravi','Sethi'),(6,'Richard','Helm'),(24,'Venkat','Subramaniam'),(13,'William','Opdyke');
UNLOCK TABLES;

--
-- Table structure for table `books`
--

DROP TABLE IF EXISTS `books`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `books` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UQ_f3f2f25a099d24e12545b70b022` (`id`),
  UNIQUE KEY `UQ_3cd818eaf734a9d8814843f1197` (`title`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `books`
--

LOCK TABLES `books` WRITE;
INSERT INTO `books` VALUES (12,'Agile Estimating and Planning'),(7,'Compilers: Principles, Techniques, and Tools (2nd Edition)'),(3,'Design Patterns: Elements of Reusable Object-Oriented Software'),(13,'Extreme Programming Explained: Embrace Change, 2nd Edition'),(9,'Practices of an Agile Developer: Working in the Real World'),(10,'Programming Kotlin: Create Elegant, Expressive, and Performant JVM and Android Applications'),(4,'Refactoring: Improving the Design of Existing Code'),(1,'Structure and Interpretation of Computer Programs - 2nd Edition'),(6,'The Complete Software Developer\'s Career Guide'),(11,'The Passionate Programmer: Creating a Remarkable Career in Software Development'),(8,'The Pragmatic Programmer: From Journeyman to Master'),(2,'Turtle Geometry: The Computer as a Medium for Exploring'),(5,'Working Effectively with Legacy Code');
UNLOCK TABLES;

--
-- Table structure for table `books_authors`
--

DROP TABLE IF EXISTS `books_authors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `books_authors` (
  `bookId` int(11) NOT NULL,
  `authorId` int(11) NOT NULL,
  PRIMARY KEY (`bookId`,`authorId`),
  KEY `FK_bd1523e8f4d8a04cd9e6bd8a139` (`authorId`),
  CONSTRAINT `FK_49317e96c1e48ad58971b515b50` FOREIGN KEY (`bookId`) REFERENCES `books` (`id`) ON DELETE CASCADE,
  CONSTRAINT `FK_bd1523e8f4d8a04cd9e6bd8a139` FOREIGN KEY (`authorId`) REFERENCES `authors` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `books_authors`
--

LOCK TABLES `books_authors` WRITE;
INSERT INTO `books_authors` VALUES (1,1),(2,1),(1,2),(1,3),(2,4),(3,5),(4,5),(3,6),(3,7),(3,8),(3,9),(4,10),(4,11),(13,11),(4,12),(4,13),(4,14),(5,16),(6,17),(7,18),(7,19),(7,20),(7,21),(8,22),(9,22),(8,23),(9,24),(10,24),(11,25),(12,26);
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-05-10 19:09:40
