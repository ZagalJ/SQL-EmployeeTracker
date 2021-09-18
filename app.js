let inquirer = require ("inquirer");

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
  }]).then(({selection}) => {
    if (selection === "VIEWDPT"){
      viewDpt();
    } else if ( selection === "VIEWROL"){
      viewRol();
    } else if ( selection === "VIEWEMP"){
      viewEmp();
    } else if ( selection === "ADDDPT"){
      addDpt();
    } else if ( selection === "ADDROL"){
      addRol();
    } else if ( selection === "ADDEMP"){
      addEmp();
    } else if ( selection === "UPDEMP"){
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
  });
  }
//view role function
//view employee function
//add department function
//add role function 
//add employee function
//update employee function
