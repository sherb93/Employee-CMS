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
};

const viewDepartments = () => {
    db.findDepartments().then(([departments]) => {
        console.table(departments);
    })
    .then(() => mainMenu());
};

const viewRoles = () => {
    db.findRoles().then(([roles]) => {
        console.table(roles);
    })
    .then(() => mainMenu());
};

const viewEmployees = () => {
    db.findEmployees().then(([employees]) => {
        console.table(employees);
    })
    .then(() => mainMenu());
};

const addDepartment = () => {
    inquirer
        .prompt([
            {
                name: "name",
                message: "What is the name of the new department?"
            }
        ])
        .then(data => {
            db.createDepartment(data)
            .then(() => console.log(`\n ${data.name} department successfully created!\n`))
            .then(() => mainMenu());
        });
};

const addRole = () => {
    db.findDepartments()
        // Insert the data as an array so we only get the data we need
        .then(([departments]) => {
            const departmentList = departments.map(({ ID, Department }) => (
                // Reassign key names to fit inquirer's "choices" formatting
                {
                    name: Department,
                    value: ID
                }
            ));

            inquirer.prompt([
                {
                    name: "title",
                    message: "What is the name of the new role?"
                },
                {
                    name: "salary",
                    message: "What is the salary of the new role?"
                },
                {
                    type: "list",
                    name: "department_id",
                    message: "Which department will this role belong to?",
                    choices: departmentList
                }
            ])
            .then(data => {
                db.createRole(data)
                .then(() => console.log(`\n ${data.title} role successfully created!\n`))
                .then(() => mainMenu());
            });
        })
};

const addEmployee = () => {
    inquirer.prompt([
        {
            name: "name",
            message: "What is the first and last name of the new employee?"
        }
    ])
    .then(data => {
        const firstName = data.name.split(' ')[0];
        const lastName = data.name.split(' ')[1];

        // Copy format to find roles and managers
        db.findRoles()
            .then(([roles]) => {
                const roleList = roles.map(({ ID, Job_Title }) => (
                    // Reassign key names to fit inquirer's "choices" formatting
                    {
                        name: Job_Title,
                        value: ID
                    }
                ));
    
                inquirer.prompt([
                    {
                        type: "list",
                        name: "role_id",
                        message: "What is the new employee's role?",
                        choices: roleList
                    }
                ])
                .then(data => {
                    const roleId = data.role_id;

                    db.findEmployees()
                        .then(([employees]) => {
                            // Only use managers by filtering thought employees array
                            const managers = employees.filter(employee => employee.Manager === null);

                            const managerList = managers.map(({ ID, First_Name, Last_Name }) => (
                                {
                                    name: `${First_Name} ${Last_Name}`,
                                    value: ID
                                }
                            ));

                            inquirer.prompt([
                                {
                                    type: "list",
                                    name: "manager_id",
                                    message: "Who is the new employee's manager?",
                                    choices: managerList
                                }
                            ])
                            .then(data => {
                                const newEmployee = {
                                    first_name: firstName,
                                    last_name: lastName,
                                    role_id: roleId,
                                    manager_id: data.manager_id,
                                }

                                db.createEmployee(newEmployee)
                                    .then(() => console.log(`\n${firstName} ${lastName} has been added to the roster!\n`))
                                    .then(() => mainMenu());
                            })
                        })
                })



            })
    })
};



mainMenu();