const inquirer = require('inquirer');
const mysql = require('mysql');
const cTable = require('console.table');
const dotenv = require('dotenv').config();

// Create connection to database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: process.env.DB_PASS,
    database: 'employee_tracker_db'

