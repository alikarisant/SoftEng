-- MySQL dump 10.13  Distrib 8.0.29, for Linux (x86_64)
--
-- Host: 127.0.0.1    Database: intelliQ
-- ------------------------------------------------------
-- Server version	8.0.32-0ubuntu0.22.04.2

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
-- Table structure for table `Answer`
--

DROP TABLE IF EXISTS `Answer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Answer` (
  `answer_id` int NOT NULL AUTO_INCREMENT,
  `answer_questionnaire_id` varchar(45) DEFAULT NULL,
  `answer_question_id` varchar(45) DEFAULT NULL,
  `answer_session_id` varchar(45) DEFAULT NULL,
  `answer_option_id` varchar(45) DEFAULT NULL,
  `answer_timestamp` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`answer_id`),
  KEY `fk_answer_option_idx` (`answer_option_id`),
  KEY `fk_answer_session_idx` (`answer_session_id`),
  KEY `fk_answer_questionnaire_idx` (`answer_questionnaire_id`),
  KEY `fk_answer_question_idx` (`answer_question_id`),
  CONSTRAINT `fk_answer_question` FOREIGN KEY (`answer_question_id`) REFERENCES `Question` (`question_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_answer_questionnaire` FOREIGN KEY (`answer_questionnaire_id`) REFERENCES `Questionnaire` (`questionnaire_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=264 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Answer`
--

LOCK TABLES `Answer` WRITE;
/*!40000 ALTER TABLE `Answer` DISABLE KEYS */;
/*!40000 ALTER TABLE `Answer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Keywords`
--

DROP TABLE IF EXISTS `Keywords`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Keywords` (
  `keywords_id` int NOT NULL AUTO_INCREMENT,
  `keywords_text` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`keywords_id`)
) ENGINE=InnoDB AUTO_INCREMENT=64 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Keywords`
--

LOCK TABLES `Keywords` WRITE;
/*!40000 ALTER TABLE `Keywords` DISABLE KEYS */;
INSERT INTO `Keywords` VALUES (61,'languages'),(62,'foreign'),(63,'travel');
/*!40000 ALTER TABLE `Keywords` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Keywords_Questionnaire`
--

DROP TABLE IF EXISTS `Keywords_Questionnaire`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Keywords_Questionnaire` (
  `keywords_questionnaire_id` int NOT NULL AUTO_INCREMENT,
  `keywords_questionnaire_questionnaire_id` varchar(45) DEFAULT NULL,
  `keywords_questionnaire_keywords_id` int DEFAULT NULL,
  PRIMARY KEY (`keywords_questionnaire_id`),
  KEY `fk_keywords_questionnaire_keywords_idx` (`keywords_questionnaire_keywords_id`),
  KEY `fk_keywords_questionnaire_questionnaire_idx` (`keywords_questionnaire_questionnaire_id`),
  CONSTRAINT `fk_keywords_questionnaire_keywords` FOREIGN KEY (`keywords_questionnaire_keywords_id`) REFERENCES `Keywords` (`keywords_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_keywords_questionnaire_questionnaire` FOREIGN KEY (`keywords_questionnaire_questionnaire_id`) REFERENCES `Questionnaire` (`questionnaire_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=56 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Keywords_Questionnaire`
--

LOCK TABLES `Keywords_Questionnaire` WRITE;
/*!40000 ALTER TABLE `Keywords_Questionnaire` DISABLE KEYS */;
INSERT INTO `Keywords_Questionnaire` VALUES (53,'QQ001',61),(54,'QQ001',62),(55,'QQ001',63);
/*!40000 ALTER TABLE `Keywords_Questionnaire` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Qoption`
--

DROP TABLE IF EXISTS `Qoption`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Qoption` (
  `option_id` varchar(45) NOT NULL,
  `option_text` varchar(255) DEFAULT NULL,
  `option_next_qid` varchar(25) DEFAULT NULL,
  `option_question_id` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`option_id`),
  KEY `fk_option_question_idx` (`option_question_id`),
  CONSTRAINT `fk_option_question` FOREIGN KEY (`option_question_id`) REFERENCES `Question` (`question_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Qoption`
--

LOCK TABLES `Qoption` WRITE;
/*!40000 ALTER TABLE `Qoption` DISABLE KEYS */;
INSERT INTO `Qoption` VALUES ('P10TXT','<open string>','P11','P10'),('P11A1','<18','Q11','P11'),('P11A2','18-40','Q11','P11'),('P11A3','>40','Q11','P11'),('Q11A1','0','Q13','Q11'),('Q11A2','1','Q12','Q11'),('Q11A3','Παραπάνω','Q12','Q11'),('Q12A1','σχολείο','Q13','Q12'),('Q12A2','φίλοι','Q13','Q12'),('Q12A3','διαδίκτυο','Q13','Q12'),('Q12A4','Άλλο','Q13','Q12'),('Q13A1','Ναι','Q15','Q13'),('Q13A2','Όχι','Q14','Q13'),('Q14A1','Ναι','Q17','Q14'),('Q14A2','Οχι','Q17','Q14'),('Q15A1','Ναι','Q16','Q15'),('Q15A2','Οχι','Q16','Q15'),('Q16A1','Ναι','Q14','Q16'),('Q16A2','Οχι','Q14','Q16'),('Q17A1','Ναι','-','Q17'),('Q17A2','Οχι','-','Q17');
/*!40000 ALTER TABLE `Qoption` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Question`
--

DROP TABLE IF EXISTS `Question`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Question` (
  `question_id` varchar(45) NOT NULL,
  `question_text` varchar(255) NOT NULL,
  `required` varchar(25) NOT NULL,
  `type` varchar(25) NOT NULL,
  `question_questionnaire_id` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`question_id`),
  KEY `fk_question_questionnaire_idx` (`question_questionnaire_id`),
  CONSTRAINT `fk_question_questionnaire` FOREIGN KEY (`question_questionnaire_id`) REFERENCES `Questionnaire` (`questionnaire_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Question`
--

LOCK TABLES `Question` WRITE;
/*!40000 ALTER TABLE `Question` DISABLE KEYS */;
INSERT INTO `Question` VALUES ('P10','Ποιο είναι το mail σας;','FALSE','profile','QQ001'),('P11','Ποια είναι η ηλικία σας;','TRUE','profile','QQ001'),('Q11','Πόσες ξένες γλώσσες μιλάτε;','TRUE','question','QQ001'),('Q12','Πως μάθατε να μιλάτε αυτές τις γλώσσες;','TRUE','question','QQ001'),('Q13','Θα θέλατε να μάθετε άλλες γλώσσες;','TRUE','question','QQ001'),('Q14','Συμφωνείτε με την εκμάθηση ξένων γλωσσών από μικρή ηλικία;','TRUE','question','QQ001'),('Q15','Θα θέλατε να ταξιδέψετε στις χώρες που μιλάνε αυτές τις γλώσσες;','TRUE','question','QQ001'),('Q16','Γνωρίζετε άλλα άτομα που μιλάνε αυτές τις γλώσσες;','TRUE','question','QQ001'),('Q17','Πιστεύτε οτι η εκμάθηση ξένων γλωσσών είναι είτιο διάβρωσης της ελληνικής γλώσσας;','TRUE','question','QQ001');
/*!40000 ALTER TABLE `Question` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Questionnaire`
--

DROP TABLE IF EXISTS `Questionnaire`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Questionnaire` (
  `questionnaire_id` varchar(45) NOT NULL,
  `questionnaire_title` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`questionnaire_id`),
  UNIQUE KEY `questionnaire_id_UNIQUE` (`questionnaire_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Questionnaire`
--

LOCK TABLES `Questionnaire` WRITE;
/*!40000 ALTER TABLE `Questionnaire` DISABLE KEYS */;
INSERT INTO `Questionnaire` VALUES ('QQ001','Testing questionnaire');
/*!40000 ALTER TABLE `Questionnaire` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Session`
--

DROP TABLE IF EXISTS `Session`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Session` (
  `session_id` varchar(45) NOT NULL,
  `session_user_id` int NOT NULL,
  `session_questionnaire_id` varchar(45) NOT NULL,
  PRIMARY KEY (`session_id`),
  UNIQUE KEY `session_id_UNIQUE` (`session_id`),
  KEY `fk_session_user_idx` (`session_user_id`),
  KEY `fk_session_questionnaire_idx` (`session_questionnaire_id`),
  CONSTRAINT `fk_session_questionnaire` FOREIGN KEY (`session_questionnaire_id`) REFERENCES `Questionnaire` (`questionnaire_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_session_user` FOREIGN KEY (`session_user_id`) REFERENCES `User` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Session`
--

LOCK TABLES `Session` WRITE;
/*!40000 ALTER TABLE `Session` DISABLE KEYS */;
INSERT INTO `Session` VALUES ('abcd',1,'QQ001');
/*!40000 ALTER TABLE `Session` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `User`
--

DROP TABLE IF EXISTS `User`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `User` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `last_name` varchar(45) NOT NULL,
  `first_name` varchar(45) NOT NULL,
  `email` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `user_id_UNIQUE` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `User`
--

LOCK TABLES `User` WRITE;
/*!40000 ALTER TABLE `User` DISABLE KEYS */;
INSERT INTO `User` VALUES (1,'Alikaris','Antonis','email');
/*!40000 ALTER TABLE `User` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-02-16 14:57:54
