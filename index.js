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
    port: 3306,
    user: 'root',
    password: process.env.DB_PASSWORD,
    database: 'employee_tracker_db'
});

function start() {
    inquirer
    .prompt([
      {
        type: "list",
        message: "What would you like to do?",
        name: "choice",
        choices: [
          { name: "View all departments", value: "VIEW DEPARTMENTS" },
          { name: "View all roles", value: "VIEW ROLES" },
          { name: "View all employees", value: "VIEW EMPLOYEES" },
          { name: "Add a department", value: "ADD DEPARTMENT" },
          { name: "Add a role", value: "ADD ROLE" },
          { name: "Add an employee", value: "ADD EMPLOYEE" },
          { name: "Update an employee role", value: "UPDATE ROLE" },
          { name: "Exit?", value: "EXIT" },
        ],
      },
    ])
    .then((response) => {
      if (response.choice === "VIEW DEPARTMENTS") {
        viewDepartments();
      }
      if (response.choice === "VIEW ROLES") {
        viewRoles();
      }
      if (response.choice === "VIEW EMPLOYEES") {
        viewEmployees();
      }
      if (response.choice === "ADD DEPARTMENT") {
        addDepartment();
      }
      if (response.choice === "ADD ROLE") {
        addRole();
      }
      if (response.choice === "ADD EMPLOYEE") {
        addEmployee();
      }
      if (response.choice === "UPDATE ROLE") {
        updateRole();
      }
      if (response.choice === "EXIT") {
        process.exit();
      }
    });
}

function anyThingElse() {
  inquirer
    .prompt([
      {
        type: "confirm",
        message: "Would you like to do anything else?",
        name: "choice",
      },
    ])
    .then((response) => {
      if (response.choice === true) {
        start();
      } else {
        process.exit();
      }
    });
}

function viewDepartments() {
    connection.query("SELECT * FROM department", function (err, res) {
        if (err) throw err;
        console.table(res);
        anyThingElse();
    });
    }

function viewRoles() {
    connection.query("SELECT * FROM role", function (err, res) {
        if (err) throw err;
        console.table(res);
        anyThingElse();
    });
    }

function viewEmployees() {
    connection.query("SELECT * FROM employee", function (err, res) {
        if (err) throw err;
        console.table(res);
        anyThingElse();
    });
    }

function addDepartment() {
    inquirer
    .prompt([
      {
        type: "input",
        message: "What is the name of the department you would like to add?",
        name: "name",
      },
    ])
    .then((response) => {
        connection.query("INSERT INTO department (name) VALUES (?)", [response.name], function (err, res) {
            if (err) throw err;
            console.log("Department added!");
            anyThingElse();
        });
    });
}

function addRole() {
    inquirer
    .prompt([
      {
        type: "input",
        message: "What is the name of the role you would like to add?",
        name: "title",
      },
      {
        type: "input",
        message: "What is the salary of this role?",
        name: "salary",
      },
      {
        type: "input",
        message: "What is the department id of this role?",
        name: "department_id",
      },
    ])
    .then((response) => {
        connection.query("INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)", [response.title, response.salary, response.department_id], function (err, res) {
            if (err) throw err;
            console.log("Role added!");
            anyThingElse();
        });
    });
}

function addEmployee() {
    inquirer
    .prompt([
      {
        type: "input",
        message: "What is the first name of the employee you would like to add?",
        name: "first_name",
      },
      {
        type: "input",
        message: "What is the last name of the employee you would like to add?",
        name: "last_name",
      },
      {
        type: "input",
        message: "What is the role id of this employee?",
        name: "role_id",
      },
      {
        type: "input",
        message: "What is the manager id of this employee?",
        name: "manager_id",
      },
    ])
    .then((response) => {
        connection.query("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)", [response.first_name, response.last_name, response.role_id, response.manager_id], function (err, res) {
            if (err) throw err;
            console.log("Employee added!");
            anyThingElse();
        });
    });
}

function updateRole() {
  connection.query("SELECT * FROM employee", function (err, res) {
    const employeeArray = res.map((employee) => ({ name: employee.first_name + " " + employee.last_name, value: employee.id}));
  connection.query("SELECT * FROM role", function (err, res) {
    const roleArray = res.map((role) => ({ name: role.title, value: role.id}));
  
    inquirer
    .prompt([
      {
        type: "list",
        message: "What is the name of the employee you would like to update?",
        name: "id",
        choices: employeeArray,
      },
      {
        type: "list",
        message: "What is the new role of this employee?",
        name: "role_id",
        choices: roleArray,
      },
    ])
    .then((response) => {
        connection.query("UPDATE employee SET role_id = ? WHERE id = ?", [response.role_id, response.id], function (err, res) {
            if (err) throw err;
            console.log("Employee updated!");
            anyThingElse();
        });
    });
});
});
}

start();



