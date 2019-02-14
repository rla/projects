CREATE DATABASE `projects`;

CREATE USER 'projects'@'localhost' IDENTIFIED BY 'changeme';
CREATE USER 'projects'@'%' IDENTIFIED BY 'changeme';

GRANT SELECT, INSERT, UPDATE, DELETE ON projects.* TO 'projects'@'localhost';
GRANT SELECT, INSERT, UPDATE, DELETE ON projects.* TO 'projects'@'%';
