DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;
USE employee_db;

-- table for all employees:

CREATE TABLE employees (
  id INTEGER NOT NULL,
  first_name VARCHAR(30),
  last_name VARCHAR (30),
  role_id INTEGER (10),
  manager_id INTEGER (10) NULL,
  PRIMARY KEY (id)
);

-- table for roles
CREATE TABLE roles (
  id INTEGER NOT NULL,
  title VARCHAR(30),
  salary DECIMAL(30,2),
  department_id INTEGER (10),
  PRIMARY KEY (id)
);

-- table for departments
CREATE TABLE departments (
  id INTEGER NOT NULL,
  name VARCHAR(30),
  PRIMARY KEY (id)
);

SELECT * FROM employees;
SELECT * FROM roles;
SELECT * FROM departments;