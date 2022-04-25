INSERT INTO department (id, name)
VALUES  (001, "Sales"),
        (002, "Engineering"),
        (003, "Finance"),
        (004, "Legal");

INSERT INTO roles (id, title, salary, department_id)
VALUES  (001, "Sales Lead", 100000, 001),
        (002, "Salesperson", 80000, 001),
        (003, "Lead Engineer", 150000, 002),
        (004, "Software Engineer", 120000, 002),
        (005, "Account Manager", 160000, 003),
        (006, "Accountant", 125000, 003),
        (007, "Legal Team Lead", 250000, 004),
        (008, "Lawyer", 190000, 004);

INSERT INTO employees (id, first_name, last_name, role_id, manager_id)
VALUES  (001, "Shane", "Patel", 001, NULL),
        (002, "Beth", "Streible", 002, 001),
        (003, "Robert", "Slocumbe", 003, NULL),
        (004, "Natalie", "Ray", 004, 003),
        (005, "Christopher", "Marbut", 005, NULL),
        (006, "Lotta", "Milde", 006, 005),
        (007, "Jason", "Bennett", 007, NULL),
        (008, "Courtney", "Watts", 008, 007);