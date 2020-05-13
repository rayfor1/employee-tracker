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
      message: "Main Menu: What would you like to do?",
      name: "init",
      choices: [
      "Add new Employee", 
      "View all Employees", 
      "Remove an Employee",
      "Add a Department", 
      "View all Departments",
      "Add new Roles", 
      "View all Roles", 
      "Update an Employee Role", 
      "Exit"
    ]}
  ]).then (function(response){
      switch (response.init){
  
        case "Add new Employee":
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
  
        case "Add new Roles": 
        addNewRoles(); 
        break;
  
        case "View all Roles": 
        viewAllRoles(); 
        break;
      
        case "Update an Employee Role":
        updateRole(); 
        break;
  
        case "Exit":
        connection.end(); 
        break; 
      }
    })
  }

  //function to run when addNewEmployee is selected
  function addNewEmployee() {
    inquirer.prompt([
        {
          type: "input",
          message: "What is the first name of the employee?",
          name: "firstName"
        },
        {
          type: "input",
          message: "What is the last name of the employee?",
          name: "lastName"
        },
        {
          type: "input",
          message: "What is the role ID of the employee?",
          name: "roleID"
        },
        {
          type: "input",
          message: "What is the manager ID of the employee?",
          name: "managerID"
        }
      ]).then(function(res) {
        const firstName = res.firstName;
        const lastName = res.lastName;
        const roleID = res.roleID;
        const managerID = res.managerID;
        const query = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUE("${firstName}", "${lastName}", "${roleID}", "${managerID}")`;
        connection.query(query, function(err, res) {
          if (err) throw err;
          console.table(res);
          start();
        });
      });
  }