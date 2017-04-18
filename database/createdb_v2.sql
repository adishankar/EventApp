-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema eventWebsiteDatabase
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema eventWebsiteDatabase
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `eventWebsiteDatabase` DEFAULT CHARACTER SET utf8 ;
USE `eventWebsiteDatabase` ;

-- -----------------------------------------------------
-- Table `eventWebsiteDatabase`.`location`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `eventWebsiteDatabase`.`location` ;

CREATE TABLE IF NOT EXISTS `eventWebsiteDatabase`.`location` (
  `locationID` INT NOT NULL AUTO_INCREMENT,
  `locationName` VARCHAR(100) NULL,
  `locationLongitude` DECIMAL(12,8) NULL,
  `locationLatitude` DECIMAL(12,8) NULL,
  PRIMARY KEY (`locationID`),
  UNIQUE INDEX `locationID_UNIQUE` (`locationID` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `eventWebsiteDatabase`.`university`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `eventWebsiteDatabase`.`university` ;

CREATE TABLE IF NOT EXISTS `eventWebsiteDatabase`.`university` (
  `universityID` INT NOT NULL AUTO_INCREMENT,
  `universityName` VARCHAR(45) NOT NULL,
  `universityDescription` VARCHAR(255) NULL,
  `universityNumStudents` INT NULL,
  `locationID` INT NULL,
  `universityPicture` VARCHAR(500) NULL,
  PRIMARY KEY (`universityID`),
  INDEX `fk_university_location_idx` (`locationID` ASC),
  CONSTRAINT `fk_university_location`
    FOREIGN KEY (`locationID`)
    REFERENCES `eventWebsiteDatabase`.`location` (`locationID`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `eventWebsiteDatabase`.`userTypes`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `eventWebsiteDatabase`.`userTypes` ;

CREATE TABLE IF NOT EXISTS `eventWebsiteDatabase`.`userTypes` (
  `typeID` INT NOT NULL AUTO_INCREMENT,
  `typeName` VARCHAR(50) NULL,
  PRIMARY KEY (`typeID`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `eventWebsiteDatabase`.`user`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `eventWebsiteDatabase`.`user` ;

CREATE TABLE IF NOT EXISTS `eventWebsiteDatabase`.`user` (
  `userID` INT NOT NULL AUTO_INCREMENT,
  `firstName` VARCHAR(50) NULL,
  `lastName` VARCHAR(50) NULL,
  `emailAddress` VARCHAR(255) NULL,
  `password` VARCHAR(255) NULL,
  `userTypeID` INT NULL,
  `universityID` INT NULL,
  PRIMARY KEY (`userID`),
  INDEX `fk_usertype_idx` (`userTypeID` ASC),
  UNIQUE INDEX `userID_UNIQUE` (`userID` ASC),
  INDEX `fk_userUniversity_idx` (`universityID` ASC),
  CONSTRAINT `fk_usertype`
    FOREIGN KEY (`userTypeID`)
    REFERENCES `eventWebsiteDatabase`.`userTypes` (`typeID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_userUniversity`
    FOREIGN KEY (`universityID`)
    REFERENCES `eventWebsiteDatabase`.`university` (`universityID`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `eventWebsiteDatabase`.`RSO`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `eventWebsiteDatabase`.`RSO` ;

CREATE TABLE IF NOT EXISTS `eventWebsiteDatabase`.`RSO` (
  `RSOid` INT NOT NULL AUTO_INCREMENT,
  `RSOname` VARCHAR(45) NULL,
  `RSOdescription` VARCHAR(255) NULL,
  `universityID` INT NULL,
  `adminID` INT NULL,
  PRIMARY KEY (`RSOid`),
  INDEX `fk_rso_university_idx` (`universityID` ASC),
  INDEX `fk_rso_admin_idx` (`adminID` ASC),
  CONSTRAINT `fk_rso_university`
    FOREIGN KEY (`universityID`)
    REFERENCES `eventWebsiteDatabase`.`university` (`universityID`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_rso_admin`
    FOREIGN KEY (`adminID`)
    REFERENCES `eventWebsiteDatabase`.`user` (`userID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `eventWebsiteDatabase`.`eventType`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `eventWebsiteDatabase`.`eventType` ;

CREATE TABLE IF NOT EXISTS `eventWebsiteDatabase`.`eventType` (
  `eventTypeID` INT NOT NULL AUTO_INCREMENT,
  `eventTypeName` VARCHAR(50) NULL,
  PRIMARY KEY (`eventTypeID`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `eventWebsiteDatabase`.`event`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `eventWebsiteDatabase`.`event` ;

CREATE TABLE IF NOT EXISTS `eventWebsiteDatabase`.`event` (
  `eventID` INT NOT NULL AUTO_INCREMENT,
  `eventName` VARCHAR(45) NULL,
  `eventStartDate` DATETIME NULL,
  `eventEndDate` DATETIME NULL,
  `eventDescription` VARCHAR(255) NULL,
  `rsoID` INT NULL,
  `adminID` INT NULL,
  `locationID` INT NULL,
  `eventTypeID` INT NULL,
  PRIMARY KEY (`eventID`),
  INDEX `fk_event_rso_idx` (`rsoID` ASC),
  INDEX `fk_event_admin_idx` (`adminID` ASC),
  INDEX `fk_event_location_idx` (`locationID` ASC),
  INDEX `fk_event_type_idx` (`eventTypeID` ASC),
  CONSTRAINT `fk_event_rso`
    FOREIGN KEY (`rsoID`)
    REFERENCES `eventWebsiteDatabase`.`RSO` (`RSOid`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_event_admin`
    FOREIGN KEY (`adminID`)
    REFERENCES `eventWebsiteDatabase`.`user` (`userID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_event_location`
    FOREIGN KEY (`locationID`)
    REFERENCES `eventWebsiteDatabase`.`location` (`locationID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_event_type`
    FOREIGN KEY (`eventTypeID`)
    REFERENCES `eventWebsiteDatabase`.`eventType` (`eventTypeID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `eventWebsiteDatabase`.`comments`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `eventWebsiteDatabase`.`comments` ;

CREATE TABLE IF NOT EXISTS `eventWebsiteDatabase`.`comments` (
  `commentID` INT NOT NULL AUTO_INCREMENT,
  `comment` VARCHAR(140) NULL,
  `datePosted` DATETIME NULL,
  `eventID` INT NULL,
  `userID` INT NULL,
  PRIMARY KEY (`commentID`),
  INDEX `fk_comment_event_idx` (`eventID` ASC),
  INDEX `fk_comment_user_idx` (`userID` ASC),
  CONSTRAINT `fk_comment_event`
    FOREIGN KEY (`eventID`)
    REFERENCES `eventWebsiteDatabase`.`event` (`eventID`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_comment_user`
    FOREIGN KEY (`userID`)
    REFERENCES `eventWebsiteDatabase`.`user` (`userID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `eventWebsiteDatabase`.`RSO_has_user`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `eventWebsiteDatabase`.`RSO_has_user` ;

CREATE TABLE IF NOT EXISTS `eventWebsiteDatabase`.`RSO_has_user` (
  `RSOid` INT NOT NULL,
  `userID` INT NOT NULL,
  PRIMARY KEY (`RSOid`, `userID`),
  INDEX `fk_RSO_has_user_user1_idx` (`userID` ASC),
  INDEX `fk_RSO_has_user_RSO1_idx` (`RSOid` ASC),
  CONSTRAINT `fk_RSO_has_user_RSO1`
    FOREIGN KEY (`RSOid`)
    REFERENCES `eventWebsiteDatabase`.`RSO` (`RSOid`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_RSO_has_user_user1`
    FOREIGN KEY (`userID`)
    REFERENCES `eventWebsiteDatabase`.`user` (`userID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;

SET SQL_MODE = '';
GRANT USAGE ON *.* TO dbuser;
 DROP USER dbuser;
SET SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';
CREATE USER 'dbuser' IDENTIFIED BY '&z47JGdzgrT*^uG';

GRANT SELECT, INSERT, TRIGGER ON TABLE `eventWebsiteDatabase`.* TO 'dbuser';
GRANT SELECT, INSERT, TRIGGER, UPDATE, DELETE ON TABLE `eventWebsiteDatabase`.* TO 'dbuser';
GRANT ALL ON `eventWebsiteDatabase`.* TO 'dbuser';
#GRANT EXECUTE ON ROUTINE `eventWebsiteDatabase`.* TO 'dbuser';

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

#Required for proper operation/permissions system;
INSERT INTO userTypes (typeName) Values ('superAdmin'),('admin'),('student');
INSERT INTO eventType (eventTypeName) Values ('public'), ('university'), ('private');