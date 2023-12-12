-- --------------------------------------------------------
-- Hôte:                         127.0.0.1
-- Version du serveur:           8.0.30 - MySQL Community Server - GPL
-- SE du serveur:                Win64
-- HeidiSQL Version:             12.1.0.6537
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Listage de la structure de la base pour restoflash
CREATE DATABASE IF NOT EXISTS `restoflash` /*!40100 DEFAULT CHARACTER SET utf8mb3 */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `restoflash`;

-- Listage de la structure de table restoflash. etablissements
CREATE TABLE IF NOT EXISTS `etablissements` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nomEtablissement` varchar(100) NOT NULL,
  `createdAt` timestamp NULL DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb3;

-- Listage des données de la table restoflash.etablissements : ~3 rows (environ)
INSERT INTO `etablissements` (`id`, `nomEtablissement`, `createdAt`, `updatedAt`) VALUES
	(1, 'Montana Sanchez', NULL, '2023-11-28 19:48:55'),
	(2, 'College Amiral Bouvet', NULL, NULL),
	(3, 'College Hubert Delisle', NULL, NULL);

-- Listage de la structure de table restoflash. registres
CREATE TABLE IF NOT EXISTS `registres` (
  `id` int NOT NULL AUTO_INCREMENT,
  `quantite` varchar(600) NOT NULL,
  `date` datetime NOT NULL,
  `userId` int NOT NULL,
  `createdAt` timestamp NULL DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  KEY `fk_registre_User1_idx` (`userId`) USING BTREE,
  CONSTRAINT `fk_registre_User1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3;

-- Listage des données de la table restoflash.registres : ~1 rows (environ)
INSERT INTO `registres` (`id`, `quantite`, `date`, `userId`, `createdAt`, `updatedAt`) VALUES
	(1, '10kg steack', '2023-11-29 00:02:51', 2, NULL, NULL);

-- Listage de la structure de table restoflash. users
CREATE TABLE IF NOT EXISTS `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nom` varchar(50) NOT NULL,
  `prenom` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `role` int NOT NULL,
  `etablissementId` int NOT NULL,
  `createdAt` timestamp NULL DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE KEY `email_UNIQUE` (`email`),
  KEY `fk_User_etablissement1_idx` (`etablissementId`) USING BTREE,
  CONSTRAINT `fk_User_etablissement1` FOREIGN KEY (`etablissementId`) REFERENCES `etablissements` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3;

-- Listage des données de la table restoflash.users : ~2 rows (environ)
INSERT INTO `users` (`id`, `nom`, `prenom`, `email`, `password`, `role`, `etablissementId`, `createdAt`, `updatedAt`) VALUES
	(1, 'Doe', 'John', 'john.doe@gmail.com', '$2b$10$TGJ8A4MJhnXouKJ1BcFda.jEGpFNnvx4KTXIZ/tl9gbKEv4zx87iK', 1, 1, '2023-11-28 12:05:56', '2023-11-28 12:05:56'),
	(2, 'Daniels', 'Jack', 'jack.daniels@gmail.com', '$2b$10$TGJ8A4MJhnXouKJ1BcFda.jEGpFNnvx4KTXIZ/tl9gbKEv4zx87iK', 2, 1, '2023-11-28 12:06:00', '2023-11-28 12:05:56');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
