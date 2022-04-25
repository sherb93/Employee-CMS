DROP DATABASE IF EXISTS company_db;
CREATE DATABASE company_db;

USE company_db;

CREATE TABLE department (
    id: INT NOT NULL,
    name: VARCHAR(30),
    PRIMARY KEY (id)
);

CREATE TABLE role (
    id: INT NOT NULL,
    title: VARCHAR(30),
    salary: DECIMAL,
    department_id: INT, --References TABLE:department KEY:id id--
    PRIMARY KEY (id)
    FOREIGN KEY (department_id)
    REFERENCES department(id)
);

CREATE TABLE employee (
    id: INT NOT NULL,
    first_name: VARCHAR(30),
    last_name: VARCHAR(30),
    role_id: INT, --References TABLE:role KEY:id--
    manager_id: INT, --TO HOLD REFERENCE TO ANOTHER EMPLOYEE THAT IS THE MANAGER OF THE CURRENT EMPLOYEE (NULL IF THE EMPLOYEE HAS NO MANAGER)
    PRIMARY KEY (id)
    FOREIGN KEY (role_id)
    REFERENCES role(id)
);