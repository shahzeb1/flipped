DROP DATABASE flipped
CREATE DATABASE flipped

CREATE TABLE appUser
(
id UUID PRIMARY KEY,
username varchar(20) NOT NULL UNIQUE,
password varchar(30) NOT NULL,
email varchar(40) UNIQUE,
teacher BOOLEAN NOT NULL
);

CREATE TABLE class
(
id UUID PRIMARY KEY,
name varchar(20),
code varchar(7),
teacherId UUID,
FOREIGN KEY (teacherId) REFERENCES appUser(id)
);

CREATE TABLE appUserClass
(
classId UUID NOT NULL,
appUserId UUID NOT NULL,
PRIMARY KEY (classId, appUserId),
FOREIGN KEY (appUserId) REFERENCES appUser(id),
FOREIGN KEY (classId) REFERENCES class(id)
);

CREATE TABLE lecture
(
id UUID NOT NULL PRIMARY KEY,
name varchar(20),
classId UUID NOT NULL,
videoUrl varchar(100) NOT NULL,
FOREIGN KEY (classId) REFERENCES class(id)
);

CREATE TABLE appUserLecture
(
id SERIAL PRIMARY KEY,
lectureId UUID NOT NULL,
appUserId UUID NOT NULL,
grade int,
dateGraded date NOT NULL,
FOREIGN KEY (appUserId) REFERENCES appUser(id),
FOREIGN KEY (lectureId) REFERENCES lecture(id)
);

CREATE TYPE problemTypes AS ENUM ('mc','fib');
CREATE TABLE problem
(
id int NOT NULL,
lectureId UUID NOT NULL,
problemType problemTypes,
question varchar(128),
PRIMARY KEY(lectureId, id),
FOREIGN KEY (lectureId) REFERENCES lecture(id)
);

CREATE TABLE problemAnswer
(
id int NOT NULL PRIMARY KEY,
problemid int NOT NULL,
lectureid UUID NOT NULL,
possibleAnswer varchar(20),
correctAnswer BOOLEAN,
FOREIGN KEY (lectureId, problemId) REFERENCES problem(lectureId,id)
);

CREATE TABLE forum
(
id UUID NOT NULL PRIMARY KEY,
lectureId UUID NOT NULL,
problemId int NOT NULL,
appUserId UUID NOT NULL,
title varchar(50) NOT NULL,
post varchar(500) NOT NULL,
dateCreated date NOT NULL,
answered boolean NOT NULL,
answerTime int,
FOREIGN KEY (lectureId, problemId) REFERENCES problem(lectureId, id)
);

CREATE TABLE comment
(
id int NOT NULL PRIMARY KEY,
forumId int NOT NULL,
comment varchar(500) NOT NULL,
dateCreated date NOT NULL,
answer boolean NOT NULL,
appUserId UUID NOT NULL,
FOREIGN KEY (appUserId) REFERENCES appUser(id)
);
