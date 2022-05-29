const inquirer = require("inquirer");
const db = require("./config/index");
const cTable = require("console.table");

const mainMenu = function() {
    inquirer
        .prompt([
            {
                type: "list",
                name: "selection",
                message: "What would you like to do?",
                choices: [
                    "View All Departments",
                    "View All Roles",
                    "View All Employees",
                    "Add New Department",
                    "Add New Role",
                    "Add New Employee",
                    "Update An Employee's Role"
                ]
            }
        ])
        .then(choice => {
            switch (choice.selection) {
                case "View All Departments":
                    viewDepartments();
                    break;
                case "View All Roles":
                    viewRoles();
                    break;
                case "View All Employees":
                    viewEmployees();
                    break;
                case "Add New Department":
                    addDepartment();
                    break;
                case "Add New Role":
                    addRole();
                    break;
                case "Add New Employee":
                    addEmployee();
                    break;
                case "Update An Employee's Role":
                    updateEmployeeRole();
                    break;
            }
        })
}

const viewDepartments = () => {
    db.findDepartments().then(([departments]) => {
        console.table(departments);
    })
    .then(() => mainMenu());
}

const viewRoles = () => {
    db.findRoles().then(([roles]) => {
        console.table(roles);
    })
    .then(() => mainMenu());
}

const viewEmployees = () => {
    db.findEmployees().then(([employees]) => {
        console.table(employees);
    })
    .then(() => mainMenu());
}



mainMenu();