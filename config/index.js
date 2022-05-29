const connection = require("./connection");

class DB {
    constructor (connection) {
        this.connection = connection;
    }

    findDepartments() {
        return this.connection.promise().query("SELECT id AS ID, name AS Department FROM department");
    }

    findRoles() {
        // Select all from role
        // Left Join department so that department name populates
        return this.connection.promise().query("SELECT role.id AS ID, role.title AS Job_Title, department.name AS Department, role.salary AS Salary FROM role LEFT JOIN department on role.department_id = department.id");
    }

    findEmployees() {
        // Select everything from employees
        // Make left joins for role and department so queries can be properly referenced
        // Left Join employees for manager reference
        return this.connection.promise().query("SELECT employee.id AS ID, employee.first_name AS First_Name, employee.last_name AS Last_Name, role.title AS Job_Title, department.name AS Department, role.salary AS Salary, CONCAT(manager.first_name, ' ', manager.last_name) AS Manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;");
    }

    createDepartment(name) {
        return this.connection.promise().query("INSERT INTO department SET ?", name)
    }
}

module.exports = new DB(connection);