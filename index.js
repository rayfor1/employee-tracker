const mysql = require("mysql");
const inquirer = require ('inquirer'); 
const consoleTable = require("console.table")
const connection = mysql.createConnection({
  host: "localhost",
  port: 3300,
  user: "root",
  password: "",
  database: "employee_db"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  start(); 
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  init(); 
});

function init(){
  inquirer.prompt ([
    {
      type: "list", 
      message: "What would you like to do?",
      name: "start",
      choices: [
      "Add New Employee", 
      "View all Employees", 
      "Remove an Employee",
      "Add a Department", 
      "View all Departments",
      "Add Roles", 
      "View all Roles", 
      "Update Employee Role", 
      "Exit"
    ]}
  ]).then (function(response){
      switch (response.init){
  
        case "Add New Employee":
        addNewEmployee();
        break;
       
        case "View all Employees":
        viewAllEmployees();
        break; 
  
        case "Remove an Employee": 
        removeEmployee(); 
        break;
      
        case "Add a Department": 
        addDepartment(); 
        break;
  
        case "View all Departments":
        viewAllDepartments();
        break;
  
        case "Add Roles": 
        addRole(); 
        break;
  
        case "View all Roles": 
        viewAllRoles(); 
        break;
      
        case "Update Employee Role":
        updateRole(); 
        break;
  
        case "Exit":
        connection.end(); 
        break; 
      }
    })
  }