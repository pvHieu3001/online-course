-- MySQL dump 10.13  Distrib 5.7.29, for Linux (x86_64)
--
-- Host: 192.168.100.104    Database: arthralgia
-- ------------------------------------------------------
-- Server version	5.7.29

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
-- Temporary table structure for view `affected_area_counts_view`
--

DROP TABLE IF EXISTS `affected_area_counts_view`;
/*!50001 DROP VIEW IF EXISTS `affected_area_counts_view`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `affected_area_counts_view` AS SELECT 
 1 AS `uid`,
 1 AS `date`,
 1 AS `patient_swelling`,
 1 AS `patient_primary_swelling`,
 1 AS `patient_pain`,
 1 AS `patient_primary_pain`,
 1 AS `doctor_swelling`,
 1 AS `doctor_primary_swelling`,
 1 AS `doctor_pain`,
 1 AS `doctor_primary_pain`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `affected_areas`
--

DROP TABLE IF EXISTS `affected_areas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `affected_areas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `date` datetime NOT NULL,
  `recorder` varchar(10) NOT NULL,
  `type` varchar(45) NOT NULL,
  `area` varchar(20) NOT NULL,
  `uid` varchar(255) NOT NULL,
  PRIMARY KEY (`id`,`date`,`recorder`,`type`,`area`),
  KEY `fk_affected_areas_patient_uid_idx` (`uid`),
  CONSTRAINT `fk_affected_areas_patient_uid` FOREIGN KEY (`uid`) REFERENCES `patients` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=2871 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `barometric_pressures`
--

DROP TABLE IF EXISTS `barometric_pressures`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `barometric_pressures` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `barometric` float NOT NULL,
  `uid` varchar(45) NOT NULL,
  `log_count` int(11) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `fk_barometric_pressures_patient_uid_idx` (`uid`),
  CONSTRAINT `fk_barometric_pressures_patient_uid` FOREIGN KEY (`uid`) REFERENCES `patients` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=1109 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Temporary table structure for view `barometrics_view`
--

DROP TABLE IF EXISTS `barometrics_view`;
/*!50001 DROP VIEW IF EXISTS `barometrics_view`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `barometrics_view` AS SELECT 
 1 AS `uid`,
 1 AS `date_only`,
 1 AS `barometrics`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `doctor_interviews`
--

DROP TABLE IF EXISTS `doctor_interviews`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `doctor_interviews` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `date` datetime NOT NULL,
  `g_vas` int(11) NOT NULL COMMENT '0-100mm',
  `uid` varchar(255) NOT NULL,
  PRIMARY KEY (`id`,`date`),
  KEY `fk_doctor_interviews_patient_uid_idx` (`uid`),
  CONSTRAINT `fk_doctor_interviews_patient_uid` FOREIGN KEY (`uid`) REFERENCES `patients` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `footsteps`
--

DROP TABLE IF EXISTS `footsteps`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `footsteps` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `date` datetime NOT NULL,
  `step` int(11) NOT NULL,
  `uid` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_footsteps_patient_uid_idx` (`uid`),
  CONSTRAINT `fk_footsteps_patient_uid` FOREIGN KEY (`uid`) REFERENCES `patients` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Temporary table structure for view `full_symptoms_view`
--

DROP TABLE IF EXISTS `full_symptoms_view`;
/*!50001 DROP VIEW IF EXISTS `full_symptoms_view`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `full_symptoms_view` AS SELECT 
 1 AS `ID`,
 1 AS `uid`,
 1 AS `date`,
 1 AS `barometric`,
 1 AS `g_vas`,
 1 AS `p_vas`,
 1 AS `stiffened_time_span`,
 1 AS `dr_g_vas`,
 1 AS `haq_q1`,
 1 AS `haq_q2`,
 1 AS `haq_q3`,
 1 AS `haq_q4`,
 1 AS `haq_q5`,
 1 AS `haq_q6`,
 1 AS `haq_q7`,
 1 AS `haq_q8`,
 1 AS `haq_q9`,
 1 AS `haq_q10`,
 1 AS `haq_q11`,
 1 AS `haq_q12`,
 1 AS `haq_q13`,
 1 AS `haq_q14`,
 1 AS `haq_q15`,
 1 AS `haq_q16`,
 1 AS `haq_q17`,
 1 AS `haq_q18`,
 1 AS `haq_q19`,
 1 AS `haq_q20`,
 1 AS `patient_swelling`,
 1 AS `patient_primary_swelling`,
 1 AS `patient_pain`,
 1 AS `patient_primary_pain`,
 1 AS `esr`,
 1 AS `crp`,
 1 AS `mmp3`,
 1 AS `doctor_swelling`,
 1 AS `doctor_primary_swelling`,
 1 AS `doctor_pain`,
 1 AS `doctor_primary_pain`,
 1 AS `pt1`,
 1 AS `pt2`,
 1 AS `pt3`,
 1 AS `pt4`,
 1 AS `pt5`,
 1 AS `pt6`,
 1 AS `pt7`,
 1 AS `pt8`,
 1 AS `pt9`,
 1 AS `pt10`,
 1 AS `pt11`,
 1 AS `pt12`,
 1 AS `pt13`,
 1 AS `pt14`,
 1 AS `pt15`,
 1 AS `pt16`,
 1 AS `pt17`,
 1 AS `pt18`,
 1 AS `pt19`,
 1 AS `pt20`,
 1 AS `pt21`,
 1 AS `pt22`,
 1 AS `pt23`,
 1 AS `pt24`,
 1 AS `pt25`,
 1 AS `pt26`,
 1 AS `pt27`,
 1 AS `pt28`,
 1 AS `pt29`,
 1 AS `pt30`,
 1 AS `pt31`,
 1 AS `pt32`,
 1 AS `pt33`,
 1 AS `pt34`,
 1 AS `pt35`,
 1 AS `pt36`,
 1 AS `pt37`,
 1 AS `pt38`,
 1 AS `pt39`,
 1 AS `pt40`,
 1 AS `pt41`,
 1 AS `pt42`,
 1 AS `pt43`,
 1 AS `pt44`,
 1 AS `pt45`,
 1 AS `pt46`,
 1 AS `pt47`,
 1 AS `pt48`,
 1 AS `pt49`,
 1 AS `pt50`,
 1 AS `pt51`,
 1 AS `pt52`,
 1 AS `pt53`,
 1 AS `pt54`,
 1 AS `pt55`,
 1 AS `pt56`,
 1 AS `pt57`,
 1 AS `pt58`,
 1 AS `pt59`,
 1 AS `pt60`,
 1 AS `pt61`,
 1 AS `pt62`,
 1 AS `pt63`,
 1 AS `pt64`,
 1 AS `pt65`,
 1 AS `pt66`,
 1 AS `pt67`,
 1 AS `pt68`,
 1 AS `pt69`,
 1 AS `pt70`,
 1 AS `dr1`,
 1 AS `dr2`,
 1 AS `dr3`,
 1 AS `dr4`,
 1 AS `dr5`,
 1 AS `dr6`,
 1 AS `dr7`,
 1 AS `dr8`,
 1 AS `dr9`,
 1 AS `dr10`,
 1 AS `dr11`,
 1 AS `dr12`,
 1 AS `dr13`,
 1 AS `dr14`,
 1 AS `dr15`,
 1 AS `dr16`,
 1 AS `dr17`,
 1 AS `dr18`,
 1 AS `dr19`,
 1 AS `dr20`,
 1 AS `dr21`,
 1 AS `dr22`,
 1 AS `dr23`,
 1 AS `dr24`,
 1 AS `dr25`,
 1 AS `dr26`,
 1 AS `dr27`,
 1 AS `dr28`,
 1 AS `dr29`,
 1 AS `dr30`,
 1 AS `dr31`,
 1 AS `dr32`,
 1 AS `dr33`,
 1 AS `dr34`,
 1 AS `dr35`,
 1 AS `dr36`,
 1 AS `dr37`,
 1 AS `dr38`,
 1 AS `dr39`,
 1 AS `dr40`,
 1 AS `dr41`,
 1 AS `dr42`,
 1 AS `dr43`,
 1 AS `dr44`,
 1 AS `dr45`,
 1 AS `dr46`,
 1 AS `dr47`,
 1 AS `dr48`,
 1 AS `dr49`,
 1 AS `dr50`,
 1 AS `dr51`,
 1 AS `dr52`,
 1 AS `dr53`,
 1 AS `dr54`,
 1 AS `dr55`,
 1 AS `dr56`,
 1 AS `dr57`,
 1 AS `dr58`,
 1 AS `dr59`,
 1 AS `dr60`,
 1 AS `dr61`,
 1 AS `dr62`,
 1 AS `dr63`,
 1 AS `dr64`,
 1 AS `dr65`,
 1 AS `dr66`,
 1 AS `dr67`,
 1 AS `dr68`,
 1 AS `dr69`,
 1 AS `dr70`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `haq_answers`
--

DROP TABLE IF EXISTS `haq_answers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `haq_answers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `date` datetime NOT NULL,
  `question_id` int(11) NOT NULL,
  `answer` int(11) NOT NULL,
  `uid` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_haq_answers_patient_uid_idx` (`uid`),
  KEY `fk_haq_answers_question_id_idx` (`question_id`),
  CONSTRAINT `fk_haq_answers_patient_uid` FOREIGN KEY (`uid`) REFERENCES `patients` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_haq_answers_question_id` FOREIGN KEY (`question_id`) REFERENCES `questions` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=487 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Temporary table structure for view `haqs_view`
--

DROP TABLE IF EXISTS `haqs_view`;
/*!50001 DROP VIEW IF EXISTS `haqs_view`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `haqs_view` AS SELECT 
 1 AS `uid`,
 1 AS `date`,
 1 AS `haq_q1`,
 1 AS `haq_q2`,
 1 AS `haq_q3`,
 1 AS `haq_q4`,
 1 AS `haq_q5`,
 1 AS `haq_q6`,
 1 AS `haq_q7`,
 1 AS `haq_q8`,
 1 AS `haq_q9`,
 1 AS `haq_q10`,
 1 AS `haq_q11`,
 1 AS `haq_q12`,
 1 AS `haq_q13`,
 1 AS `haq_q14`,
 1 AS `haq_q15`,
 1 AS `haq_q16`,
 1 AS `haq_q17`,
 1 AS `haq_q18`,
 1 AS `haq_q19`,
 1 AS `haq_q20`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `measurements`
--

DROP TABLE IF EXISTS `measurements`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `measurements` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `date` datetime NOT NULL,
  `esr` int(11) NOT NULL COMMENT 'mm/h',
  `crp` float NOT NULL,
  `mmp3` float NOT NULL,
  `uid` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_measurements_patient_uid_idx` (`uid`),
  CONSTRAINT `fk_measurements_patient_uid` FOREIGN KEY (`uid`) REFERENCES `patients` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `patient_images`
--

DROP TABLE IF EXISTS `patient_images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `patient_images` (
  `id` varchar(45) NOT NULL,
  `uid` varchar(45) NOT NULL,
  `data` mediumblob NOT NULL,
  `date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `file_type` varchar(45) NOT NULL,
  `file_name` varchar(255) NOT NULL,
  `area_type` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_patient_images_patient_uid_idx` (`uid`),
  CONSTRAINT `fk_patient_images_patient_uid` FOREIGN KEY (`uid`) REFERENCES `patients` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `patient_interviews`
--

DROP TABLE IF EXISTS `patient_interviews`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `patient_interviews` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `date` datetime NOT NULL,
  `g_vas` int(11) NOT NULL DEFAULT '0' COMMENT '0-100mm',
  `p_vas` int(11) NOT NULL DEFAULT '0' COMMENT '0-100mm',
  `stiffened_time_span` varchar(20) NOT NULL,
  `uid` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_patient_interviews_parient_uid_idx` (`uid`),
  CONSTRAINT `fk_patient_interviews_parient_uid` FOREIGN KEY (`uid`) REFERENCES `patients` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=53 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `patients`
--

DROP TABLE IF EXISTS `patients`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `patients` (
  `id` varchar(45) NOT NULL,
  `email` varchar(45) DEFAULT NULL,
  `password` varchar(60) DEFAULT NULL,
  `temporary_password` varchar(60) DEFAULT NULL,
  `create_at` datetime DEFAULT NULL,
  `creator` int(11) DEFAULT NULL,
  `enabled` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `questions`
--

DROP TABLE IF EXISTS `questions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `questions` (
  `id` int(11) NOT NULL,
  `title` varchar(45) NOT NULL,
  `detail` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `verification_tokens`
--

DROP TABLE IF EXISTS `verification_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `verification_tokens` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `token` varchar(45) NOT NULL,
  `expired_date` datetime NOT NULL,
  `uid` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_verification_tokens_1_idx` (`uid`),
  CONSTRAINT `fk_verification_tokens_1` FOREIGN KEY (`uid`) REFERENCES `patients` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping events for database 'arthralgia'
--

--
-- Dumping routines for database 'arthralgia'
--
/*!50003 DROP FUNCTION IF EXISTS `primary_area` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
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

--
-- Final view structure for view `affected_area_counts_view`
--

/*!50001 DROP VIEW IF EXISTS `affected_area_counts_view`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`skip-grants user`@`skip-grants host` SQL SECURITY DEFINER */
/*!50001 VIEW `affected_area_counts_view` AS select `affected_areas`.`uid` AS `uid`,`affected_areas`.`date` AS `date`,count((case when ((`affected_areas`.`recorder` = 'PATIENT') and (`affected_areas`.`type` like '%SWELLING%')) then 1 end)) AS `patient_swelling`,count((case when ((`affected_areas`.`recorder` = 'PATIENT') and (`affected_areas`.`type` like '%SWELLING%') and (find_in_set(`affected_areas`.`area`,`primary_area`()) = 1)) then 1 end)) AS `patient_primary_swelling`,count((case when ((`affected_areas`.`recorder` = 'PATIENT') and (`affected_areas`.`type` like '%PAIN%')) then 1 end)) AS `patient_pain`,count((case when ((`affected_areas`.`recorder` = 'PATIENT') and (`affected_areas`.`type` like '%PAIN%') and (find_in_set(`affected_areas`.`area`,`primary_area`()) = 1)) then 1 end)) AS `patient_primary_pain`,count((case when ((`affected_areas`.`recorder` = 'DOCTOR') and (`affected_areas`.`type` like '%SWELLING%')) then 1 end)) AS `doctor_swelling`,count((case when ((`affected_areas`.`recorder` = 'DOCTOR') and (`affected_areas`.`type` like '%SWELLING%') and (find_in_set(`affected_areas`.`area`,`primary_area`()) = 1)) then 1 end)) AS `doctor_primary_swelling`,count((case when ((`affected_areas`.`recorder` = 'DOCTOR') and (`affected_areas`.`type` like '%PAIN%')) then 1 end)) AS `doctor_pain`,count((case when ((`affected_areas`.`recorder` = 'DOCTOR') and (`affected_areas`.`type` like '%PAIN%') and (find_in_set(`affected_areas`.`area`,`primary_area`()) = 1)) then 1 end)) AS `doctor_primary_pain` from `affected_areas` group by `affected_areas`.`uid`,`affected_areas`.`date` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `barometrics_view`
--

/*!50001 DROP VIEW IF EXISTS `barometrics_view`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `barometrics_view` AS select `bp`.`uid` AS `uid`,cast(`bp`.`date` as date) AS `date_only`,group_concat(`bp`.`barometric` separator ',') AS `barometrics` from `barometric_pressures` `bp` group by `bp`.`uid`,cast(`bp`.`date` as date) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `full_symptoms_view`
--

/*!50001 DROP VIEW IF EXISTS `full_symptoms_view`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`skip-grants user`@`skip-grants host` SQL SECURITY DEFINER */
/*!50001 VIEW `full_symptoms_view` AS select row_count() AS `ID`,`bp`.`uid` AS `uid`,convert_tz(`bp`.`date`,'+00:00','+09:00') AS `date`,`bp`.`barometric` AS `barometric`,`pi`.`g_vas` AS `g_vas`,`pi`.`p_vas` AS `p_vas`,`pi`.`stiffened_time_span` AS `stiffened_time_span`,`di`.`g_vas` AS `dr_g_vas`,`hv`.`haq_q1` AS `haq_q1`,`hv`.`haq_q2` AS `haq_q2`,`hv`.`haq_q3` AS `haq_q3`,`hv`.`haq_q4` AS `haq_q4`,`hv`.`haq_q5` AS `haq_q5`,`hv`.`haq_q6` AS `haq_q6`,`hv`.`haq_q7` AS `haq_q7`,`hv`.`haq_q8` AS `haq_q8`,`hv`.`haq_q9` AS `haq_q9`,`hv`.`haq_q10` AS `haq_q10`,`hv`.`haq_q11` AS `haq_q11`,`hv`.`haq_q12` AS `haq_q12`,`hv`.`haq_q13` AS `haq_q13`,`hv`.`haq_q14` AS `haq_q14`,`hv`.`haq_q15` AS `haq_q15`,`hv`.`haq_q16` AS `haq_q16`,`hv`.`haq_q17` AS `haq_q17`,`hv`.`haq_q18` AS `haq_q18`,`hv`.`haq_q19` AS `haq_q19`,`hv`.`haq_q20` AS `haq_q20`,`av`.`patient_swelling` AS `patient_swelling`,`av`.`patient_primary_swelling` AS `patient_primary_swelling`,`av`.`patient_pain` AS `patient_pain`,`av`.`patient_primary_pain` AS `patient_primary_pain`,`m`.`esr` AS `esr`,`m`.`crp` AS `crp`,`m`.`mmp3` AS `mmp3`,`av`.`doctor_swelling` AS `doctor_swelling`,`av`.`doctor_primary_swelling` AS `doctor_primary_swelling`,`av`.`doctor_pain` AS `doctor_pain`,`av`.`doctor_primary_pain` AS `doctor_primary_pain`,max((case when ((`aa`.`recorder` = 'PATIENT') and (`aa`.`area` = 'L1')) then `aa`.`type` end)) AS `pt1`,max((case when ((`aa`.`recorder` = 'PATIENT') and (`aa`.`area` = 'L2')) then `aa`.`type` end)) AS `pt2`,max((case when ((`aa`.`recorder` = 'PATIENT') and (`aa`.`area` = 'L3')) then `aa`.`type` end)) AS `pt3`,max((case when ((`aa`.`recorder` = 'PATIENT') and (`aa`.`area` = 'L4')) then `aa`.`type` end)) AS `pt4`,max((case when ((`aa`.`recorder` = 'PATIENT') and (`aa`.`area` = 'L5')) then `aa`.`type` end)) AS `pt5`,max((case when ((`aa`.`recorder` = 'PATIENT') and (`aa`.`area` = 'L6')) then `aa`.`type` end)) AS `pt6`,max((case when ((`aa`.`recorder` = 'PATIENT') and (`aa`.`area` = 'L7')) then `aa`.`type` end)) AS `pt7`,max((case when ((`aa`.`recorder` = 'PATIENT') and (`aa`.`area` = 'L8')) then `aa`.`type` end)) AS `pt8`,max((case when ((`aa`.`recorder` = 'PATIENT') and (`aa`.`area` = 'L9')) then `aa`.`type` end)) AS `pt9`,max((case when ((`aa`.`recorder` = 'PATIENT') and (`aa`.`area` = 'L10')) then `aa`.`type` end)) AS `pt10`,max((case when ((`aa`.`recorder` = 'PATIENT') and (`aa`.`area` = 'L11')) then `aa`.`type` end)) AS `pt11`,max((case when ((`aa`.`recorder` = 'PATIENT') and (`aa`.`area` = 'L12')) then `aa`.`type` end)) AS `pt12`,max((case when ((`aa`.`recorder` = 'PATIENT') and (`aa`.`area` = 'L13')) then `aa`.`type` end)) AS `pt13`,max((case when ((`aa`.`recorder` = 'PATIENT') and (`aa`.`area` = 'L14')) then `aa`.`type` end)) AS `pt14`,max((case when ((`aa`.`recorder` = 'PATIENT') and (`aa`.`area` = 'L15')) then `aa`.`type` end)) AS `pt15`,max((case when ((`aa`.`recorder` = 'PATIENT') and (`aa`.`area` = 'L16')) then `aa`.`type` end)) AS `pt16`,max((case when ((`aa`.`recorder` = 'PATIENT') and (`aa`.`area` = 'L17')) then `aa`.`type` end)) AS `pt17`,max((case when ((`aa`.`recorder` = 'PATIENT') and (`aa`.`area` = 'L18')) then `aa`.`type` end)) AS `pt18`,max((case when ((`aa`.`recorder` = 'PATIENT') and (`aa`.`area` = 'L19')) then `aa`.`type` end)) AS `pt19`,max((case when ((`aa`.`recorder` = 'PATIENT') and (`aa`.`area` = 'L20')) then `aa`.`type` end)) AS `pt20`,max((case when ((`aa`.`recorder` = 'PATIENT') and (`aa`.`area` = 'L21')) then `aa`.`type` end)) AS `pt21`,max((case when ((`aa`.`recorder` = 'PATIENT') and (`aa`.`area` = 'L22')) then `aa`.`type` end)) AS `pt22`,max((case when ((`aa`.`recorder` = 'PATIENT') and (`aa`.`area` = 'L23')) then `aa`.`type` end)) AS `pt23`,max((case when ((`aa`.`recorder` = 'PATIENT') and (`aa`.`area` = 'L24')) then `aa`.`type` end)) AS `pt24`,max((case when ((`aa`.`recorder` = 'PATIENT') and (`aa`.`area` = 'L25')) then `aa`.`type` end)) AS `pt25`,max((case when ((`aa`.`recorder` = 'PATIENT') and (`aa`.`area` = 'L26')) then `aa`.`type` end)) AS `pt26`,max((case when ((`aa`.`recorder` = 'PATIENT') and (`aa`.`area` = 'L27')) then `aa`.`type` end)) AS `pt27`,max((case when ((`aa`.`recorder` = 'PATIENT') and (`aa`.`area` = 'L28')) then `aa`.`type` end)) AS `pt28`,max((case when ((`aa`.`recorder` = 'PATIENT') and (`aa`.`area` = 'L29')) then `aa`.`type` end)) AS `pt29`,max((case when ((`aa`.`recorder` = 'PATIENT') and (`aa`.`area` = 'L30')) then `aa`.`type` end)) AS `pt30`,max((case when ((`aa`.`recorder` = 'PATIENT') and (`aa`.`area` = 'L31')) then `aa`.`type` end)) AS `pt31`,max((case when ((`aa`.`recorder` = 'PATIENT') and (`aa`.`area` = 'L32')) then `aa`.`type` end)) AS `pt32`,max((case when ((`aa`.`recorder` = 'PATIENT') and (`aa`.`area` = 'L33')) then `aa`.`type` end)) AS `pt33`,max((case when ((`aa`.`recorder` = 'PATIENT') and (`aa`.`area` = 'L34')) then `aa`.`type` end)) AS `pt34`,max((case when ((`aa`.`recorder` = 'PATIENT') and (`aa`.`area` = 'L35')) then `aa`.`type` end)) AS `pt35`,max((case when ((`aa`.`recorder` = 'PATIENT') and (`aa`.`area` = 'L1')) then `aa`.`type` end)) AS `pt36`,max((case when ((`aa`.`recorder` = 'PATIENT') and (`aa`.`area` = 'R2')) then `aa`.`type` end)) AS `pt37`,max((case when ((`aa`.`recorder` = 'PATIENT') and (`aa`.`area` = 'R3')) then `aa`.`type` end)) AS `pt38`,max((case when ((`aa`.`recorder` = 'PATIENT') and (`aa`.`area` = 'R4')) then `aa`.`type` end)) AS `pt39`,max((case when ((`aa`.`recorder` = 'PATIENT') and (`aa`.`area` = 'R5')) then `aa`.`type` end)) AS `pt40`,max((case when ((`aa`.`recorder` = 'PATIENT') and (`aa`.`area` = 'R6')) then `aa`.`type` end)) AS `pt41`,max((case when ((`aa`.`recorder` = 'PATIENT') and (`aa`.`area` = 'R7')) then `aa`.`type` end)) AS `pt42`,max((case when ((`aa`.`recorder` = 'PATIENT') and (`aa`.`area` = 'R8')) then `aa`.`type` end)) AS `pt43`,max((case when ((`aa`.`recorder` = 'PATIENT') and (`aa`.`area` = 'R9')) then `aa`.`type` end)) AS `pt44`,max((case when ((`aa`.`recorder` = 'PATIENT') and (`aa`.`area` = 'R10')) then `aa`.`type` end)) AS `pt45`,max((case when ((`aa`.`recorder` = 'PATIENT') and (`aa`.`area` = 'R11')) then `aa`.`type` end)) AS `pt46`,max((case when ((`aa`.`recorder` = 'PATIENT') and (`aa`.`area` = 'R12')) then `aa`.`type` end)) AS `pt47`,max((case when ((`aa`.`recorder` = 'PATIENT') and (`aa`.`area` = 'R13')) then `aa`.`type` end)) AS `pt48`,max((case when ((`aa`.`recorder` = 'PATIENT') and (`aa`.`area` = 'R14')) then `aa`.`type` end)) AS `pt49`,max((case when ((`aa`.`recorder` = 'PATIENT') and (`aa`.`area` = 'R15')) then `aa`.`type` end)) AS `pt50`,max((case when ((`aa`.`recorder` = 'PATIENT') and (`aa`.`area` = 'R16')) then `aa`.`type` end)) AS `pt51`,max((case when ((`aa`.`recorder` = 'PATIENT') and (`aa`.`area` = 'R17')) then `aa`.`type` end)) AS `pt52`,max((case when ((`aa`.`recorder` = 'PATIENT') and (`aa`.`area` = 'R18')) then `aa`.`type` end)) AS `pt53`,max((case when ((`aa`.`recorder` = 'PATIENT') and (`aa`.`area` = 'R19')) then `aa`.`type` end)) AS `pt54`,max((case when ((`aa`.`recorder` = 'PATIENT') and (`aa`.`area` = 'R20')) then `aa`.`type` end)) AS `pt55`,max((case when ((`aa`.`recorder` = 'PATIENT') and (`aa`.`area` = 'R21')) then `aa`.`type` end)) AS `pt56`,max((case when ((`aa`.`recorder` = 'PATIENT') and (`aa`.`area` = 'R22')) then `aa`.`type` end)) AS `pt57`,max((case when ((`aa`.`recorder` = 'PATIENT') and (`aa`.`area` = 'R23')) then `aa`.`type` end)) AS `pt58`,max((case when ((`aa`.`recorder` = 'PATIENT') and (`aa`.`area` = 'R24')) then `aa`.`type` end)) AS `pt59`,max((case when ((`aa`.`recorder` = 'PATIENT') and (`aa`.`area` = 'R25')) then `aa`.`type` end)) AS `pt60`,max((case when ((`aa`.`recorder` = 'PATIENT') and (`aa`.`area` = 'R26')) then `aa`.`type` end)) AS `pt61`,max((case when ((`aa`.`recorder` = 'PATIENT') and (`aa`.`area` = 'R27')) then `aa`.`type` end)) AS `pt62`,max((case when ((`aa`.`recorder` = 'PATIENT') and (`aa`.`area` = 'R28')) then `aa`.`type` end)) AS `pt63`,max((case when ((`aa`.`recorder` = 'PATIENT') and (`aa`.`area` = 'R29')) then `aa`.`type` end)) AS `pt64`,max((case when ((`aa`.`recorder` = 'PATIENT') and (`aa`.`area` = 'R30')) then `aa`.`type` end)) AS `pt65`,max((case when ((`aa`.`recorder` = 'PATIENT') and (`aa`.`area` = 'R31')) then `aa`.`type` end)) AS `pt66`,max((case when ((`aa`.`recorder` = 'PATIENT') and (`aa`.`area` = 'R32')) then `aa`.`type` end)) AS `pt67`,max((case when ((`aa`.`recorder` = 'PATIENT') and (`aa`.`area` = 'R33')) then `aa`.`type` end)) AS `pt68`,max((case when ((`aa`.`recorder` = 'PATIENT') and (`aa`.`area` = 'R34')) then `aa`.`type` end)) AS `pt69`,max((case when ((`aa`.`recorder` = 'PATIENT') and (`aa`.`area` = 'R35')) then `aa`.`type` end)) AS `pt70`,max((case when ((`aa`.`recorder` = 'DOCTOR') and (`aa`.`area` = 'L1')) then `aa`.`type` end)) AS `dr1`,max((case when ((`aa`.`recorder` = 'DOCTOR') and (`aa`.`area` = 'L2')) then `aa`.`type` end)) AS `dr2`,max((case when ((`aa`.`recorder` = 'DOCTOR') and (`aa`.`area` = 'L3')) then `aa`.`type` end)) AS `dr3`,max((case when ((`aa`.`recorder` = 'DOCTOR') and (`aa`.`area` = 'L4')) then `aa`.`type` end)) AS `dr4`,max((case when ((`aa`.`recorder` = 'DOCTOR') and (`aa`.`area` = 'L5')) then `aa`.`type` end)) AS `dr5`,max((case when ((`aa`.`recorder` = 'DOCTOR') and (`aa`.`area` = 'L6')) then `aa`.`type` end)) AS `dr6`,max((case when ((`aa`.`recorder` = 'DOCTOR') and (`aa`.`area` = 'L7')) then `aa`.`type` end)) AS `dr7`,max((case when ((`aa`.`recorder` = 'DOCTOR') and (`aa`.`area` = 'L8')) then `aa`.`type` end)) AS `dr8`,max((case when ((`aa`.`recorder` = 'DOCTOR') and (`aa`.`area` = 'L9')) then `aa`.`type` end)) AS `dr9`,max((case when ((`aa`.`recorder` = 'DOCTOR') and (`aa`.`area` = 'L10')) then `aa`.`type` end)) AS `dr10`,max((case when ((`aa`.`recorder` = 'DOCTOR') and (`aa`.`area` = 'L11')) then `aa`.`type` end)) AS `dr11`,max((case when ((`aa`.`recorder` = 'DOCTOR') and (`aa`.`area` = 'L12')) then `aa`.`type` end)) AS `dr12`,max((case when ((`aa`.`recorder` = 'DOCTOR') and (`aa`.`area` = 'L13')) then `aa`.`type` end)) AS `dr13`,max((case when ((`aa`.`recorder` = 'DOCTOR') and (`aa`.`area` = 'L14')) then `aa`.`type` end)) AS `dr14`,max((case when ((`aa`.`recorder` = 'DOCTOR') and (`aa`.`area` = 'L15')) then `aa`.`type` end)) AS `dr15`,max((case when ((`aa`.`recorder` = 'DOCTOR') and (`aa`.`area` = 'L16')) then `aa`.`type` end)) AS `dr16`,max((case when ((`aa`.`recorder` = 'DOCTOR') and (`aa`.`area` = 'L17')) then `aa`.`type` end)) AS `dr17`,max((case when ((`aa`.`recorder` = 'DOCTOR') and (`aa`.`area` = 'L18')) then `aa`.`type` end)) AS `dr18`,max((case when ((`aa`.`recorder` = 'DOCTOR') and (`aa`.`area` = 'L19')) then `aa`.`type` end)) AS `dr19`,max((case when ((`aa`.`recorder` = 'DOCTOR') and (`aa`.`area` = 'L20')) then `aa`.`type` end)) AS `dr20`,max((case when ((`aa`.`recorder` = 'DOCTOR') and (`aa`.`area` = 'L21')) then `aa`.`type` end)) AS `dr21`,max((case when ((`aa`.`recorder` = 'DOCTOR') and (`aa`.`area` = 'L22')) then `aa`.`type` end)) AS `dr22`,max((case when ((`aa`.`recorder` = 'DOCTOR') and (`aa`.`area` = 'L23')) then `aa`.`type` end)) AS `dr23`,max((case when ((`aa`.`recorder` = 'DOCTOR') and (`aa`.`area` = 'L24')) then `aa`.`type` end)) AS `dr24`,max((case when ((`aa`.`recorder` = 'DOCTOR') and (`aa`.`area` = 'L25')) then `aa`.`type` end)) AS `dr25`,max((case when ((`aa`.`recorder` = 'DOCTOR') and (`aa`.`area` = 'L26')) then `aa`.`type` end)) AS `dr26`,max((case when ((`aa`.`recorder` = 'DOCTOR') and (`aa`.`area` = 'L27')) then `aa`.`type` end)) AS `dr27`,max((case when ((`aa`.`recorder` = 'DOCTOR') and (`aa`.`area` = 'L28')) then `aa`.`type` end)) AS `dr28`,max((case when ((`aa`.`recorder` = 'DOCTOR') and (`aa`.`area` = 'L29')) then `aa`.`type` end)) AS `dr29`,max((case when ((`aa`.`recorder` = 'DOCTOR') and (`aa`.`area` = 'L30')) then `aa`.`type` end)) AS `dr30`,max((case when ((`aa`.`recorder` = 'DOCTOR') and (`aa`.`area` = 'L31')) then `aa`.`type` end)) AS `dr31`,max((case when ((`aa`.`recorder` = 'DOCTOR') and (`aa`.`area` = 'L32')) then `aa`.`type` end)) AS `dr32`,max((case when ((`aa`.`recorder` = 'DOCTOR') and (`aa`.`area` = 'L33')) then `aa`.`type` end)) AS `dr33`,max((case when ((`aa`.`recorder` = 'DOCTOR') and (`aa`.`area` = 'L34')) then `aa`.`type` end)) AS `dr34`,max((case when ((`aa`.`recorder` = 'DOCTOR') and (`aa`.`area` = 'L35')) then `aa`.`type` end)) AS `dr35`,max((case when ((`aa`.`recorder` = 'DOCTOR') and (`aa`.`area` = 'R1')) then `aa`.`type` end)) AS `dr36`,max((case when ((`aa`.`recorder` = 'DOCTOR') and (`aa`.`area` = 'R2')) then `aa`.`type` end)) AS `dr37`,max((case when ((`aa`.`recorder` = 'DOCTOR') and (`aa`.`area` = 'R3')) then `aa`.`type` end)) AS `dr38`,max((case when ((`aa`.`recorder` = 'DOCTOR') and (`aa`.`area` = 'R4')) then `aa`.`type` end)) AS `dr39`,max((case when ((`aa`.`recorder` = 'DOCTOR') and (`aa`.`area` = 'R5')) then `aa`.`type` end)) AS `dr40`,max((case when ((`aa`.`recorder` = 'DOCTOR') and (`aa`.`area` = 'R6')) then `aa`.`type` end)) AS `dr41`,max((case when ((`aa`.`recorder` = 'DOCTOR') and (`aa`.`area` = 'R7')) then `aa`.`type` end)) AS `dr42`,max((case when ((`aa`.`recorder` = 'DOCTOR') and (`aa`.`area` = 'R8')) then `aa`.`type` end)) AS `dr43`,max((case when ((`aa`.`recorder` = 'DOCTOR') and (`aa`.`area` = 'R9')) then `aa`.`type` end)) AS `dr44`,max((case when ((`aa`.`recorder` = 'DOCTOR') and (`aa`.`area` = 'R10')) then `aa`.`type` end)) AS `dr45`,max((case when ((`aa`.`recorder` = 'DOCTOR') and (`aa`.`area` = 'R11')) then `aa`.`type` end)) AS `dr46`,max((case when ((`aa`.`recorder` = 'DOCTOR') and (`aa`.`area` = 'R12')) then `aa`.`type` end)) AS `dr47`,max((case when ((`aa`.`recorder` = 'DOCTOR') and (`aa`.`area` = 'R13')) then `aa`.`type` end)) AS `dr48`,max((case when ((`aa`.`recorder` = 'DOCTOR') and (`aa`.`area` = 'R14')) then `aa`.`type` end)) AS `dr49`,max((case when ((`aa`.`recorder` = 'DOCTOR') and (`aa`.`area` = 'R15')) then `aa`.`type` end)) AS `dr50`,max((case when ((`aa`.`recorder` = 'DOCTOR') and (`aa`.`area` = 'R16')) then `aa`.`type` end)) AS `dr51`,max((case when ((`aa`.`recorder` = 'DOCTOR') and (`aa`.`area` = 'R17')) then `aa`.`type` end)) AS `dr52`,max((case when ((`aa`.`recorder` = 'DOCTOR') and (`aa`.`area` = 'R18')) then `aa`.`type` end)) AS `dr53`,max((case when ((`aa`.`recorder` = 'DOCTOR') and (`aa`.`area` = 'R19')) then `aa`.`type` end)) AS `dr54`,max((case when ((`aa`.`recorder` = 'DOCTOR') and (`aa`.`area` = 'R20')) then `aa`.`type` end)) AS `dr55`,max((case when ((`aa`.`recorder` = 'DOCTOR') and (`aa`.`area` = 'R21')) then `aa`.`type` end)) AS `dr56`,max((case when ((`aa`.`recorder` = 'DOCTOR') and (`aa`.`area` = 'R22')) then `aa`.`type` end)) AS `dr57`,max((case when ((`aa`.`recorder` = 'DOCTOR') and (`aa`.`area` = 'R23')) then `aa`.`type` end)) AS `dr58`,max((case when ((`aa`.`recorder` = 'DOCTOR') and (`aa`.`area` = 'R24')) then `aa`.`type` end)) AS `dr59`,max((case when ((`aa`.`recorder` = 'DOCTOR') and (`aa`.`area` = 'R25')) then `aa`.`type` end)) AS `dr60`,max((case when ((`aa`.`recorder` = 'DOCTOR') and (`aa`.`area` = 'R26')) then `aa`.`type` end)) AS `dr61`,max((case when ((`aa`.`recorder` = 'DOCTOR') and (`aa`.`area` = 'R27')) then `aa`.`type` end)) AS `dr62`,max((case when ((`aa`.`recorder` = 'DOCTOR') and (`aa`.`area` = 'R28')) then `aa`.`type` end)) AS `dr63`,max((case when ((`aa`.`recorder` = 'DOCTOR') and (`aa`.`area` = 'R29')) then `aa`.`type` end)) AS `dr64`,max((case when ((`aa`.`recorder` = 'DOCTOR') and (`aa`.`area` = 'R30')) then `aa`.`type` end)) AS `dr65`,max((case when ((`aa`.`recorder` = 'DOCTOR') and (`aa`.`area` = 'R31')) then `aa`.`type` end)) AS `dr66`,max((case when ((`aa`.`recorder` = 'DOCTOR') and (`aa`.`area` = 'R32')) then `aa`.`type` end)) AS `dr67`,max((case when ((`aa`.`recorder` = 'DOCTOR') and (`aa`.`area` = 'R33')) then `aa`.`type` end)) AS `dr68`,max((case when ((`aa`.`recorder` = 'DOCTOR') and (`aa`.`area` = 'R34')) then `aa`.`type` end)) AS `dr69`,max((case when ((`aa`.`recorder` = 'DOCTOR') and (`aa`.`area` = 'R35')) then `aa`.`type` end)) AS `dr70` from ((((((`barometric_pressures` `bp` left join `patient_interviews` `pi` on((cast(convert_tz(`bp`.`date`,'+00:00','+09:00') as date) = cast(convert_tz(`pi`.`date`,'+00:00','+09:00') as date)))) left join `doctor_interviews` `di` on((cast(convert_tz(`bp`.`date`,'+00:00','+09:00') as date) = cast(convert_tz(`di`.`date`,'+00:00','+09:00') as date)))) left join `measurements` `m` on((cast(convert_tz(`bp`.`date`,'+00:00','+09:00') as date) = cast(convert_tz(`m`.`date`,'+00:00','+09:00') as date)))) left join `haqs_view` `hv` on((cast(convert_tz(`bp`.`date`,'+00:00','+09:00') as date) = cast(convert_tz(`hv`.`date`,'+00:00','+09:00') as date)))) left join `affected_area_counts_view` `av` on((cast(convert_tz(`bp`.`date`,'+00:00','+09:00') as date) = cast(convert_tz(`av`.`date`,'+00:00','+09:00') as date)))) left join `affected_areas` `aa` on((cast(convert_tz(`bp`.`date`,'+00:00','+09:00') as date) = cast(convert_tz(`aa`.`date`,'+00:00','+09:00') as date)))) group by `bp`.`uid`,`date`,`bp`.`barometric`,`pi`.`g_vas`,`pi`.`p_vas`,`pi`.`stiffened_time_span`,`dr_g_vas`,`hv`.`haq_q1`,`hv`.`haq_q2`,`hv`.`haq_q3`,`hv`.`haq_q4`,`hv`.`haq_q5`,`hv`.`haq_q6`,`hv`.`haq_q7`,`hv`.`haq_q8`,`hv`.`haq_q9`,`hv`.`haq_q10`,`hv`.`haq_q11`,`hv`.`haq_q12`,`hv`.`haq_q13`,`hv`.`haq_q14`,`hv`.`haq_q15`,`hv`.`haq_q16`,`hv`.`haq_q17`,`hv`.`haq_q18`,`hv`.`haq_q19`,`hv`.`haq_q20`,`av`.`patient_swelling`,`av`.`patient_primary_swelling`,`av`.`patient_pain`,`av`.`patient_primary_pain`,`m`.`esr`,`m`.`crp`,`m`.`mmp3`,`av`.`doctor_swelling`,`av`.`doctor_primary_swelling`,`av`.`doctor_pain`,`av`.`doctor_primary_pain` order by `date` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `haqs_view`
--

/*!50001 DROP VIEW IF EXISTS `haqs_view`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `haqs_view` AS select `haq_answers`.`uid` AS `uid`,`haq_answers`.`date` AS `date`,max((case `haq_answers`.`question_id` when 1 then `haq_answers`.`answer` end)) AS `haq_q1`,max((case `haq_answers`.`question_id` when 2 then `haq_answers`.`answer` end)) AS `haq_q2`,max((case `haq_answers`.`question_id` when 3 then `haq_answers`.`answer` end)) AS `haq_q3`,max((case `haq_answers`.`question_id` when 4 then `haq_answers`.`answer` end)) AS `haq_q4`,max((case `haq_answers`.`question_id` when 5 then `haq_answers`.`answer` end)) AS `haq_q5`,max((case `haq_answers`.`question_id` when 6 then `haq_answers`.`answer` end)) AS `haq_q6`,max((case `haq_answers`.`question_id` when 7 then `haq_answers`.`answer` end)) AS `haq_q7`,max((case `haq_answers`.`question_id` when 8 then `haq_answers`.`answer` end)) AS `haq_q8`,max((case `haq_answers`.`question_id` when 9 then `haq_answers`.`answer` end)) AS `haq_q9`,max((case `haq_answers`.`question_id` when 10 then `haq_answers`.`answer` end)) AS `haq_q10`,max((case `haq_answers`.`question_id` when 11 then `haq_answers`.`answer` end)) AS `haq_q11`,max((case `haq_answers`.`question_id` when 12 then `haq_answers`.`answer` end)) AS `haq_q12`,max((case `haq_answers`.`question_id` when 13 then `haq_answers`.`answer` end)) AS `haq_q13`,max((case `haq_answers`.`question_id` when 14 then `haq_answers`.`answer` end)) AS `haq_q14`,max((case `haq_answers`.`question_id` when 15 then `haq_answers`.`answer` end)) AS `haq_q15`,max((case `haq_answers`.`question_id` when 16 then `haq_answers`.`answer` end)) AS `haq_q16`,max((case `haq_answers`.`question_id` when 17 then `haq_answers`.`answer` end)) AS `haq_q17`,max((case `haq_answers`.`question_id` when 18 then `haq_answers`.`answer` end)) AS `haq_q18`,max((case `haq_answers`.`question_id` when 19 then `haq_answers`.`answer` end)) AS `haq_q19`,max((case `haq_answers`.`question_id` when 20 then `haq_answers`.`answer` end)) AS `haq_q20` from `haq_answers` group by `haq_answers`.`uid`,`haq_answers`.`date` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-03-13 10:20:10
