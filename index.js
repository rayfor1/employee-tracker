const mysql = require("mysql");
const inquirer = require ('inquirer'); 
const consoleTable = require("console.table")
const connection = mysql.createConnection({
  host: "localhost",
  port: 3300,
  user: "root",
  password: "Chiakaray820",
  database: "employee_db"
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
      
        case "Add new Department": 
        addNewDepartment(); 
        break;
  
        case "View all Departments":
        viewAllDepartments();
        break;
  
        case "Add new Roles": 
        addNewRole(); 
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

// Function to run when addNewEmployee is selected (adds an employee to the table)
  function addNewEmployee() {
    inquirer.prompt([
        {
          type: "input",
          message: "What is the first name of the employee?",
          name: "first_name"
        },
        {
          type: "input",
          message: "What is the last name of the employee?",
          name: "last_name"
        },
        {
          type: "input",
          message: "What is the role ID of the employee?",
          name: "role_id"
        },
        {
          type: "input",
          message: "What is the manager ID of the employee?",
          name: "manager_id"
        }
      ]).then(res => {
        const first_name = res.first_name;
        const last_name = res.last_name;
        const role_id = res.role_id;
        const manager_id = res.manager_id;
        const query = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUE("${first_name}", "${last_name}", "${role_id}", "${manager_id}")`;
        connection.query(query, function(err, res) {
          if (err) throw err;
          console.table(res);
          init();
        });
      });
  }

// Function to view all employees listed on the table:
  function viewAllEmployees() {
    const query = "SELECT * FROM employee";
    connection.query(query, function(err, res) {
      if (err) throw err;
      console.table(res);
      init();
    });
  }
  
// Function to remove an eployee from the table:
function removeEmployee() {

  inquirer.prompt([
      {
          name: "first_name",
          type: "input",
          message: "What is the first name of the employee?"
      },
      {
          name: "last_name",
          type: "input",
          message: "What is the last name of the employee?"
      }
  ]).then(function (res) {

      connection.query("DELETE FROM employee WHERE first_name = ? and last_name = ?", [res.first_name, res.last_name], function (err) {
          if (err) throw err;

          init();
      })


  });

}


// Function to add a department:

function addNewDepartment() {
  inquirer.prompt({
      type: "input",
      message: "What is the name of the department you would like to add?",
      name: "department"
    }).then(res => {
      const department = res.department;
      const query = `INSERT INTO department (name) VALUES("${department}")`;
      connection.query(query, function(err, res) {
        if (err) throw err;
        console.table(res);
        init();
      });
    });
};

// Function to view all departments:

function viewAllDepartments() {
  const query = "SELECT * FROM department";
  connection.query(query, function(err, res) {
    if (err) throw err;
    console.table(res);
    init();
  });
}

// Function to add new role:
function addNewRole() {
  inquirer.prompt([
      {
        type: "input",
        message: "What is the job title you want to add?",
        name: "title"
      },
      {
        type: "input",
        message: "What is the salary for this position?",
        name: "salary"
      },
      {
        type: "input",
        message: "What is the department ID for this position?",
        name: "department_id"
      }
    ]).then(res => {
      const title = res.title;
      const salary = res.salary;
      const department_id = res.department_id;
      const query = `INSERT INTO role (title, salary, department_id) VALUE("${title}", "${salary}", "${department_id}")`;
      connection.query(query, function(err, res) {
        if (err) throw err;
        console.table(res);
        init();
      });
    });
}

// Function to view all employee roles:
function viewAllRoles() {
  const query = "SELECT * FROM role";
  connection.query(query, function(err, res) {
    if (err) throw err;
    console.table(res);
    init();
  });
}

// Function to update an employee role:
function updateRole(){
  ​
  connection.query("SELECT first_name, last_name, id FROM employees",
  function(err,res){
    let employees = res.map(employee => ({name: employee.first_name + " " + employee.last_name, value: employee.id}))
  ​  inquirer.prompt([
      {
        type: "list",
        name: "employee_name",
        message: "Which employee's role should updated?", 
        choices: employees
      },
      {
        type: "input",
        name: "new_role",
        message: "What is the new role for the employee?"
      }
    ]).then (function(res){
      connection.query(`UPDATE employees SET role_id = ${res.new_role} WHERE id = ${res.employee_name}`,
      function (err, res){
        console.table(res);
        init()
      }
      );
    })
  }
  )
  }
  
