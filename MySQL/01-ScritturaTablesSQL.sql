DROP DATABASE IF EXISTS `finanze`;
CREATE DATABASE  IF NOT EXISTS `finanze`;
USE `finanze`;

--
-- Table structure for table `categorie_movimenti`
--

DROP TABLE IF EXISTS `categorie_movimenti`;

CREATE TABLE `categorie_movimenti` (
  `categoria_movimento` varchar(255) NOT NULL,
  `icona` TINYBLOB NOT NULL,
  PRIMARY KEY (`categoria_movimento`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;

--
-- Table structure for table `conti`
--

DROP TABLE IF EXISTS `conti`;

CREATE TABLE `conti` (
    `nome_conto`varchar(255) NOT NULL,
    `saldo`decimal(10,2) NOT NULL,
    PRIMARY KEY (`nome_conto`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;
    
--
-- Table structure for table `categorie_movimenti`
--

DROP TABLE IF EXISTS `movimenti`;

CREATE TABLE `movimenti` (
	`id` int NOT NULL AUTO_INCREMENT,
	`data` date NOT NULL,
    `movimento` decimal(10,2) NOT NULL,
	`categoria_movimento` varchar(255) NOT NULL,
	`nome_conto`varchar(255) NOT NULL,
	PRIMARY KEY (`id`),
	FOREIGN KEY (`categoria_movimento`) REFERENCES `categorie_movimenti` (`categoria_movimento`),
	FOREIGN KEY (`nome_conto`) REFERENCES `conti`(`nome_conto`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;




