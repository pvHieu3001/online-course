CREATE DATABASE  IF NOT EXISTS `arthralgia` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `arthralgia`;
-- MySQL dump 10.13  Distrib 8.0.21, for Linux (x86_64)
--
-- Host: 127.0.0.1    Database: arthralgia
-- ------------------------------------------------------
-- Server version	8.0.21-0ubuntu0.20.04.4

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
-- Table structure for table `affected_areas`
--

DROP TABLE IF EXISTS `affected_areas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `affected_areas` (
  `id` int NOT NULL AUTO_INCREMENT,
  `date` datetime NOT NULL,
  `recorder` varchar(10) NOT NULL,
  `type` varchar(45) NOT NULL,
  `area` varchar(20) NOT NULL,
  `uid` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_affected_areas_patient_uid_idx` (`uid`),
  KEY `i_date` (`date`),
  KEY `i_recorder` (`recorder`),
  KEY `i_type` (`type`),
  KEY `i_area` (`area`),
  CONSTRAINT `fk_affected_areas_patient_uid` FOREIGN KEY (`uid`) REFERENCES `patients` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=19580 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `barometric_pressures`
--

DROP TABLE IF EXISTS `barometric_pressures`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `barometric_pressures` (
  `id` int NOT NULL AUTO_INCREMENT,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `barometric` float NOT NULL,
  `uid` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_barometric_pressures_patient_uid_idx` (`uid`),
  KEY `i_date` (`date`),
  CONSTRAINT `fk_barometric_pressures_patient_uid` FOREIGN KEY (`uid`) REFERENCES `patients` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=48625 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `doctor_interviews`
--

DROP TABLE IF EXISTS `doctor_interviews`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `doctor_interviews` (
  `id` int NOT NULL AUTO_INCREMENT,
  `date` datetime NOT NULL,
  `g_vas` int NOT NULL COMMENT '0-100mm',
  `uid` varchar(45) NOT NULL,
  PRIMARY KEY (`id`,`date`),
  KEY `fk_doctor_interviews_patient_uid_idx` (`uid`),
  KEY `i_date` (`date`),
  CONSTRAINT `fk_doctor_interviews_patient_uid` FOREIGN KEY (`uid`) REFERENCES `patients` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=109 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `footsteps`
--

DROP TABLE IF EXISTS `footsteps`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `footsteps` (
  `id` int NOT NULL AUTO_INCREMENT,
  `date` datetime NOT NULL,
  `step` int NOT NULL,
  `uid` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_footsteps_patient_uid_idx` (`uid`),
  KEY `i_date` (`date`),
  CONSTRAINT `fk_footsteps_patient_uid` FOREIGN KEY (`uid`) REFERENCES `patients` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=535 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `full_symptoms`
--

DROP TABLE IF EXISTS `full_symptoms`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `full_symptoms` (
  `id` int NOT NULL AUTO_INCREMENT,
  `uid` varchar(45) DEFAULT NULL,
  `date` datetime NOT NULL,
  `doctor_pain` int DEFAULT NULL,
  `doctor_primary_pain` int DEFAULT NULL,
  `doctor_swelling` int DEFAULT NULL,
  `doctor_primary_swelling` int DEFAULT NULL,
  `dr_g_vas` int DEFAULT NULL,
  `g_vas` int DEFAULT NULL,
  `p_vas` int DEFAULT NULL,
  `jhaq_score` float DEFAULT NULL,
  `ms_duration` varchar(5) DEFAULT NULL,
  `crp` float DEFAULT NULL,
  `esr` int DEFAULT NULL,
  `mmp3` float DEFAULT NULL,
  `das28_esr` float DEFAULT NULL,
  `das28_crp` float DEFAULT NULL,
  `cdai` float DEFAULT NULL,
  `sdai` float DEFAULT NULL,
  `patient_swelling` int DEFAULT NULL,
  `patient_primary_swelling` int DEFAULT NULL,
  `patient_pain` int DEFAULT NULL,
  `patient_primary_pain` int DEFAULT NULL,
  `barometric1` float DEFAULT NULL,
  `time1` varchar(9) DEFAULT NULL,
  `barometric2` float DEFAULT NULL,
  `time2` varchar(9) DEFAULT NULL,
  `barometric3` float DEFAULT NULL,
  `time3` varchar(9) DEFAULT NULL,
  `barometric4` float DEFAULT NULL,
  `time4` varchar(9) DEFAULT NULL,
  `barometric5` float DEFAULT NULL,
  `time5` varchar(9) DEFAULT NULL,
  `barometric6` float DEFAULT NULL,
  `time6` varchar(9) DEFAULT NULL,
  `barometric7` float DEFAULT NULL,
  `time7` varchar(9) DEFAULT NULL,
  `barometric8` float DEFAULT NULL,
  `time8` varchar(9) DEFAULT NULL,
  `barometric9` float DEFAULT NULL,
  `time9` varchar(9) DEFAULT NULL,
  `barometric10` float DEFAULT NULL,
  `time10` varchar(9) DEFAULT NULL,
  `step` int DEFAULT NULL,
  `haq_1` int DEFAULT NULL,
  `haq_2` int DEFAULT NULL,
  `haq_3` int DEFAULT NULL,
  `haq_4` int DEFAULT NULL,
  `haq_5` int DEFAULT NULL,
  `haq_6` int DEFAULT NULL,
  `haq_7` int DEFAULT NULL,
  `haq_8` int DEFAULT NULL,
  `haq_9` int DEFAULT NULL,
  `haq_10` int DEFAULT NULL,
  `haq_11` int DEFAULT NULL,
  `haq_12` int DEFAULT NULL,
  `haq_13` int DEFAULT NULL,
  `haq_14` int DEFAULT NULL,
  `haq_15` int DEFAULT NULL,
  `haq_16` int DEFAULT NULL,
  `haq_17` int DEFAULT NULL,
  `haq_18` int DEFAULT NULL,
  `haq_19` int DEFAULT NULL,
  `haq_20` int DEFAULT NULL,
  `pt_01` varchar(14) DEFAULT NULL,
  `pt_02` varchar(14) DEFAULT NULL,
  `pt_03` varchar(14) DEFAULT NULL,
  `pt_04` varchar(14) DEFAULT NULL,
  `pt_05` varchar(14) DEFAULT NULL,
  `pt_06` varchar(14) DEFAULT NULL,
  `pt_07` varchar(14) DEFAULT NULL,
  `pt_08` varchar(14) DEFAULT NULL,
  `pt_09` varchar(14) DEFAULT NULL,
  `pt_10` varchar(14) DEFAULT NULL,
  `pt_11` varchar(14) DEFAULT NULL,
  `pt_12` varchar(14) DEFAULT NULL,
  `pt_13` varchar(14) DEFAULT NULL,
  `pt_14` varchar(14) DEFAULT NULL,
  `pt_15` varchar(14) DEFAULT NULL,
  `pt_16` varchar(14) DEFAULT NULL,
  `pt_17` varchar(14) DEFAULT NULL,
  `pt_18` varchar(14) DEFAULT NULL,
  `pt_19` varchar(14) DEFAULT NULL,
  `pt_20` varchar(14) DEFAULT NULL,
  `pt_21` varchar(14) DEFAULT NULL,
  `pt_22` varchar(14) DEFAULT NULL,
  `pt_23` varchar(14) DEFAULT NULL,
  `pt_24` varchar(14) DEFAULT NULL,
  `pt_25` varchar(14) DEFAULT NULL,
  `pt_26` varchar(14) DEFAULT NULL,
  `pt_27` varchar(14) DEFAULT NULL,
  `pt_28` varchar(14) DEFAULT NULL,
  `pt_29` varchar(14) DEFAULT NULL,
  `pt_30` varchar(14) DEFAULT NULL,
  `pt_31` varchar(14) DEFAULT NULL,
  `pt_32` varchar(14) DEFAULT NULL,
  `pt_33` varchar(14) DEFAULT NULL,
  `pt_34` varchar(14) DEFAULT NULL,
  `pt_35` varchar(14) DEFAULT NULL,
  `pt_36` varchar(14) DEFAULT NULL,
  `pt_37` varchar(14) DEFAULT NULL,
  `pt_38` varchar(14) DEFAULT NULL,
  `pt_39` varchar(14) DEFAULT NULL,
  `pt_40` varchar(14) DEFAULT NULL,
  `pt_41` varchar(14) DEFAULT NULL,
  `pt_42` varchar(14) DEFAULT NULL,
  `pt_43` varchar(14) DEFAULT NULL,
  `pt_44` varchar(14) DEFAULT NULL,
  `pt_45` varchar(14) DEFAULT NULL,
  `pt_46` varchar(14) DEFAULT NULL,
  `pt_47` varchar(14) DEFAULT NULL,
  `pt_48` varchar(14) DEFAULT NULL,
  `pt_49` varchar(14) DEFAULT NULL,
  `pt_50` varchar(14) DEFAULT NULL,
  `pt_51` varchar(14) DEFAULT NULL,
  `pt_52` varchar(14) DEFAULT NULL,
  `pt_53` varchar(14) DEFAULT NULL,
  `pt_54` varchar(14) DEFAULT NULL,
  `pt_55` varchar(14) DEFAULT NULL,
  `pt_56` varchar(14) DEFAULT NULL,
  `pt_57` varchar(14) DEFAULT NULL,
  `pt_58` varchar(14) DEFAULT NULL,
  `pt_59` varchar(14) DEFAULT NULL,
  `pt_60` varchar(14) DEFAULT NULL,
  `pt_61` varchar(14) DEFAULT NULL,
  `pt_62` varchar(14) DEFAULT NULL,
  `pt_63` varchar(14) DEFAULT NULL,
  `pt_64` varchar(14) DEFAULT NULL,
  `pt_65` varchar(14) DEFAULT NULL,
  `pt_66` varchar(14) DEFAULT NULL,
  `pt_67` varchar(14) DEFAULT NULL,
  `pt_68` varchar(14) DEFAULT NULL,
  `pt_69` varchar(14) DEFAULT NULL,
  `pt_70` varchar(14) DEFAULT NULL,
  `dr_01` varchar(14) DEFAULT NULL,
  `dr_02` varchar(14) DEFAULT NULL,
  `dr_03` varchar(14) DEFAULT NULL,
  `dr_04` varchar(14) DEFAULT NULL,
  `dr_05` varchar(14) DEFAULT NULL,
  `dr_06` varchar(14) DEFAULT NULL,
  `dr_07` varchar(14) DEFAULT NULL,
  `dr_08` varchar(14) DEFAULT NULL,
  `dr_09` varchar(14) DEFAULT NULL,
  `dr_10` varchar(14) DEFAULT NULL,
  `dr_11` varchar(14) DEFAULT NULL,
  `dr_12` varchar(14) DEFAULT NULL,
  `dr_13` varchar(14) DEFAULT NULL,
  `dr_14` varchar(14) DEFAULT NULL,
  `dr_15` varchar(14) DEFAULT NULL,
  `dr_16` varchar(14) DEFAULT NULL,
  `dr_17` varchar(14) DEFAULT NULL,
  `dr_18` varchar(14) DEFAULT NULL,
  `dr_19` varchar(14) DEFAULT NULL,
  `dr_20` varchar(14) DEFAULT NULL,
  `dr_21` varchar(14) DEFAULT NULL,
  `dr_22` varchar(14) DEFAULT NULL,
  `dr_23` varchar(14) DEFAULT NULL,
  `dr_24` varchar(14) DEFAULT NULL,
  `dr_25` varchar(14) DEFAULT NULL,
  `dr_26` varchar(14) DEFAULT NULL,
  `dr_27` varchar(14) DEFAULT NULL,
  `dr_28` varchar(14) DEFAULT NULL,
  `dr_29` varchar(14) DEFAULT NULL,
  `dr_30` varchar(14) DEFAULT NULL,
  `dr_31` varchar(14) DEFAULT NULL,
  `dr_32` varchar(14) DEFAULT NULL,
  `dr_33` varchar(14) DEFAULT NULL,
  `dr_34` varchar(14) DEFAULT NULL,
  `dr_35` varchar(14) DEFAULT NULL,
  `dr_36` varchar(14) DEFAULT NULL,
  `dr_37` varchar(14) DEFAULT NULL,
  `dr_38` varchar(14) DEFAULT NULL,
  `dr_39` varchar(14) DEFAULT NULL,
  `dr_40` varchar(14) DEFAULT NULL,
  `dr_41` varchar(14) DEFAULT NULL,
  `dr_42` varchar(14) DEFAULT NULL,
  `dr_43` varchar(14) DEFAULT NULL,
  `dr_44` varchar(14) DEFAULT NULL,
  `dr_45` varchar(14) DEFAULT NULL,
  `dr_46` varchar(14) DEFAULT NULL,
  `dr_47` varchar(14) DEFAULT NULL,
  `dr_48` varchar(14) DEFAULT NULL,
  `dr_49` varchar(14) DEFAULT NULL,
  `dr_50` varchar(14) DEFAULT NULL,
  `dr_51` varchar(14) DEFAULT NULL,
  `dr_52` varchar(14) DEFAULT NULL,
  `dr_53` varchar(14) DEFAULT NULL,
  `dr_54` varchar(14) DEFAULT NULL,
  `dr_55` varchar(14) DEFAULT NULL,
  `dr_56` varchar(14) DEFAULT NULL,
  `dr_57` varchar(14) DEFAULT NULL,
  `dr_58` varchar(14) DEFAULT NULL,
  `dr_59` varchar(14) DEFAULT NULL,
  `dr_60` varchar(14) DEFAULT NULL,
  `dr_61` varchar(14) DEFAULT NULL,
  `dr_62` varchar(14) DEFAULT NULL,
  `dr_63` varchar(14) DEFAULT NULL,
  `dr_64` varchar(14) DEFAULT NULL,
  `dr_65` varchar(14) DEFAULT NULL,
  `dr_66` varchar(14) DEFAULT NULL,
  `dr_67` varchar(14) DEFAULT NULL,
  `dr_68` varchar(14) DEFAULT NULL,
  `dr_69` varchar(14) DEFAULT NULL,
  `dr_70` varchar(14) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `i_uid` (`uid`),
  KEY `i_date` (`date`)
) ENGINE=InnoDB AUTO_INCREMENT=440 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `haq_answers`
--

DROP TABLE IF EXISTS `haq_answers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `haq_answers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `date` datetime NOT NULL,
  `question_id` int NOT NULL,
  `answer` int NOT NULL,
  `uid` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_haq_answers_patient_uid_idx` (`uid`),
  KEY `fk_haq_answers_question_id_idx` (`question_id`),
  KEY `i_date` (`date`),
  CONSTRAINT `fk_haq_answers_patient_uid` FOREIGN KEY (`uid`) REFERENCES `patients` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT `fk_haq_answers_question_id` FOREIGN KEY (`question_id`) REFERENCES `questions` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3515 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `measurements`
--

DROP TABLE IF EXISTS `measurements`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `measurements` (
  `id` int NOT NULL AUTO_INCREMENT,
  `date` datetime NOT NULL,
  `esr` int NOT NULL COMMENT 'mm/h',
  `crp` float NOT NULL,
  `mmp3` float NOT NULL,
  `uid` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_measurements_patient_uid_idx` (`uid`),
  KEY `i_date` (`date`),
  CONSTRAINT `fk_measurements_patient_uid` FOREIGN KEY (`uid`) REFERENCES `patients` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=131 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `members`
--

DROP TABLE IF EXISTS `members`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `members` (
  `id` varchar(45) NOT NULL,
  `name` varchar(50) NOT NULL,
  `uid` varchar(45) NOT NULL,
  `parent_uid` varchar(45) NOT NULL,
  `create_at` date DEFAULT NULL,
  `update_at` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_members_patients_uid_idx` (`uid`),
  KEY `fk_members_patients_parent_uid_idx` (`parent_uid`),
  CONSTRAINT `fk_members_patients_parent_uid` FOREIGN KEY (`parent_uid`) REFERENCES `patients` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT `fk_members_patients_uid` FOREIGN KEY (`uid`) REFERENCES `patients` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `patient_images`
--

DROP TABLE IF EXISTS `patient_images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `patient_images` (
  `id` varchar(45) NOT NULL,
  `uid` varchar(45) NOT NULL,
  `data` mediumblob NOT NULL,
  `date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `file_type` varchar(45) NOT NULL,
  `file_name` varchar(45) NOT NULL,
  `area_type` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_patient_images_patient_uid_idx` (`uid`),
  KEY `i_date` (`date`),
  KEY `i_area_type` (`area_type`),
  CONSTRAINT `fk_patient_images_patient_uid` FOREIGN KEY (`uid`) REFERENCES `patients` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `patient_interviews`
--

DROP TABLE IF EXISTS `patient_interviews`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `patient_interviews` (
  `id` int NOT NULL AUTO_INCREMENT,
  `date` datetime NOT NULL,
  `g_vas` int NOT NULL DEFAULT '0' COMMENT '0-100mm',
  `p_vas` int NOT NULL DEFAULT '0' COMMENT '0-100mm',
  `stiffened_time_span` varchar(20) NOT NULL,
  `uid` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_patient_interviews_parient_uid_idx` (`uid`),
  KEY `i_date` (`date`),
  CONSTRAINT `fk_patient_interviews_parient_uid` FOREIGN KEY (`uid`) REFERENCES `patients` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=243 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `patients`
--

DROP TABLE IF EXISTS `patients`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `patients` (
  `id` varchar(45) NOT NULL,
  `email` varchar(45) DEFAULT NULL,
  `password` varchar(60) DEFAULT NULL,
  `temporary_password` varchar(60) DEFAULT NULL,
  `create_at` datetime DEFAULT NULL,
  `creator` varchar(45) DEFAULT NULL,
  `enabled` tinyint(1) NOT NULL,
  `last_login` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `questions`
--

DROP TABLE IF EXISTS `questions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `questions` (
  `id` int NOT NULL,
  `title` varchar(45) NOT NULL,
  `detail` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `verification_tokens`
--

DROP TABLE IF EXISTS `verification_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `verification_tokens` (
  `id` int NOT NULL AUTO_INCREMENT,
  `token` varchar(45) NOT NULL,
  `expired_date` datetime NOT NULL,
  `uid` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_verification_tokens_1_idx` (`uid`),
  CONSTRAINT `fk_verification_tokens_1` FOREIGN KEY (`uid`) REFERENCES `patients` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=48 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping events for database 'arthralgia'
--

--
-- Dumping routines for database 'arthralgia'
--
/*!50003 DROP FUNCTION IF EXISTS `countCDAI` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` FUNCTION `countCDAI`(doctorPain int, doctorSwelling int, gVas int, drGVas int) RETURNS float
BEGIN
declare err boolean default false;
    declare output float default 0.0;
	DECLARE continue handler for SQLEXCEPTION set err = true;
	set output= doctorPain + doctorSwelling + gVas/10 + drGVas/10;
    if err then 
		return 0.0;
    end if;
    
	RETURN output;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP FUNCTION IF EXISTS `countDAS28CRP` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` FUNCTION `countDAS28CRP`(doctorPain int, doctorSwelling int, gVas int, crp float) RETURNS float
BEGIN
declare err boolean default false;
    declare output float default 0.0;
	DECLARE continue handler for SQLEXCEPTION set err = true;
	set output =  0.56 * sqrt(doctorPain) + 0.28 * sqrt(doctorSwelling) + (0.36 * log(crp*10 + 1))/log(exp(1)) + 0.014 * gVas + 0.96;
    if err then 
		return 0.0;
    end if;
    
	RETURN output;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP FUNCTION IF EXISTS `countDAS28ESR` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` FUNCTION `countDAS28ESR`(doctorPain int, doctorSwelling int, gVas int, esr int) RETURNS float
BEGIN
	declare err boolean default false;
    declare output float default 0.0;
	DECLARE continue handler for SQLEXCEPTION set err = true;
    set output = 0.56 * sqrt(doctorPain) + 0.28 * sqrt(doctorSwelling) + (0.70 * log(esr))/log(exp(1)) + 0.014 * gVas;
    if err then 
		return 0.0;
    end if;
    
	RETURN output;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP FUNCTION IF EXISTS `countSDAI` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` FUNCTION `countSDAI`(doctorPain int, doctorSwelling int, gVas int, drGVas int, crp float) RETURNS float
BEGIN
declare err boolean default false;
    declare output float default 0.0;
	DECLARE continue handler for SQLEXCEPTION set err = true;
    set output= doctorPain + doctorSwelling + gVas/10 + drGVas/10 + crp;
    if err then 
		return 0.0;
    end if;
    
	RETURN output;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP FUNCTION IF EXISTS `count_JHAQ` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` FUNCTION `count_JHAQ`(p_uid varchar(45), p_date DATE) RETURNS float
BEGIN
	declare err boolean default false;
    declare result float default 0.0;
	DECLARE continue handler for SQLEXCEPTION set err = true;
	
	SELECT 
    ROUND(SUM(main.max_answer) / COUNT(*), 2) AS score
FROM
    (SELECT 
        q.title,
            MAX(CASE
                WHEN a.answer IS NOT NULL and a.answer != -1 THEN a.answer
                ELSE 0
            END) max_answer
    FROM
        arthralgia.questions AS q
    LEFT JOIN arthralgia.haq_answers AS a ON a.question_id = q.id
    WHERE
        a.uid = p_uid and date(a.date)= p_date
    GROUP BY title) AS main INTO result;
    
    if err then 
		return 0.0;
    end if;
RETURN result;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP FUNCTION IF EXISTS `getPaintValue` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE DEFINER=`skip-grants user`@`skip-grants host` FUNCTION `getPaintValue`(v_type varchar(14)) RETURNS varchar(1) CHARSET latin1
BEGIN
    DECLARE result varchar(1) DEFAULT 0;
	SELECT CASE WHEN v_type LIKE 'PAIN%' THEN 1
		ELSE 0 END
	AS VALUE into result;
	
	return result;
    END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP FUNCTION IF EXISTS `getSwellingValue` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE DEFINER=`skip-grants user`@`skip-grants host` FUNCTION `getSwellingValue`(v_type varchar(14)) RETURNS varchar(1) CHARSET latin1
BEGIN
    DECLARE result varchar(1) DEFAULT 0;
	SELECT CASE WHEN v_type LIKE '%SWELLING1' THEN 1
		WHEN v_type LIKE '%SWELLING2' THEN 2
		WHEN v_type LIKE '%SWELLING3' THEN 3
		ELSE 0 END
	AS VALUE into result;
	
	return result;
    END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP FUNCTION IF EXISTS `primary_area` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` FUNCTION `primary_area`() RETURNS varchar(100) CHARSET utf8mb4
BEGIN
	RETURN 'L4,L5,L6,L7,L8,L9,L10,L11,L12,L13,L14,L15,L16,L22,R4,R5,R6,R7,R8,R9,R10,R11,R12,R13,R14,R15,R16,R22';
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `clear_user_data` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `clear_user_data`(v_email varchar(45))
BEGIN
	DECLARE done boolean default false;
	declare v_uid varchar(45) default 0;
    
    # Get list uid from member, patient by email
    declare cur_uid cursor for 
		select
			m.uid
		from members as m,
			patients as p
        where m.parent_uid = p.id and p.email = v_email;
	DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;
    
    start transaction;
	open cur_uid;
    
    read_cur_uid:loop
    fetch cur_uid into v_uid;
    
    # Leave cursor if done
    if done then
		leave read_cur_uid;
    end if;
    
    # Delete related info
    delete from footsteps where uid = v_uid;
	delete from doctor_interviews where uid = v_uid;
	delete from barometric_pressures where uid = v_uid;
    delete from full_symptoms where uid = v_uid;
	delete from haq_answers where uid = v_uid;
	delete from measurements where uid = v_uid;
	delete from patient_images where uid = v_uid;
	delete from patient_interviews where uid = v_uid;
	delete from affected_areas where uid = v_uid;
	delete from members where uid = v_uid;
	delete from patients where id = v_uid;
    
    end loop;
    close cur_uid;
	commit;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `count_affected_area` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `count_affected_area`(
	IN p_uid varchar(45),
    IN p_date date,
    OUT doctor_pain int,
    OUT doctor_primary_pain int,
    OUT doctor_swelling int,
    OUT doctor_primary_swelling int,
    OUT patient_pain int,
    OUT patient_primary_pain int,
    OUT patient_swelling int,
    OUT patient_primary_swelling int
	)
begin
	declare done boolean default false;
	declare cur_affected_area cursor for 
		select
             count(CASE WHEN recorder = 'DOCTOR' AND type like '%PAIN%' AND FIND_IN_SET(`area`, 'R35,L35') <= 0 then 1 END) as  'doctor_pain',
			 count(CASE WHEN recorder = 'DOCTOR' AND type like '%PAIN%' AND find_in_set(area, primary_area()) > 0 THEN 1 END) as 'doctor_primary_pain',
             count(CASE WHEN recorder = 'DOCTOR' AND type like '%SWELLING%' AND FIND_IN_SET(`area`, 'R35,L35')<=0 THEN 1 END) as  'doctor_swelling',
			 count(CASE WHEN recorder = 'DOCTOR' AND type like '%SWELLING%' AND find_in_set(area, primary_area()) > 0 THEN 1 END) as 'doctor_primary_swelling',
			 count(CASE WHEN recorder = 'PATIENT' AND type like '%PAIN%' AND FIND_IN_SET(`area`, 'R35,L35') <= 0 THEN 1 END) as  'patient_pain',
			 count(CASE WHEN recorder = 'PATIENT' AND type like '%PAIN%' AND find_in_set(area, primary_area()) > 0 THEN 1 END) as 'patient_primary_pain',
			 count(CASE WHEN recorder = 'PATIENT' AND type like '%SWELLING%' AND FIND_IN_SET(`area`, 'R35,L35')<=0 THEN 1 END) as  'patient_swelling',
			 count(CASE WHEN recorder = 'PATIENT' AND type like '%SWELLING%' AND find_in_set(area, primary_area()) > 0 THEN 1 END) as 'patient_primary_swelling'
		from affected_areas aa
        where date(aa.date) = p_date and aa.uid = p_uid;
        
	declare continue handler for not found set done = TRUE;
	open cur_affected_area;
    
    read_cur: LOOP 
		FETCH cur_affected_area into doctor_pain, doctor_primary_pain, doctor_swelling, doctor_primary_swelling,
									patient_pain, patient_primary_pain, patient_swelling, patient_primary_swelling;
		if done then
			leave read_cur;
		end if;
        
    end loop;
	close cur_affected_area;
end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `get_csv_data` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_csv_data`()
BEGIN
	select 
		p.email,
		date(date) as 'Date',
		doctor_pain as 'DrTJCount(68)',
		doctor_primary_pain as 'DrTJCount(28)',
		doctor_swelling as 'DrSJCount(66)',
		doctor_primary_swelling as 'DrSJCount(28)',
		dr_g_vas as 'Dr-G-VAS',
		g_vas as 'Pt-G-VAS',
		p_vas as 'Pt-P-VAS',
		jhaq_score as 'HAQ Score',
		concat(ms_duration, ' ', 'min') as 'MS Duration',
		crp as 'CRP',
		esr as 'ESR',
		mmp3 as 'MMP-3',
		das28_esr as 'DAS28-ESR',
		das28_crp as 'DAS28-CRP',
		cdai as 'CDAI',
		sdai as 'SDAI',
		patient_swelling as 'PtSJCount(66)',
		patient_primary_swelling as 'PtSJCount(28)',
		patient_pain as 'PtTJCount(68)',
		patient_primary_pain as 'PtTJCount(28)',
		barometric1 as 'Barometer01',
		time1 as 'Time01',
		barometric2 as 'Barometer02',
		time2 as 'Time02',
		barometric3 as 'Barometer03',
		time3 as 'Time03',
		barometric4 as 'Barometer04',
		time4 as 'Time04',
		barometric5 as 'Barometer05',
		time5 as 'Time05',
		barometric6 as 'Barometer06',
		time6 as 'Time06',
		barometric7 as 'Barometer07',
		time7 as 'Time07',
		barometric8 as 'Barometer08',
		time8 as 'Time08',
		barometric9 as 'Barometer09',
		time9 as 'Time09',
		barometric10 as 'Barometer10',
		time10 as 'Time10',
		step as 'Steps',
		haq_1 as 'HAQ_Q1',
		haq_2 as 'HAQ_Q2',
		haq_3 as 'HAQ_Q3',
		haq_4 as 'HAQ_Q4',
		haq_5 as 'HAQ_Q5',
		haq_6 as 'HAQ_Q6',
		haq_7 as 'HAQ_Q7',
		haq_8 as 'HAQ_Q8',
		haq_9 as 'HAQ_Q9',
		haq_10 as 'HAQ_Q10',
		haq_11 as 'HAQ_Q11',
		haq_12 as 'HAQ_Q12',
		haq_13 as 'HAQ_Q13',
		haq_14 as 'HAQ_Q14',
		haq_15 as 'HAQ_Q15',
		haq_16 as 'HAQ_Q16',
		haq_17 as 'HAQ_Q17',
		haq_18 as 'HAQ_Q18',
		haq_19 as 'HAQ_Q19',
		haq_20 as 'HAQ_Q20',
		getSwellingValue(pt_01) AS 'PtSJ01_R_TMJ',
		getSwellingValue(pt_02) AS 'PtSJ02_R_SCJ',
		getSwellingValue(pt_03) AS 'PtSJ03_R_ACJ',
		getSwellingValue(pt_04) AS 'PtSJ04_R_shoulder',
		getSwellingValue(pt_05) AS 'PtSJ05_R_elbow',
		getSwellingValue(pt_06) AS 'PtSJ06_R_wrist',
		getSwellingValue(pt_07) AS 'PtSJ07_R_1MCP',
		getSwellingValue(pt_08) AS 'PtSJ08_R_2MCP',
		getSwellingValue(pt_09) AS 'PtSJ09_R_3MCP',
		getSwellingValue(pt_10) AS 'PtSJ10_R_4MCP',
		getSwellingValue(pt_11) AS 'PtSJ11_R_5MCP',
		getSwellingValue(pt_12) AS 'PtSJ12_R_1IP',
		getSwellingValue(pt_13) AS 'PtSJ13_R_2PIP',
		getSwellingValue(pt_14) AS 'PtSJ14_R_3PIP',
		getSwellingValue(pt_15) AS 'PtSJ15_R_4PIP',
		getSwellingValue(pt_16) AS 'PtSJ16_R_5PIP',
		getSwellingValue(pt_17) AS 'PtSJ17_R_2DIP',
		getSwellingValue(pt_18) AS 'PtSJ18_R_3DIP',
		getSwellingValue(pt_19) AS 'PtSJ19_R_4DIP',
		getSwellingValue(pt_20) AS 'PtSJ20_R_5DIP',
		getSwellingValue(pt_22) AS 'PtSJ22_R_knee',
		getSwellingValue(pt_23) AS 'PtSJ23_R_ankle',
		getSwellingValue(pt_24) AS 'PtSJ24_R_tarsus',
		getSwellingValue(pt_25) AS 'PtSJ25_R_1MTP',
		getSwellingValue(pt_26) AS 'PtSJ26_R_2MTP',
		getSwellingValue(pt_27) AS 'PtSJ27_R_3MTP',
		getSwellingValue(pt_28) AS 'PtSJ28_R_4MTP',
		getSwellingValue(pt_29) AS 'PtSJ29_R_5MTP',
		getSwellingValue(pt_30) AS 'PtSJ30_R_1fIP',
		getSwellingValue(pt_31) AS 'PtSJ31_R_2fPIP',
		getSwellingValue(pt_32) AS 'PtSJ32_R_3fPIP',
		getSwellingValue(pt_33) AS 'PtSJ33_R_4fPIP',
		getSwellingValue(pt_34) AS 'PtSJ34_R_5fPIP',
		getSwellingValue(pt_35) AS 'PtSJ35_R_CMC',
		getSwellingValue(pt_36) AS 'PtSJ01_L_TMJ',
		getSwellingValue(pt_37) AS 'PtSJ02_L_SCJ',
		getSwellingValue(pt_38) AS 'PtSJ03_L_ACJ',
		getSwellingValue(pt_39) AS 'PtSJ04_L_shoulder',
		getSwellingValue(pt_40) AS 'PtSJ05_L_elbow',
		getSwellingValue(pt_41) AS 'PtSJ06_L_wrist',
		getSwellingValue(pt_42) AS 'PtSJ07_L_1MCP',
		getSwellingValue(pt_43) AS 'PtSJ08_L_2MCP',
		getSwellingValue(pt_44) AS 'PtSJ09_L_3MCP',
		getSwellingValue(pt_45) AS 'PtSJ10_L_4MCP',
		getSwellingValue(pt_46) AS 'PtSJ11_L_5MCP',
		getSwellingValue(pt_47) AS 'PtSJ12_L_1IP',
		getSwellingValue(pt_48) AS 'PtSJ13_L_2PIP',
		getSwellingValue(pt_49) AS 'PtSJ14_L_3PIP',
		getSwellingValue(pt_50) AS 'PtSJ15_L_4PIP',
		getSwellingValue(pt_51) AS 'PtSJ16_L_5PIP',
		getSwellingValue(pt_52) AS 'PtSJ17_L_2DIP',
		getSwellingValue(pt_53) AS 'PtSJ18_L_3DIP',
		getSwellingValue(pt_54) AS 'PtSJ19_L_4DIP',
		getSwellingValue(pt_55) AS 'PtSJ20_L_5DIP',
		getSwellingValue(pt_56) AS 'PtSJ22_L_knee',
		getSwellingValue(pt_57) AS 'PtSJ23_L_ankle',
		getSwellingValue(pt_58) AS 'PtSJ24_L_tarsus',
		getSwellingValue(pt_59) AS 'PtSJ25_L_1MTP',
		getSwellingValue(pt_60) AS 'PtSJ26_L_2MTP',
		getSwellingValue(pt_61) AS 'PtSJ27_L_3MTP',
		getSwellingValue(pt_62) AS 'PtSJ28_L_4MTP',
		getSwellingValue(pt_63) AS 'PtSJ29_L_5MTP',
		getSwellingValue(pt_64) AS 'PtSJ30_L_1fIP',
		getSwellingValue(pt_65) AS 'PtSJ31_L_2fPIP',
		getSwellingValue(pt_66) AS 'PtSJ32_L_3fPIP',
		getSwellingValue(pt_67) AS 'PtSJ33_L_4fPIP',
		getSwellingValue(pt_68) AS 'PtSJ34_L_5fPIP',
		getSwellingValue(pt_69) AS 'PtSJ35_L_CMC',
		getPaintValue(pt_01) AS 'PtTJ01_R_TMJ',
		getPaintValue(pt_02) AS 'PtTJ02_R_SCJ',
		getPaintValue(pt_03) AS 'PtTJ03_R_ACJ',
		getPaintValue(pt_04) AS 'PtTJ04_R_shoulder',
		getPaintValue(pt_05) AS 'PtTJ05_R_elbow',
		getPaintValue(pt_06) AS 'PtTJ06_R_wrist',
		getPaintValue(pt_07) AS 'PtTJ07_R_1MCP',
		getPaintValue(pt_08) AS 'PtTJ08_R_2MCP',
		getPaintValue(pt_09) AS 'PtTJ09_R_3MCP',
		getPaintValue(pt_10) AS 'PtTJ10_R_4MCP',
		getPaintValue(pt_11) AS 'PtTJ11_R_5MCP',
		getPaintValue(pt_12) AS 'PtTJ12_R_1IP',
		getPaintValue(pt_13) AS 'PtTJ13_R_2PIP',
		getPaintValue(pt_14) AS 'PtTJ14_R_3PIP',
		getPaintValue(pt_15) AS 'PtTJ15_R_4PIP',
		getPaintValue(pt_16) AS 'PtTJ16_R_5PIP',
		getPaintValue(pt_17) AS 'PtTJ17_R_2DIP',
		getPaintValue(pt_18) AS 'PtTJ18_R_3DIP',
		getPaintValue(pt_19) AS 'PtTJ19_R_4DIP',
		getPaintValue(pt_20) AS 'PtTJ20_R_5DIP',
		getPaintValue(pt_21) AS 'PtTJ21_R_hip',
		getPaintValue(pt_22) AS 'PtTJ22_R_knee',
		getPaintValue(pt_23) AS 'PtTJ23_R_ankle',
		getPaintValue(pt_24) AS 'PtTJ24_R_tarsus',
		getPaintValue(pt_25) AS 'PtTJ25_R_1MTP',
		getPaintValue(pt_26) AS 'PtTJ26_R_2MTP',
		getPaintValue(pt_27) AS 'PtTJ27_R_3MTP',
		getPaintValue(pt_28) AS 'PtTJ28_R_4MTP',
		getPaintValue(pt_29) AS 'PtTJ29_R_5MTP',
		getPaintValue(pt_30) AS 'PtTJ30_R_1fIP',
		getPaintValue(pt_31) AS 'PtTJ31_R_2fPIP',
		getPaintValue(pt_32) AS 'PtTJ32_R_3fPIP',
		getPaintValue(pt_33) AS 'PtTJ33_R_4fPIP',
		getPaintValue(pt_34) AS 'PtTJ34_R_5fPIP',
		getPaintValue(pt_35) AS 'PtTJ35_R_CMC',
		getPaintValue(pt_36) AS 'PtTJ01_L_TMJ',
		getPaintValue(pt_37) AS 'PtTJ02_L_SCJ',
		getPaintValue(pt_38) AS 'PtTJ03_L_ACJ',
		getPaintValue(pt_39) AS 'PtTJ04_L_shoulder',
		getPaintValue(pt_40) AS 'PtTJ05_L_elbow',
		getPaintValue(pt_41) AS 'PtTJ06_L_wrist',
		getPaintValue(pt_42) AS 'PtTJ07_L_1MCP',
		getPaintValue(pt_43) AS 'PtTJ08_L_2MCP',
		getPaintValue(pt_44) AS 'PtTJ09_L_3MCP',
		getPaintValue(pt_45) AS 'PtTJ10_L_4MCP',
		getPaintValue(pt_46) AS 'PtTJ11_L_5MCP',
		getPaintValue(pt_47) AS 'PtTJ12_L_1IP',
		getPaintValue(pt_48) AS 'PtTJ13_L_2PIP',
		getPaintValue(pt_49) AS 'PtTJ14_L_3PIP',
		getPaintValue(pt_50) AS 'PtTJ15_L_4PIP',
		getPaintValue(pt_51) AS 'PtTJ16_L_5PIP',
		getPaintValue(pt_52) AS 'PtTJ17_L_2DIP',
		getPaintValue(pt_53) AS 'PtTJ18_L_3DIP',
		getPaintValue(pt_54) AS 'PtTJ19_L_4DIP',
		getPaintValue(pt_55) AS 'PtTJ20_L_5DIP',
		getPaintValue(pt_56) AS 'PtTJ21_L_hip',
		getPaintValue(pt_57) AS 'PtTJ22_L_knee',
		getPaintValue(pt_58) AS 'PtTJ23_L_ankle',
		getPaintValue(pt_59) AS 'PtTJ24_L_tarsus',
		getPaintValue(pt_60) AS 'PtTJ25_L_1MTP',
		getPaintValue(pt_61) AS 'PtTJ26_L_2MTP',
		getPaintValue(pt_62) AS 'PtTJ27_L_3MTP',
		getPaintValue(pt_63) AS 'PtTJ28_L_4MTP',
		getPaintValue(pt_64) AS 'PtTJ29_L_5MTP',
		getPaintValue(pt_65) AS 'PtTJ30_L_1fIP',
		getPaintValue(pt_66) AS 'PtTJ31_L_2fPIP',
		getPaintValue(pt_67) AS 'PtTJ32_L_3fPIP',
		getPaintValue(pt_68) AS 'PtTJ33_L_4fPIP',
		getPaintValue(pt_69) AS 'PtTJ34_L_5fPIP',
		getPaintValue(pt_70) AS 'PtTJ35_L_CMC',
		getSwellingValue(dr_01) AS 'DrSJ01_R_TMJ',
		getSwellingValue(dr_02) AS 'DrSJ02_R_SCJ',
		getSwellingValue(dr_03) AS 'DrSJ03_R_ACJ',
		getSwellingValue(dr_04) AS 'DrSJ04_R_shoulder',
		getSwellingValue(dr_05) AS 'DrSJ05_R_elbow',
		getSwellingValue(dr_06) AS 'DrSJ06_R_wrist',
		getSwellingValue(dr_07) AS 'DrSJ07_R_1MCP',
		getSwellingValue(dr_08) AS 'DrSJ08_R_2MCP',
		getSwellingValue(dr_09) AS 'DrSJ09_R_3MCP',
		getSwellingValue(dr_10) AS 'DrSJ10_R_4MCP',
		getSwellingValue(dr_11) AS 'DrSJ11_R_5MCP',
		getSwellingValue(dr_12) AS 'DrSJ12_R_1IP',
		getSwellingValue(dr_13) AS 'DrSJ13_R_2PIP',
		getSwellingValue(dr_14) AS 'DrSJ14_R_3PIP',
		getSwellingValue(dr_15) AS 'DrSJ15_R_4PIP',
		getSwellingValue(dr_16) AS 'DrSJ16_R_5PIP',
		getSwellingValue(dr_17) AS 'DrSJ17_R_2DIP',
		getSwellingValue(dr_18) AS 'DrSJ18_R_3DIP',
		getSwellingValue(dr_19) AS 'DrSJ19_R_4DIP',
		getSwellingValue(dr_20) AS 'DrSJ20_R_5DIP',
		getSwellingValue(dr_22) AS 'DrSJ22_R_knee',
		getSwellingValue(dr_23) AS 'DrSJ23_R_ankle',
		getSwellingValue(dr_24) AS 'DrSJ24_R_tarsus',
		getSwellingValue(dr_25) AS 'DrSJ25_R_1MTP',
		getSwellingValue(dr_26) AS 'DrSJ26_R_2MTP',
		getSwellingValue(dr_27) AS 'DrSJ27_R_3MTP',
		getSwellingValue(dr_28) AS 'DrSJ28_R_4MTP',
		getSwellingValue(dr_29) AS 'DrSJ29_R_5MTP',
		getSwellingValue(dr_30) AS 'DrSJ30_R_1fIP',
		getSwellingValue(dr_31) AS 'DrSJ31_R_2fPIP',
		getSwellingValue(dr_32) AS 'DrSJ32_R_3fPIP',
		getSwellingValue(dr_33) AS 'DrSJ33_R_4fPIP',
		getSwellingValue(dr_34) AS 'DrSJ34_R_5fPIP',
		getSwellingValue(dr_35) AS 'DrSJ35_R_CMC',
		getSwellingValue(dr_36) AS 'DrSJ01_L_TMJ',
		getSwellingValue(dr_37) AS 'DrSJ02_L_SCJ',
		getSwellingValue(dr_38) AS 'DrSJ03_L_ACJ',
		getSwellingValue(dr_39) AS 'DrSJ04_L_shoulder',
		getSwellingValue(dr_40) AS 'DrSJ05_L_elbow',
		getSwellingValue(dr_41) AS 'DrSJ06_L_wrist',
		getSwellingValue(dr_42) AS 'DrSJ07_L_1MCP',
		getSwellingValue(dr_43) AS 'DrSJ08_L_2MCP',
		getSwellingValue(dr_44) AS 'DrSJ09_L_3MCP',
		getSwellingValue(dr_45) AS 'DrSJ10_L_4MCP',
		getSwellingValue(dr_46) AS 'DrSJ11_L_5MCP',
		getSwellingValue(dr_47) AS 'DrSJ12_L_1IP',
		getSwellingValue(dr_48) AS 'DrSJ13_L_2PIP',
		getSwellingValue(dr_49) AS 'DrSJ14_L_3PIP',
		getSwellingValue(dr_50) AS 'DrSJ15_L_4PIP',
		getSwellingValue(dr_51) AS 'DrSJ16_L_5PIP',
		getSwellingValue(dr_52) AS 'DrSJ17_L_2DIP',
		getSwellingValue(dr_53) AS 'DrSJ18_L_3DIP',
		getSwellingValue(dr_54) AS 'DrSJ19_L_4DIP',
		getSwellingValue(dr_55) AS 'DrSJ20_L_5DIP',
		getSwellingValue(dr_57) AS 'DrSJ22_L_knee',
		getSwellingValue(dr_58) AS 'DrSJ23_L_ankle',
		getSwellingValue(dr_59) AS 'DrSJ24_L_tarsus',
		getSwellingValue(dr_60) AS 'DrSJ25_L_1MTP',
		getSwellingValue(dr_61) AS 'DrSJ26_L_2MTP',
		getSwellingValue(dr_62) AS 'DrSJ27_L_3MTP',
		getSwellingValue(dr_63) AS 'DrSJ28_L_4MTP',
		getSwellingValue(dr_64) AS 'DrSJ29_L_5MTP',
		getSwellingValue(dr_65) AS 'DrSJ30_L_1fIP',
		getSwellingValue(dr_66) AS 'DrSJ31_L_2fPIP',
		getSwellingValue(dr_67) AS 'DrSJ32_L_3fPIP',
		getSwellingValue(dr_68) AS 'DrSJ33_L_4fPIP',
		getSwellingValue(dr_69) AS 'DrSJ34_L_5fPIP',
		getSwellingValue(dr_70) AS 'DrSJ35_L_CMC',
		getPaintValue(dr_01) AS 'DrTJ01_R_TMJ',
		getPaintValue(dr_02) AS 'DrTJ02_R_SCJ',
		getPaintValue(dr_03) AS 'DrTJ03_R_ACJ',
		getPaintValue(dr_04) AS 'DrTJ04_R_shoulder',
		getPaintValue(dr_05) AS 'DrTJ05_R_elbow',
		getPaintValue(dr_06) AS 'DrTJ06_R_wrist',
		getPaintValue(dr_07) AS 'DrTJ07_R_1MCP',
		getPaintValue(dr_08) AS 'DrTJ08_R_2MCP',
		getPaintValue(dr_09) AS 'DrTJ09_R_3MCP',
		getPaintValue(dr_10) AS 'DrTJ10_R_4MCP',
		getPaintValue(dr_11) AS 'DrTJ11_R_5MCP',
		getPaintValue(dr_12) AS 'DrTJ12_R_1IP',
		getPaintValue(dr_13) AS 'DrTJ13_R_2PIP',
		getPaintValue(dr_14) AS 'DrTJ14_R_3PIP',
		getPaintValue(dr_15) AS 'DrTJ15_R_4PIP',
		getPaintValue(dr_16) AS 'DrTJ16_R_5PIP',
		getPaintValue(dr_17) AS 'DrTJ17_R_2DIP',
		getPaintValue(dr_18) AS 'DrTJ18_R_3DIP',
		getPaintValue(dr_19) AS 'DrTJ19_R_4DIP',
		getPaintValue(dr_20) AS 'DrTJ20_R_5DIP',
		getPaintValue(dr_21) AS 'DrTJ21_R_hip',
		getPaintValue(dr_22) AS 'DrTJ22_R_knee',
		getPaintValue(dr_23) AS 'DrTJ23_R_ankle',
		getPaintValue(dr_24) AS 'DrTJ24_R_tarsus',
		getPaintValue(dr_25) AS 'DrTJ25_R_1MTP',
		getPaintValue(dr_26) AS 'DrTJ26_R_2MTP',
		getPaintValue(dr_27) AS 'DrTJ27_R_3MTP',
		getPaintValue(dr_28) AS 'DrTJ28_R_4MTP',
		getPaintValue(dr_29) AS 'DrTJ29_R_5MTP',
		getPaintValue(dr_30) AS 'DrTJ30_R_1fIP',
		getPaintValue(dr_31) AS 'DrTJ31_R_2fPIP',
		getPaintValue(dr_32) AS 'DrTJ32_R_3fPIP',
		getPaintValue(dr_33) AS 'DrTJ33_R_4fPIP',
		getPaintValue(dr_34) AS 'DrTJ34_R_5fPIP',
		getPaintValue(dr_35) AS 'DrTJ35_R_CMC',
		getPaintValue(dr_36) AS 'DrTJ01_L_TMJ',
		getPaintValue(dr_37) AS 'DrTJ02_L_SCJ',
		getPaintValue(dr_38) AS 'DrTJ03_L_ACJ',
		getPaintValue(dr_39) AS 'DrTJ04_L_shoulder',
		getPaintValue(dr_40) AS 'DrTJ05_L_elbow',
		getPaintValue(dr_41) AS 'DrTJ06_L_wrist',
		getPaintValue(dr_42) AS 'DrTJ07_L_1MCP',
		getPaintValue(dr_43) AS 'DrTJ08_L_2MCP',
		getPaintValue(dr_44) AS 'DrTJ09_L_3MCP',
		getPaintValue(dr_45) AS 'DrTJ10_L_4MCP',
		getPaintValue(dr_46) AS 'DrTJ11_L_5MCP',
		getPaintValue(dr_47) AS 'DrTJ12_L_1IP',
		getPaintValue(dr_48) AS 'DrTJ13_L_2PIP',
		getPaintValue(dr_49) AS 'DrTJ14_L_3PIP',
		getPaintValue(dr_50) AS 'DrTJ15_L_4PIP',
		getPaintValue(dr_51) AS 'DrTJ16_L_5PIP',
		getPaintValue(dr_52) AS 'DrTJ17_L_2DIP',
		getPaintValue(dr_53) AS 'DrTJ18_L_3DIP',
		getPaintValue(dr_54) AS 'DrTJ19_L_4DIP',
		getPaintValue(dr_55) AS 'DrTJ20_L_5DIP',
		getPaintValue(dr_56) AS 'DrTJ21_L_hip',
		getPaintValue(dr_57) AS 'DrTJ22_L_knee',
		getPaintValue(dr_58) AS 'DrTJ23_L_ankle',
		getPaintValue(dr_59) AS 'DrTJ24_L_tarsus',
		getPaintValue(dr_60) AS 'DrTJ25_L_1MTP',
		getPaintValue(dr_61) AS 'DrTJ26_L_2MTP',
		getPaintValue(dr_62) AS 'DrTJ27_L_3MTP',
		getPaintValue(dr_63) AS 'DrTJ28_L_4MTP',
		getPaintValue(dr_64) AS 'DrTJ29_L_5MTP',
		getPaintValue(dr_65) AS 'DrTJ30_L_1fIP',
		getPaintValue(dr_66) AS 'DrTJ31_L_2fPIP',
		getPaintValue(dr_67) AS 'DrTJ32_L_3fPIP',
		getPaintValue(dr_68) AS 'DrTJ33_L_4fPIP',
		getPaintValue(dr_69) AS 'DrTJ34_L_5fPIP',
		getPaintValue(dr_70) AS 'DrTJ35_L_CMC'
	from full_symptoms as fs,
		patients as p
	where fs.uid = p.id
	ORDER BY email, DATE DESC 
;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `get_measurement_data` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_measurement_data`(
	IN p_uid varchar(45),
    IN p_date date,
    OUT esr int,
    OUT crp float,
    OUT mmp3 float
	)
begin
	declare done boolean default false;
	declare cur_measurement cursor for 
		select
			esr, crp, mmp3
		from measurements as m
        where date(m.date) = p_date and m.uid = p_uid;
        
	declare continue handler for not found set done = TRUE;
	select p_uid, p_date, esr, crp, mmp3; 
	open cur_measurement;
    
    read_cur: LOOP 
		FETCH cur_measurement into esr, crp, mmp3;
		if done then
			leave read_cur;
		end if;
        
    end loop;
	close cur_measurement;
    
	    
end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `insert_all_data` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `insert_all_data`(OUT date_count int(11))
BEGIN
	DECLARE done boolean default false;
    DECLARE v_date date;
    DECLARE save_date_count int(11);
	DECLARE cur_date CURSOR 
	FOR SELECT distinct date
		from barometric_pressures as bp
		order by date desc;
	DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;
    
    set date_count = 0;
    
	open cur_date;
    
    read_cur_date: LOOP 
	FETCH cur_date into v_date;
    
    if done then
		leave read_cur_date;
    end if;
    
    call insert_symptoms_data(DATE_FORMAT(v_date, '%Y-%m-%d'), save_date_count);
    
    if save_date_count > 0 then 
		set date_count = date_count + 1;
	end if;
    
    end loop;
    
    close cur_date;
    
    select date_count;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `insert_data` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `insert_data`(p_max int)
begin
declare v_counter int unsigned default 0;
  start transaction;
  while v_counter < p_max do
    INSERT INTO `arthralgia`.`full_symptoms` (`date`, `doctor_pain`, `doctor_primary_pain`, `doctor_swelling`, `doctor_primary_swelling`, `dr_g_vas`, `g_vas`, `p_vas`, `jhaq_score`, `crp`, `esr`, `mmp3`, `das28_esr`, `das28_crp`, `cdai`, `sdai`, `patient_swelling`, `patient_primary_swelling`, `patient_pain`, `patient_primary_pain`, `barometric1`, `time1`, `barometric2`, `time2`, `barometric3`, `time3`, `barometric4`, `time4`, `barometric5`, `time5`, `barometric6`, `time6`, `barometric7`, `time7`, `barometric8`, `time8`, `barometric9`, `time9`, `barometric10`, `time10`, `step`, `haq_1`, `haq_2`, `haq_3`, `haq_4`, `haq_5`, `haq_6`, `haq_7`, `haq_8`, `haq_9`, `haq_10`, `haq_11`, `haq_12`, `haq_13`, `haq_14`, `haq_15`, `haq_16`, `haq_17`, `haq_18`, `haq_19`, `haq_20`, `pt_01`, `pt_02`, `pt_03`, `pt_04`, `pt_05`, `pt_06`, `pt_07`, `pt_08`, `pt_09`, `pt_10`, `pt_11`, `pt_12`, `pt_13`, `pt_14`, `pt_15`, `pt_16`, `pt_17`, `pt_18`, `pt_19`, `pt_20`, `pt_21`, `pt_22`, `pt_23`, `pt_24`, `pt_25`, `pt_26`, `pt_27`, `pt_28`, `pt_29`, `pt_30`, `pt_31`, `pt_32`, `pt_33`, `pt_34`, `pt_35`, `pt_36`, `pt_37`, `pt_38`, `pt_39`, `pt_40`, `pt_41`, `pt_42`, `pt_43`, `pt_44`, `pt_45`, `pt_46`, `pt_47`, `pt_48`, `pt_49`, `pt_50`, `pt_51`, `pt_52`, `pt_53`, `pt_54`, `pt_55`, `pt_56`, `pt_57`, `pt_58`, `pt_59`, `pt_60`, `pt_61`, `pt_62`, `pt_63`, `pt_64`, `pt_65`, `pt_66`, `pt_67`, `pt_68`, `pt_69`, `pt_70`, `dr_01`, `dr_02`, `dr_03`, `dr_04`, `dr_05`, `dr_06`, `dr_07`, `dr_08`, `dr_09`, `dr_10`, `dr_11`, `dr_12`, `dr_13`, `dr_14`, `dr_15`, `dr_16`, `dr_17`, `dr_18`, `dr_19`, `dr_20`, `dr_21`, `dr_22`, `dr_23`, `dr_24`, `dr_25`, `dr_26`, `dr_27`, `dr_28`, `dr_29`, `dr_30`, `dr_31`, `dr_32`, `dr_33`, `dr_34`, `dr_35`, `dr_36`, `dr_37`, `dr_38`, `dr_39`, `dr_40`, `dr_41`, `dr_42`, `dr_43`, `dr_44`, `dr_45`, `dr_46`, `dr_47`, `dr_48`, `dr_49`, `dr_50`, `dr_51`, `dr_52`, `dr_53`, `dr_54`, `dr_55`, `dr_56`, `dr_57`, `dr_58`, `dr_59`, `dr_60`, `dr_61`, `dr_62`, `dr_63`, `dr_64`, `dr_65`, `dr_66`, `dr_67`, `dr_68`, `dr_69`, `dr_70`) 
VALUES ('2020-03-22 00:00:00', '100', '100', '100', '100', '100', '100', '100', '100', '100', '100', '100', '100', '100', '100', '100', '100', '100', '100', '100', '1001.86', '22:00:00', '1001.86', '22:00:00', '1001.86', '22:00:00', '1001.86', '22:00:00', '1001.86', '22:00:00', '100', '22:00:00', '100', '22:00:00', '100', '22:00:00', '100', '22:00:00', '100', '22:00:00', '100', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', 'PAIN_SWELLING3', 'PAIN_SWELLING3', 'PAIN_SWELLING3', 'PAIN_SWELLING3', 'PAIN_SWELLING3', 'PAIN_SWELLING3', 'PAIN_SWELLING3', 'PAIN_SWELLING3', 'PAIN_SWELLING3', 'PAIN_SWELLING3', 'PAIN_SWELLING3', 'PAIN_SWELLING3', 'PAIN_SWELLING3', 'PAIN_SWELLING3', 'PAIN_SWELLING3', 'PAIN_SWELLING3', 'PAIN_SWELLING3', 'PAIN_SWELLING3', 'PAIN_SWELLING3', 'PAIN_SWELLING3', 'PAIN_SWELLING3', 'PAIN_SWELLING3', 'PAIN_SWELLING3', 'PAIN_SWELLING3', 'PAIN_SWELLING3', 'PAIN_SWELLING3', 'PAIN_SWELLING3', 'PAIN_SWELLING3', 'PAIN_SWELLING3', 'PAIN_SWELLING3', 'PAIN_SWELLING3', 'PAIN_SWELLING3', 'PAIN_SWELLING3', 'PAIN_SWELLING3', 'PAIN_SWELLING3', 'PAIN_SWELLING3', 'PAIN_SWELLING3', 'PAIN_SWELLING3', 'PAIN_SWELLING3', 'PAIN_SWELLING3', 'PAIN_SWELLING3', 'PAIN_SWELLING3', 'PAIN_SWELLING3', 'PAIN_SWELLING3', 'PAIN_SWELLING3', 'PAIN_SWELLING3', 'PAIN_SWELLING3', 'PAIN_SWELLING3', 'PAIN_SWELLING3', 'PAIN_SWELLING3', 'PAIN_SWELLING3', 'PAIN_SWELLING3', 'PAIN_SWELLING3', 'PAIN_SWELLING3', 'PAIN_SWELLING3', 'PAIN_SWELLING3', 'PAIN_SWELLING3', 'PAIN_SWELLING3', 'PAIN_SWELLING3', 'PAIN_SWELLING3', 'PAIN_SWELLING3', 'PAIN_SWELLING3', 'PAIN_SWELLING3', 'PAIN_SWELLING3', 'PAIN_SWELLING3', 'PAIN_SWELLING3', 'PAIN_SWELLING3', 'PAIN_SWELLING3', 'PAIN_SWELLING3', 'PAIN_SWELLING3', 'PAIN_SWELLING3', 'PAIN_SWELLING3', 'PAIN_SWELLING3', 'PAIN_SWELLING3', 'PAIN_SWELLING3', 'PAIN_SWELLING3', 'PAIN_SWELLING3', 'PAIN_SWELLING3', 'PAIN_SWELLING3', 'PAIN_SWELLING3', 'PAIN_SWELLING3', 'PAIN_SWELLING3', 'PAIN_SWELLING3', 'PAIN_SWELLING3', 'PAIN_SWELLING3', 'PAIN_SWELLING3', 'PAIN_SWELLING3', 'PAIN_SWELLING3', 'PAIN_SWELLING3', 'PAIN_SWELLING3', 'PAIN_SWELLING3', 'PAIN_SWELLING3', 'PAIN_SWELLING3', 'PAIN_SWELLING3', 'PAIN_SWELLING3', 'PAIN_SWELLING3', 'PAIN_SWELLING3', 'PAIN_SWELLING3', 'PAIN_SWELLING3', 'PAIN_SWELLING3', 'PAIN_SWELLING3', 'PAIN_SWELLING3', 'PAIN_SWELLING3', 'PAIN_SWELLING3', 'PAIN_SWELLING3', 'PAIN_SWELLING3', 'PAIN_SWELLING3', 'PAIN_SWELLING3', 'PAIN_SWELLING3', 'PAIN_SWELLING3', 'PAIN_SWELLING3', 'PAIN_SWELLING3', 'PAIN_SWELLING3', 'PAIN_SWELLING3', 'PAIN_SWELLING3', 'PAIN_SWELLING3', 'PAIN_SWELLING3', 'PAIN_SWELLING3', 'PAIN_SWELLING3', 'PAIN_SWELLING3', 'PAIN_SWELLING3', 'PAIN_SWELLING3', 'PAIN_SWELLING3', 'PAIN_SWELLING3', 'PAIN_SWELLING3', 'PAIN_SWELLING3', 'PAIN_SWELLING3', 'PAIN_SWELLING3', 'PAIN_SWELLING3', 'PAIN_SWELLING3', 'PAIN_SWELLING3', 'PAIN_SWELLING3', 'PAIN_SWELLING3', 'PAIN_SWELLING3', 'PAIN_SWELLING3', 'PAIN_SWELLING3', 'PAIN_SWELLING3', 'PAIN_SWELLING3', 'PAIN_SWELLING3', 'PAIN_SWELLING3');
    set v_counter=v_counter+1;
  end while;
  commit;
end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `insert_symptoms_data` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `insert_symptoms_data`(
	p_date varchar(20),
    out save_count int(11))
begin
declare v_uid varchar(45);
declare v_date date default date(p_date);
declare v_count int default 0;
declare doctor_pain int;
declare doctor_primary_pain int;
declare doctor_swelling int;
declare doctor_primary_swelling int;
declare patient_pain int;
declare patient_primary_pain int;
declare patient_swelling int;
declare patient_primary_swelling int;
declare v_jhaq_score float default 0.0;
declare v_message varchar(3000) default '';
DECLARE row_not_found boolean default false;
DECLARE cur_uid CURSOR 
	FOR SELECT distinct uid
		from barometric_pressures as bp
		where date(bp.date) = v_date
		order by uid desc;
DECLARE CONTINUE HANDLER FOR NOT FOUND SET row_not_found = TRUE;
set save_count = 0;
  start transaction;
  
  OPEN cur_uid;
  
  -- Loop cursor uid
  read_cur_uid: LOOP 
	FETCH cur_uid into v_uid;
    
    -- Count uid data
SELECT 
    COUNT(*)
FROM
    full_symptoms
WHERE
    uid = v_uid AND DATE(date) = v_date INTO v_count;
    
    if row_not_found then
		leave read_cur_uid;
    end if;
    
    if (v_count > 0) then
		ITERATE read_cur_uid;
	end if;
    
    -- Count JHAQ
	set v_jhaq_score = count_JHAQ(v_uid, v_date);
    
    -- Get affected area counting data
	call count_affected_area(v_uid, v_date,
			doctor_pain, doctor_primary_pain, doctor_swelling, doctor_primary_swelling,
			patient_pain, patient_primary_pain, patient_swelling, patient_primary_swelling);
            
	insert into full_symptoms(uid, date,
		doctor_pain, doctor_primary_pain, doctor_swelling, doctor_primary_swelling,
		patient_pain, patient_primary_pain, patient_swelling, patient_primary_swelling,
		dr_g_vas, g_vas, p_vas, jhaq_score, ms_duration, 
		crp, esr, mmp3, das28_esr, das28_crp, cdai, sdai, 
		barometric1, time1, barometric2, time2, barometric3, time3, barometric4, time4,
		barometric5, time5, barometric6, time6, barometric7, time7, barometric8, time8,
		barometric9, time9, barometric10, time10,
                step,
                haq_1, haq_2, haq_3, haq_4, haq_5, haq_6, haq_7, haq_8, haq_9, haq_10,
				haq_11, haq_12, haq_13, haq_14, haq_15, haq_16, haq_17, haq_18, haq_19, haq_20,
                pt_01, pt_02, pt_03, pt_04, pt_05, pt_06, pt_07, pt_08, pt_09, pt_10, pt_11, pt_12, pt_13, pt_14, pt_15,
                pt_16, pt_17, pt_18, pt_19, pt_20, pt_21, pt_22, pt_23, pt_24, pt_25, pt_26, pt_27, pt_28, pt_29, pt_30,
                pt_31, pt_32, pt_33, pt_34, pt_35, pt_36, pt_37, pt_38, pt_39, pt_40, pt_41, pt_42, pt_43, pt_44, pt_45,
                pt_46, pt_47, pt_48, pt_49, pt_50, pt_51, pt_52, pt_53, pt_54, pt_55, pt_56, pt_57, pt_58, pt_59, pt_60,
                pt_61, pt_62, pt_63, pt_64, pt_65, pt_66, pt_67, pt_68, pt_69, pt_70,
				dr_01, dr_02, dr_03, dr_04, dr_05, dr_06, dr_07, dr_08, dr_09, dr_10, dr_11, dr_12, dr_13, dr_14, dr_15,
                dr_16, dr_17, dr_18, dr_19, dr_20, dr_21, dr_22, dr_23, dr_24, dr_25, dr_26, dr_27, dr_28, dr_29, dr_30,
                dr_31, dr_32, dr_33, dr_34, dr_35, dr_36, dr_37, dr_38, dr_39, dr_40, dr_41, dr_42, dr_43, dr_44, dr_45,
                dr_46, dr_47, dr_48, dr_49, dr_50, dr_51, dr_52, dr_53, dr_54, dr_55, dr_56, dr_57, dr_58, dr_59, dr_60,
                dr_61, dr_62, dr_63, dr_64, dr_65, dr_66, dr_67, dr_68, dr_69, dr_70
                ) 
		select ft.uid, v_date,
			doctor_pain, doctor_primary_pain, doctor_swelling, doctor_primary_swelling,
			patient_pain, patient_primary_pain, patient_swelling, patient_primary_swelling,
			di.g_vas as dr_g_vas, pi.g_vas, pi.p_vas, round(v_jhaq_score, 2),
            convert(SUBSTRING_INDEX(pi.stiffened_time_span, ':', 1), SIGNED) * 60 + convert(SUBSTRING_INDEX(pi.stiffened_time_span, ':', -1), SIGNED),
			m.crp, m.esr, m.mmp3,
			round(countDAS28ESR(doctor_primary_pain, doctor_primary_swelling, pi.p_vas, m.esr), 3) as das28_esr,
			round(countDAS28CRP(doctor_primary_pain, doctor_primary_swelling, pi.p_vas, m.crp), 3) as das28_crp,
			round(countCDAI(doctor_primary_pain, doctor_primary_swelling, pi.p_vas, di.g_vas), 2) as cdai,
			round(countSDAI(doctor_primary_pain, doctor_primary_swelling, pi.p_vas, di.g_vas, m.crp), 2) as sdai,
			(select round(bpi.barometric, 2) from barometric_pressures bpi where DATE(bpi.date) = v_date and bpi.uid = v_uid limit 0,1) as barometric1,
			(select time(bpi.date) from barometric_pressures bpi where DATE(bpi.date) = v_date and bpi.uid = v_uid limit 0,1) as time1,
			(select round(bpi.barometric, 2) from barometric_pressures bpi where DATE(bpi.date) = v_date and bpi.uid = v_uid limit 1,1) as barometric2,
			(select time(bpi.date) from barometric_pressures bpi where DATE(bpi.date) = v_date and bpi.uid = v_uid limit 1,1) as time2,
			(select round(bpi.barometric, 2) from barometric_pressures bpi where DATE(bpi.date) = v_date and bpi.uid = v_uid limit 2,1) as barometric3,
			(select time(bpi.date) from barometric_pressures bpi where DATE(bpi.date) = v_date and bpi.uid = v_uid limit 2,1) as time3,
			(select round(bpi.barometric, 2) from barometric_pressures bpi where DATE(bpi.date) = v_date and bpi.uid = v_uid limit 3,1) as barometric4,
			(select time(bpi.date) from barometric_pressures bpi where DATE(bpi.date) = v_date and bpi.uid = v_uid limit 3,1) as time4,
			(select round(bpi.barometric, 2) from barometric_pressures bpi where DATE(bpi.date) = v_date and bpi.uid = v_uid limit 4,1) as barometric5,
			(select time(bpi.date) from barometric_pressures bpi where DATE(bpi.date) = v_date and bpi.uid = v_uid limit 4,1) as time5,
			(select round(bpi.barometric, 2) from barometric_pressures bpi where DATE(bpi.date) = v_date and bpi.uid = v_uid limit 5,1) as barometric6,
			(select time(bpi.date) from barometric_pressures bpi where DATE(bpi.date) = v_date and bpi.uid = v_uid limit 5,1) as time6,
			(select round(bpi.barometric, 2) from barometric_pressures bpi where DATE(bpi.date) = v_date and bpi.uid = v_uid limit 6,1) as barometric7,
			(select time(bpi.date) from barometric_pressures bpi where DATE(bpi.date) = v_date and bpi.uid = v_uid limit 6,1) as time7,
			(select round(bpi.barometric, 2) from barometric_pressures bpi where DATE(bpi.date) = v_date and bpi.uid = v_uid limit 7,1) as barometric8,
			(select time(bpi.date) from barometric_pressures bpi where DATE(bpi.date) = v_date and bpi.uid = v_uid limit 7,1) as time8,
			(select round(bpi.barometric, 2) from barometric_pressures bpi where DATE(bpi.date) = v_date and bpi.uid = v_uid limit 8,1) as barometric9,
			(select time(bpi.date) from barometric_pressures bpi where DATE(bpi.date) = v_date and bpi.uid = v_uid limit 8,1) as time9,
			(select round(bpi.barometric, 2) from barometric_pressures bpi where DATE(bpi.date) = v_date and bpi.uid = v_uid limit 9,1) as barometric10,
			(select time(bpi.date) from barometric_pressures bpi where DATE(bpi.date) = v_date and bpi.uid = v_uid limit 9,1) as time10,
			ft.step,
			max(case question_id when 1 then answer end) as haq_1,
			max(case question_id when 2 then answer end) as haq_2,
			max(case question_id when 3 then answer end) as haq_3,
			max(case question_id when 4 then answer end) as haq_4,
			max(case question_id when 5 then answer end) as haq_5,
			max(case question_id when 6 then answer end) as haq_6,
			max(case question_id when 7 then answer end) as haq_7,
			max(case question_id when 8 then answer end) as haq_8,
			max(case question_id when 9 then answer end) as haq_9,
			max(case question_id when 10 then answer end) as haq_10,
			max(case question_id when 11 then answer end) as haq_11,
			max(case question_id when 12 then answer end) as haq_12,
			max(case question_id when 13 then answer end) as haq_13,
			max(case question_id when 14 then answer end) as haq_14,
			max(case question_id when 15 then answer end) as haq_15,
			max(case question_id when 16 then answer end) as haq_16,
			max(case question_id when 17 then answer end) as haq_17,
			max(case question_id when 18 then answer end) as haq_18,
			max(case question_id when 19 then answer end) as haq_19,
			max(case question_id when 20 then answer end) as haq_20,
			max(case when aa.recorder = 'PATIENT' and aa.area = "L1" then aa.type end) as pt_01,
			max(case when aa.recorder = 'PATIENT' and aa.area = "L2" then aa.type end) as pt_02,
			max(case when aa.recorder = 'PATIENT' and aa.area = "L3" then aa.type end) as pt_03,
			max(case when aa.recorder = 'PATIENT' and aa.area = "L4" then aa.type end) as pt_04,
			max(case when aa.recorder = 'PATIENT' and aa.area = "L5" then aa.type end) as pt_05,
			max(case when aa.recorder = 'PATIENT' and aa.area = "L6" then aa.type end) as pt_06,
			max(case when aa.recorder = 'PATIENT' and aa.area = "L7" then aa.type end) as pt_07,
			max(case when aa.recorder = 'PATIENT' and aa.area = "L8" then aa.type end) as pt_08,
			max(case when aa.recorder = 'PATIENT' and aa.area = "L9" then aa.type end) as pt_09,
			max(case when aa.recorder = 'PATIENT' and aa.area = "L10" then aa.type end) as pt_10,
			max(case when aa.recorder = 'PATIENT' and aa.area = "L11" then aa.type end) as pt_11,
			max(case when aa.recorder = 'PATIENT' and aa.area = "L12" then aa.type end) as pt_12,
			max(case when aa.recorder = 'PATIENT' and aa.area = "L13" then aa.type end) as pt_13,
			max(case when aa.recorder = 'PATIENT' and aa.area = "L14" then aa.type end) as pt_14,
			max(case when aa.recorder = 'PATIENT' and aa.area = "L15" then aa.type end) as pt_15,
			max(case when aa.recorder = 'PATIENT' and aa.area = "L16" then aa.type end) as pt_16,
			max(case when aa.recorder = 'PATIENT' and aa.area = "L17" then aa.type end) as pt_17,
			max(case when aa.recorder = 'PATIENT' and aa.area = "L18" then aa.type end) as pt_18,
			max(case when aa.recorder = 'PATIENT' and aa.area = "L19" then aa.type end) as pt_19,
			max(case when aa.recorder = 'PATIENT' and aa.area = "L20" then aa.type end) as pt_20,
			max(case when aa.recorder = 'PATIENT' and aa.area = "L21" then aa.type end) as pt_21,
			max(case when aa.recorder = 'PATIENT' and aa.area = "L22" then aa.type end) as pt_22,
			max(case when aa.recorder = 'PATIENT' and aa.area = "L23" then aa.type end) as pt_23,
			max(case when aa.recorder = 'PATIENT' and aa.area = "L24" then aa.type end) as pt_24,
			max(case when aa.recorder = 'PATIENT' and aa.area = "L25" then aa.type end) as pt_25,
			max(case when aa.recorder = 'PATIENT' and aa.area = "L26" then aa.type end) as pt_26,
			max(case when aa.recorder = 'PATIENT' and aa.area = "L27" then aa.type end) as pt_27,
			max(case when aa.recorder = 'PATIENT' and aa.area = "L28" then aa.type end) as pt_28,
			max(case when aa.recorder = 'PATIENT' and aa.area = "L29" then aa.type end) as pt_29,
			max(case when aa.recorder = 'PATIENT' and aa.area = "L30" then aa.type end) as pt_30,
			max(case when aa.recorder = 'PATIENT' and aa.area = "L31" then aa.type end) as pt_31,
			max(case when aa.recorder = 'PATIENT' and aa.area = "L32" then aa.type end) as pt_32,
			max(case when aa.recorder = 'PATIENT' and aa.area = "L33" then aa.type end) as pt_33,
			max(case when aa.recorder = 'PATIENT' and aa.area = "L34" then aa.type end) as pt_34,
			max(case when aa.recorder = 'PATIENT' and aa.area = "L35" then aa.type end) as pt_35,
			max(case when aa.recorder = 'PATIENT' and aa.area = "L1" then aa.type end) as pt_36,
			max(case when aa.recorder = 'PATIENT' and aa.area = "R2" then aa.type end) as pt_37,
			max(case when aa.recorder = 'PATIENT' and aa.area = "R3" then aa.type end) as pt_38,
			max(case when aa.recorder = 'PATIENT' and aa.area = "R4" then aa.type end) as pt_39,
			max(case when aa.recorder = 'PATIENT' and aa.area = "R5" then aa.type end) as pt_40,
			max(case when aa.recorder = 'PATIENT' and aa.area = "R6" then aa.type end) as pt_41,
			max(case when aa.recorder = 'PATIENT' and aa.area = "R7" then aa.type end) as pt_42,
			max(case when aa.recorder = 'PATIENT' and aa.area = "R8" then aa.type end) as pt_43,
			max(case when aa.recorder = 'PATIENT' and aa.area = "R9" then aa.type end) as pt_44,
			max(case when aa.recorder = 'PATIENT' and aa.area = "R10" then aa.type end) as pt_45,
			max(case when aa.recorder = 'PATIENT' and aa.area = "R11" then aa.type end) as pt_46,
			max(case when aa.recorder = 'PATIENT' and aa.area = "R12" then aa.type end) as pt_47,
			max(case when aa.recorder = 'PATIENT' and aa.area = "R13" then aa.type end) as pt_48,
			max(case when aa.recorder = 'PATIENT' and aa.area = "R14" then aa.type end) as pt_49,
			max(case when aa.recorder = 'PATIENT' and aa.area = "R15" then aa.type end) as pt_50,
			max(case when aa.recorder = 'PATIENT' and aa.area = "R16" then aa.type end) as pt_51,
			max(case when aa.recorder = 'PATIENT' and aa.area = "R17" then aa.type end) as pt_52,
			max(case when aa.recorder = 'PATIENT' and aa.area = "R18" then aa.type end) as pt_53,
			max(case when aa.recorder = 'PATIENT' and aa.area = "R19" then aa.type end) as pt_54,
			max(case when aa.recorder = 'PATIENT' and aa.area = "R20" then aa.type end) as pt_55,
			max(case when aa.recorder = 'PATIENT' and aa.area = "R21" then aa.type end) as pt_56,
			max(case when aa.recorder = 'PATIENT' and aa.area = "R22" then aa.type end) as pt_57,
			max(case when aa.recorder = 'PATIENT' and aa.area = "R23" then aa.type end) as pt_58,
			max(case when aa.recorder = 'PATIENT' and aa.area = "R24" then aa.type end) as pt_59,
			max(case when aa.recorder = 'PATIENT' and aa.area = "R25" then aa.type end) as pt_60,
			max(case when aa.recorder = 'PATIENT' and aa.area = "R26" then aa.type end) as pt_61,
			max(case when aa.recorder = 'PATIENT' and aa.area = "R27" then aa.type end) as pt_62,
			max(case when aa.recorder = 'PATIENT' and aa.area = "R28" then aa.type end) as pt_63,
			max(case when aa.recorder = 'PATIENT' and aa.area = "R29" then aa.type end) as pt_64,
			max(case when aa.recorder = 'PATIENT' and aa.area = "R30" then aa.type end) as pt_65,
			max(case when aa.recorder = 'PATIENT' and aa.area = "R31" then aa.type end) as pt_66,
			max(case when aa.recorder = 'PATIENT' and aa.area = "R32" then aa.type end) as pt_67,
			max(case when aa.recorder = 'PATIENT' and aa.area = "R33" then aa.type end) as pt_68,
			max(case when aa.recorder = 'PATIENT' and aa.area = "R34" then aa.type end) as pt_69,
			max(case when aa.recorder = 'PATIENT' and aa.area = "R35" then aa.type end) as pt_70,
			max(case when aa.recorder = 'DOCTOR' and aa.area = "L1" then aa.type end) as dr_01,
			max(case when aa.recorder = 'DOCTOR' and aa.area = "L2" then aa.type end) as dr_02,
			max(case when aa.recorder = 'DOCTOR' and aa.area = "L3" then aa.type end) as dr_03,
			max(case when aa.recorder = 'DOCTOR' and aa.area = "L4" then aa.type end) as dr_04,
			max(case when aa.recorder = 'DOCTOR' and aa.area = "L5" then aa.type end) as dr_05,
			max(case when aa.recorder = 'DOCTOR' and aa.area = "L6" then aa.type end) as dr_06,
			max(case when aa.recorder = 'DOCTOR' and aa.area = "L7" then aa.type end) as dr_07,
			max(case when aa.recorder = 'DOCTOR' and aa.area = "L8" then aa.type end) as dr_08,
			max(case when aa.recorder = 'DOCTOR' and aa.area = "L9" then aa.type end) as dr_09,
			max(case when aa.recorder = 'DOCTOR' and aa.area = "L10" then aa.type end) as dr_10,
			max(case when aa.recorder = 'DOCTOR' and aa.area = "L11" then aa.type end) as dr_11,
			max(case when aa.recorder = 'DOCTOR' and aa.area = "L12" then aa.type end) as dr_12,
			max(case when aa.recorder = 'DOCTOR' and aa.area = "L13" then aa.type end) as dr_13,
			max(case when aa.recorder = 'DOCTOR' and aa.area = "L14" then aa.type end) as dr_14,
			max(case when aa.recorder = 'DOCTOR' and aa.area = "L15" then aa.type end) as dr_15,
			max(case when aa.recorder = 'DOCTOR' and aa.area = "L16" then aa.type end) as dr_16,
			max(case when aa.recorder = 'DOCTOR' and aa.area = "L17" then aa.type end) as dr_17,
			max(case when aa.recorder = 'DOCTOR' and aa.area = "L18" then aa.type end) as dr_18,
			max(case when aa.recorder = 'DOCTOR' and aa.area = "L19" then aa.type end) as dr_19,
			max(case when aa.recorder = 'DOCTOR' and aa.area = "L20" then aa.type end) as dr_20,
			max(case when aa.recorder = 'DOCTOR' and aa.area = "L21" then aa.type end) as dr_21,
			max(case when aa.recorder = 'DOCTOR' and aa.area = "L22" then aa.type end) as dr_22,
			max(case when aa.recorder = 'DOCTOR' and aa.area = "L23" then aa.type end) as dr_23,
			max(case when aa.recorder = 'DOCTOR' and aa.area = "L24" then aa.type end) as dr_24,
			max(case when aa.recorder = 'DOCTOR' and aa.area = "L25" then aa.type end) as dr_25,
			max(case when aa.recorder = 'DOCTOR' and aa.area = "L26" then aa.type end) as dr_26,
			max(case when aa.recorder = 'DOCTOR' and aa.area = "L27" then aa.type end) as dr_27,
			max(case when aa.recorder = 'DOCTOR' and aa.area = "L28" then aa.type end) as dr_28,
			max(case when aa.recorder = 'DOCTOR' and aa.area = "L29" then aa.type end) as dr_29,
			max(case when aa.recorder = 'DOCTOR' and aa.area = "L30" then aa.type end) as dr_30,
			max(case when aa.recorder = 'DOCTOR' and aa.area = "L31" then aa.type end) as dr_31,
			max(case when aa.recorder = 'DOCTOR' and aa.area = "L32" then aa.type end) as dr_32,
			max(case when aa.recorder = 'DOCTOR' and aa.area = "L33" then aa.type end) as dr_33,
			max(case when aa.recorder = 'DOCTOR' and aa.area = "L34" then aa.type end) as dr_34,
			max(case when aa.recorder = 'DOCTOR' and aa.area = "L35" then aa.type end) as dr_35,
			max(case when aa.recorder = 'DOCTOR' and aa.area = "R1" then aa.type end) as dr_36,
			max(case when aa.recorder = 'DOCTOR' and aa.area = "R2" then aa.type end) as dr_37,
			max(case when aa.recorder = 'DOCTOR' and aa.area = "R3" then aa.type end) as dr_38,
			max(case when aa.recorder = 'DOCTOR' and aa.area = "R4" then aa.type end) as dr_39,
			max(case when aa.recorder = 'DOCTOR' and aa.area = "R5" then aa.type end) as dr_40,
			max(case when aa.recorder = 'DOCTOR' and aa.area = "R6" then aa.type end) as dr_41,
			max(case when aa.recorder = 'DOCTOR' and aa.area = "R7" then aa.type end) as dr_42,
			max(case when aa.recorder = 'DOCTOR' and aa.area = "R8" then aa.type end) as dr_43,
			max(case when aa.recorder = 'DOCTOR' and aa.area = "R9" then aa.type end) as dr_44,
			max(case when aa.recorder = 'DOCTOR' and aa.area = "R10" then aa.type end) as dr_45,
			max(case when aa.recorder = 'DOCTOR' and aa.area = "R11" then aa.type end) as dr_46,
			max(case when aa.recorder = 'DOCTOR' and aa.area = "R12" then aa.type end) as dr_47,
			max(case when aa.recorder = 'DOCTOR' and aa.area = "R13" then aa.type end) as dr_48,
			max(case when aa.recorder = 'DOCTOR' and aa.area = "R14" then aa.type end) as dr_49,
			max(case when aa.recorder = 'DOCTOR' and aa.area = "R15" then aa.type end) as dr_50,
			max(case when aa.recorder = 'DOCTOR' and aa.area = "R16" then aa.type end) as dr_51,
			max(case when aa.recorder = 'DOCTOR' and aa.area = "R17" then aa.type end) as dr_52,
			max(case when aa.recorder = 'DOCTOR' and aa.area = "R18" then aa.type end) as dr_53,
			max(case when aa.recorder = 'DOCTOR' and aa.area = "R19" then aa.type end) as dr_54,
			max(case when aa.recorder = 'DOCTOR' and aa.area = "R20" then aa.type end) as dr_55,
			max(case when aa.recorder = 'DOCTOR' and aa.area = "R21" then aa.type end) as dr_56,
			max(case when aa.recorder = 'DOCTOR' and aa.area = "R22" then aa.type end) as dr_57,
			max(case when aa.recorder = 'DOCTOR' and aa.area = "R23" then aa.type end) as dr_58,
			max(case when aa.recorder = 'DOCTOR' and aa.area = "R24" then aa.type end) as dr_59,
			max(case when aa.recorder = 'DOCTOR' and aa.area = "R25" then aa.type end) as dr_60,
			max(case when aa.recorder = 'DOCTOR' and aa.area = "R26" then aa.type end) as dr_61,
			max(case when aa.recorder = 'DOCTOR' and aa.area = "R27" then aa.type end) as dr_62,
			max(case when aa.recorder = 'DOCTOR' and aa.area = "R28" then aa.type end) as dr_63,
			max(case when aa.recorder = 'DOCTOR' and aa.area = "R29" then aa.type end) as dr_64,
			max(case when aa.recorder = 'DOCTOR' and aa.area = "R30" then aa.type end) as dr_65,
			max(case when aa.recorder = 'DOCTOR' and aa.area = "R31" then aa.type end) as dr_66,
			max(case when aa.recorder = 'DOCTOR' and aa.area = "R32" then aa.type end) as dr_67,
			max(case when aa.recorder = 'DOCTOR' and aa.area = "R33" then aa.type end) as dr_68,
			max(case when aa.recorder = 'DOCTOR' and aa.area = "R34" then aa.type end) as dr_69,
			max(case when aa.recorder = 'DOCTOR' and aa.area = "R35" then aa.type end) as dr_70
			
		from footsteps as ft
		left join patient_interviews as pi on ft.uid = pi.uid and date(ft.date) = date(pi.date)
        left join doctor_interviews as di on  ft.uid = di.uid and date(ft.date) = date(di.date)
        left join measurements as m on ft.uid = m.uid and date(ft.date) = date(m.date)
        left join haq_answers as h on ft.uid = h.uid and date(ft.date) = date(h.date)
        left join affected_areas as aa on ft.uid = aa.uid and date(ft.date) = date(aa.date)
		where ft.uid = v_uid and date(ft.date) = v_date
        group by ft.uid, v_date,
			doctor_pain, doctor_primary_pain, doctor_swelling, doctor_primary_swelling,
			patient_pain, patient_primary_pain, patient_swelling, patient_primary_swelling,
			di.g_vas, pi.g_vas, pi.p_vas, pi.stiffened_time_span,
			crp, esr, mmp3,
			barometric1, time1, barometric2, time2, barometric3, time3, barometric4, time4,
			barometric5, time5, barometric6, time6, barometric7, time7, barometric8, time8,
			barometric9, time9, barometric10, time10,
			ft.step;
		
        if row_count() > 0 then 
			set save_count = save_count + 1;
        end if;
    
	end loop;
    
    close cur_uid;
  commit;
end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-10-02 15:33:06
