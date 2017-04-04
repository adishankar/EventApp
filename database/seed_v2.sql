INSERT INTO userTypes (typeName) Values ('superAdmin'),('admin'),('student');
#DELETE FROM userTypes WHERE typeID in (4,5,6);

SELECT * FROM userTypes;

INSERT INTO location (locationName, locationLongitude, locationLatitude)
Values 
('Orlando, FL', 28.6024, 81.2001),
('CENATOWN, USA',0.00000,0.00000);

SELECT * FROM location;

INSERT INTO university (universityName, 
	universityDescription, universityNumStudents, location_locationID)
Values
('University of Central Florida','Home of the UCF Knights!',64000,1),
('Cena U','Should i say more',1000,2);

SELECT * FROM university;

INSERT INTO user (firstName, lastName, emailAddress, password, userTypeID, universityID) Values
('Joseph','Landry','joelandry@knights.ucf.edu','password',2,1),#admin
('super','admin','sa','roottoor',1,1),#Superadmin
('student1','tester','student1','password',3,1),#student
('Adi','Shankar','adi.shankar@knights.ucf.edu','password',2,1),#admin
('Danny','Ultra','dannyultra@knights.ucf.edu','password',3,2),#student
('Nick', 'Ho Lung', 'nholung@knights.ucf.edu','password',3,1),#student
('Testy', 'McTesterson','testy@knights.ucf.edu','password',3,1),#student
('Boaty','McBoatface','iloveboats@knights.ucf.edu','password',3,2),#student
('Parsy','McParseface','parsegoogle@knights.ucf.edu','password',3,2),#student
('Fox','McCloud','foxclouds@knights.ucf.edu','password',3,1),#student
('Ronald','McDonald','heykids@knights.ucf.edu','password',3,2),#student
('Ham','Burglar','burgalthosehams@knights.ucf.edu','password',3,2),#student
('John','Cena','itsJOHNCENA@cena.cenau.edu','johncenamofos',1,2);#superadmin

SELECT * FROM user;

#INSERT INTO superAdmin (superAdminID) Values (2),(13);
#SELECT * FROM superAdmin;

#Admin is 3, university 1 (UCF), ucf sa is 2
#INSERT INTO admin (adminID,university_universityID, university_superAdmin_superAdminID)
#Values (3, 1, 2),(4,2,13);

#SELECT * FROM admin;

INSERT INTO RSO (RSOname, universityID)
Values 
('Habitat for Humanity', 1),
('HackUCF', 1),
('Tech Knights', 1),
('Student Government Association', 2),
('How to be Cena',2),
('Men\'s Football',1),
('Women\'s Volleyball',2);

SELECT * FROM RSO;

#INSERT INTO university_has_RSO (university_universityID,university_superAdmin_superAdminID,RSO_RSOid,RSO_admin_adminID,RSO_admin_university_universityID)
#Values 
#(1,2,1,1,1),(1,2,2,1,1),(1,2,3,1,1),(2,13,4,4,2),(2,13,5,4,2),(1,2,6,1,1),(2,13,7,4,2);

#SELECT * FROM university_has_RSO;

#INSERT INTO student (studentID, university_universityID,university_superAdmin_superAdminID)
#Values
#(3,1,2),(5,1,2),(6,2,13),(7,1,2),(8,2,13),(9,2,13),(10,1,2),(11,1,2),(12,2,13);

#SELECT * FROM student;