#fuck mysql
#sohard
#thisshitisretardedasfuck
#INSERT INTO userTypes (typeName) Values ('superAdmin'),('admin'),('student');
#DELETE FROM userTypes WHERE typeID in (4,5,6);

SELECT * FROM userTypes;

#INSERT INTO user (firstName, lastName, emailAddress, password, userTypeID) Values
#('Joseph','Landry','joelandry@knights.ucf.edu','password',2),
#('super','admin','sa','roottoor',1),
#('student1','tester','student1','password',3);

SELECT * FROM user;

#INSERT INTO superAdmin (superAdminID) Values (2);

SELECT * FROM superAdmin;

INSERT INTO university (universityName, universityLocation, 
	universityDescription, universityNumStudents,superAdmin_superAdminID)
Values
('University of Central Florida', 'Orlando,FL','UCF',60000,2);

SELECT * FROM university