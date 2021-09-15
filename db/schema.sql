DROP DATABASE IF EXISTS  employee_db;
CREATE DATABASE employee_db;

USE employee_db

CREATE TABLE departments (
    id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    department VARCHAR(30)
);

CREATE TABLE roles (
    id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    title VARCHAR(30),
    salary DECIMAL,
    department_id INT
);

CREATE TABLE employee( 
    id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT
);