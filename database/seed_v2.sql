#INSERT INTO userTypes (typeName) Values ('superAdmin'),('admin'),('student');
#DELETE FROM userTypes WHERE typeID in (4,5,6);

SELECT * FROM userTypes;
 
INSERT INTO location (locationName, locationLongitude, locationLatitude)
Values 
('Orlando, FL', -81.2001, 28.6024),
('CENATOWN, USA',0.00000,0.00000);

SELECT * FROM location;

INSERT INTO university (universityName, 
	universityDescription, universityNumStudents, locationID)
Values
('University of Central Florida','Home of the UCF Knights!',64000,1),
('Cena U','Should i say more',1000,2);

SELECT * FROM university;

INSERT INTO user (firstName, lastName, emailAddress, password, userTypeID, universityID) Values
('Joseph','Landry','joelandry@knights.ucf.edu','password',2,1),#admin
('super','admin','sa','roottoor',1,1),#Superadmin
('student1','tester','student1','password',3,1),#student
('Adi','Shankar','adi.shankar@knights.ucf.edu','password',2,1),#admin
('Danny','Ultra','dannyultra@knights.ucf.edu','password',2,2),#admin
('Nick', 'Ho Lung', 'nholung@knights.ucf.edu','password',2,1),#student
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

INSERT INTO RSO (RSOname, RSOdescription, universityID, adminID)
Values 
('Habitat for Humanity', 'Habitat for Humanity', 1, 1),
('HackUCF', 'Hack@UCF', 1,4),
('Tech Knights', 'Tech Knights', 1, 1),
('Student Government Association', 'SGA', 2, 5),
('How to be Cena', 'How to become John Cena Fan Club',2, 5),
('Men\'s Football', 'Men\'s Football Intramural',1,6),
('Women\'s Volleyball', 'Women\'s Volleyball Intramural',2,5);

SELECT * FROM RSO;

#anyone can view public events. logged in users can view public uni events (for there uni)
#anyone that is a part of the hosting RSO can view private
#INSERT INTO eventType (eventTypeName)
#Values
#('public'),
#('university'),
#('private');

SELECT * FROM eventType;