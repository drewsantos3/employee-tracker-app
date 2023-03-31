// GIVEN a command-line application that accepts user input
// WHEN I start the application
// THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
// WHEN I choose to view all departments
// THEN I am presented with a formatted table showing department names and department ids
// WHEN I choose to view all roles
// THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
// WHEN I choose to view all employees
// THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
// WHEN I choose to add a department
// THEN I am prompted to enter the name of the department and that department is added to the database
// WHEN I choose to add a role
// THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
// WHEN I choose to add an employee
// THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
// WHEN I choose to update an employee role
// THEN I am prompted to select an employee to update and their new role and this information is updated in the database

const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');
const dotenv = require('dotenv').config();

// Create connection to database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: process.env.DB_PASS,
    database: 'employee_tracker_db'
});

// Connect to database
connection.connect((err) => {
    if (err) throw err;
    console.log(`Connected as id ${connection.threadId}`);
    start();
});

// Start function
function start() {
    inquirer.prompt({
        name: 'action',
        type: 'list',
        message: 'What would you like to do?',
        choices: [
            'View all employees',
            'Add employee',
            'Update employee role',
            'View all roles',
            'Add role',
            'View all departments',
            'Add department',
        ]
    }).then((answer) => {
        switch (answer.action) {
            case 'View all employees':
                viewAllEmployees();
                break;
            case 'Add employee':
                addEmployee();
                break;
            case 'Update employee role':
                updateEmployeeRole();
                break;
            case 'View all roles':
                viewAllRoles();
                break;
            case 'Add role':
                addRole();
                break;
            case 'View all departments':
                viewAllDepartments();
                break;
            case 'Add department':
                addDepartment();
                break;
            default:
                connection.end();
                break;
        }
    });
}

// View all employees
function viewAllEmployees() {
    connection.query('SELECT * FROM employee', (err, res) => {
        if (err) throw err;
        console.table(res);
        start();
    });
}

// Add employee
function addEmployee() {
    inquirer.prompt([
        {
            name: 'first_name',
            type: 'input',
            message: 'Enter employee first name:'
        },
        {
            name: 'last_name',
            type: 'input',
            message: 'Enter employee last name:'
        },
        {
            name: 'role_id',
            type: 'input',
            message: 'Enter employee role'
        },
        {
            name: 'manager_id',
            type: 'input',
            message: 'Enter employee manager'
        }
    ]).then((answer) => {
        connection.query('INSERT INTO employee SET ?', {
            first_name: answer.first_name,
            last_name: answer.last_name,
            role_id: answer.role_id,
            manager_id: answer.manager_id
        }, (err) => {
            if (err) throw err;
            console.log('Employee added.');
            start();
        });
    });
}

// Update employee role
function updateEmployeeRole() {
    inquirer.prompt([
        {
            name: 'id',
            type: 'input',
            message: 'Enter employee id:'
        },
        {
            name: 'role_id',
            type: 'input',
            message: 'Enter employee new role:'
        }
    ]).then((answer) => {
        connection.query('UPDATE employee SET ? WHERE ?', [
            {
                role_id: answer.role_id
            },
            {
                id: answer.id
            }
        ], (err) => {
            if (err) throw err;
            console.log('Employee role updated.');
            start();
        });
    });
}

// View all roles
function viewAllRoles() {
    connection.query('SELECT * FROM role', (err, res) => {
        if (err) throw err;
        console.table(res);
        start();
    });
}

// Add role
function addRole() {
    inquirer.prompt([
        {
            name: 'title',
            type: 'input',
            message: 'Enter role title:'
        },
        {
            name: 'salary',
            type: 'input',
            message: 'Enter role salary:'
        },
        {
            name: 'department_id',
            type: 'input',
            message: 'Enter role department:'
        }
    ]).then((answer) => {
        connection.query('INSERT INTO role SET ?', {
            title: answer.title,
            salary: answer.salary,
            department_id: answer.department_id
        }, (err) => {
            if (err) throw err;
            console.log('Role added.');
            start();
        });
    });
}

// View all departments
function viewAllDepartments() {
    connection.query('SELECT * FROM department', (err, res) => {
        if (err) throw err;
        console.table(res);
        start();
    });
}

// Add department
function addDepartment() {
    inquirer.prompt([
        {
            name: 'name',
            type: 'input',
            message: 'Enter department name:'
        }
    ]).then((answer) => {
        connection.query('INSERT INTO department SET ?', {
            name: answer.name
        }, (err) => {
            if (err) throw err;
            console.log('Department added.');
            start();
        });
    });
}

// End connection
function end() {
    connection.end();
}

// Export connection
module.exports = connection;

// Export start function
module.exports = start;

// Export view all employees function
module.exports = viewAllEmployees;

// Export add employee function
module.exports = addEmployee;

// Export update employee role function
module.exports = updateEmployeeRole;

// Export view all roles function
module.exports = viewAllRoles;

// Export add role function
module.exports = addRole;

// Export view all departments function
module.exports = viewAllDepartments;

// Export add department function
module.exports = addDepartment;

// Export end function
module.exports = end;









