USE employee_db

INSERT INTO departments(id, department)
VALUES("1","Sales"),
    ("2","Engineering"),
    ("3","Finance"),
    ("4","Legal"),
    ("5","Service");

INSERT INTO roles(id, title, salary, department_id)
VALUES("1", "Sales Lead", "95000", "1"),
    ("2", "Salesperson", "80000", "1"),
    ("3", "Lead Engineer", "120000", "2"),
    ("4", "Software Engineer", "100000", "2"),
    ("5", "Account Manager", "125000", "3"),
    ("6", "Accountant", "132000", "3"),
    ("7", "Legal Team Lead", "285000", "4"),
    ("8", "Lawyer", "190000", "4");
    

INSERT INTO employee(id, first_name, last_name, role_id, manager_id)
VALUES("1", "John", "Thomas", "1", NULL),
    ("2", "Mike", "Brown", "2", "1"),
    ("3", "Jonathan", "Zagal", "3", NULL),
    ("4", "Joseph", "Cosner", "4", "3"),
    ("5", "Bradley", "Iverson", "5", NULL),
    ("6", "Nicholas", "Lopez", "6", "5"),
    ("7", "Grayson", "Leder", "7", NULL),
    ("8", "Alexander", "Joseph", "8", "7"),
    ("9", "Damian", "Rocha", "8", "7"),
    ("10", "Amanda", "Plecas", "6", "5"),
    ("11", "Kait", "Barajas", "6", "5");