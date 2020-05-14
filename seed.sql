USE employee_db;

INSERT INTO departments (name) 
VALUES ("Sales"), ("Engineering"),("HR"), ("Finance"),("Marketing");

INSERT INTO roles (title, salary, department_id)
VALUES ("Sales Lead", 60000 ,1),  
("Software Engineer", 100000,2),
("Recruiter", 120000, 3),
("Accountant",75000,4),
("Salesperson", 40000 ,1),
("Lead Engineer", 150000,2),
("HR Team Lead", 90000, 3),
("Market Analyst", 70000, 5);


INSERT INTO employees (first_name, last_name, role_id)
VALUES ("John", "Doe", 1),
("Jane", "Doe", 2),
("Jim", "Bob", 3),
("Jake","Smith", 4);