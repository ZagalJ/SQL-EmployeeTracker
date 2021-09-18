let inquirer = require ("inquirer");
const fs = require('fs');
const connection = require ('./server')
init ();

function init() {
    console.log(`Welcome to the Employee Management System `);
    main();
  };

function main(){
  inquirer.prompt([{
    type: "list",
    name: "firstSelection",
    message: "What would you like to do?",
    choices: [
      {
        name: "View all departments",
        value: "VIEWDPT"
      },
      {
        name: "View all roles",
        value: "VIEWROL"
      },
      {
        name: "View all employees",
        value: "VIEWEMP"
      },
      {
        name: "Add a department",
        value: "ADDDPT"
      },
      {
        name: "Add a role",
        value: "ADDROL"
      },
      {
        name: "Add employee",
        value: "ADDEMP"
      },
      {
        name: "Update employee role",
        value: "UPDEMP"
      }
    ]
  }]).then(({firstSelection}) => {
    // console.log(firstSelection);
    if (firstSelection === "VIEWDPT"){
      viewDpt();
    } else if ( firstSelection === "VIEWROL"){
      viewRol();
    } else if ( firstSelection === "VIEWEMP"){
      viewEmp();
    } else if ( firstSelection === "ADDDPT"){
      addDpt();
    } else if ( firstSelection === "ADDROL"){
      addRol();
    } else if ( firstSelection === "ADDEMP"){
      addEmp();
    } else if ( firstSelection === "UPDEMP"){
      updEmp();
    } 
  });
};

//view dpt function
function viewDpt() {
  console.log("Selecting all departments...\n");
    connection.query("SELECT id AS `ID`, department AS `Department` FROM departments", function (err, res) {
      if (err) throw err;
        console.table(res);
        console.log("test, empty")
        main();
    });
}

//view role function
function viewRol() {
  console.log("Selecting all roles...\n");
    connection.query("SELECT title AS `Title`, salary AS `Salary`, department_id AS `Department Id` FROM roles", function (err, res) {
      if (err) throw err;
        console.table(res);
        console.log("test, empty")
        main();
    });
}

//view employee function
function viewEmp() {
  console.log("Selecting all the employees...\n");
    connection.query("SELECT first_name AS `First Name`, last_name AS `Last Name`, role_id AS `Role ID` FROM employee", function (err, res) {
      if (err) throw err;
        console.table(res);        
        console.log("test, empty")
        main();
    });
}
//add department function
//add role function 
//add employee function
//update employee function
