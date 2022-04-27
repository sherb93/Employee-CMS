const fs = require("fs");
const inquirer = require("inquirer");
const cTable = require("console.table");

const mainMenu = function() {
    inquirer
        .prompt([
            {
                type: "list",
                name: "selection",
                message: "What would you like to do?",
                choices: [
                    "View Departments",
                    "View Roles",
                    "View Employees",
                    "Add New Department",
                    "Add New Role",
                    "Add New Employee",
                    "Update An Employee's Role"
                ]
            }
        ])
        .then(choice => {
            switch (choice.selection) {
                case "View Departments":
                    viewDepartments();
                    break;
            }
        })
}

mainMenu();