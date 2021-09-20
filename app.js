let inquirer = require ("inquirer");
const fs = require('fs');
const connection = require ('./server')
const cTable = require('console.table');

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
        // console.log("test, empty")
        main();
    });
}

//view role function
function viewRol() {
  console.log("Selecting all roles...\n");
    connection.query("SELECT roles.id, title AS `Title`, salary AS `Salary`, departments.department AS department, department_id AS `Department Id` FROM roles JOIN departments on departments.id = roles.department_id;", function (err, res) {
      if (err) throw err;
        console.table(res);
        // console.log("test, empty")
        main();
    });
}

//view employee function
function viewEmp() {
  console.log("Selecting all the employees...\n");
    connection.query(
      `SELECT e.id, e.first_name, e.last_name, r.title, d.department AS department, r.salary, m.first_name AS manager 
      FROM employee AS e 
      JOIN roles AS r ON e.role_id = r.id 
      JOIN departments AS d ON r.department_id = d.id
      LEFT JOIN employee AS m ON e.manager_id = m.id`,
       function (err, res) {
      if (err) throw err;
        console.table(res);        
        // console.log("test, empty")
        main();
    });
}
//add department function
function addDpt(){
  connection.query("SELECT * FROM departments", function (err, res){
    if (err) throw err;
      const departments = res.map(element => {
        return element.id
      })
      inquirer
        .prompt([
          {
            name: "department",
            type: "input",
            message: "What is their department?"
          }
        ])
        .then(function (answer){
          connection.query("INSERT INTO departments SET ?", answer, function (err)   {
            if (err) throw err;
            console.log(`${answer.department} was added successfully`);
            main();
          }        )
        })
  })
}
//add role function 
function addRol(){
  connection.query("SELECT * FROM departments", function (err, res) {
    if (err) throw err;
      // const departments = res.map(element => {
      //   return element.department
      // })
      const depData = res.map((dpt) => ({
        name: dpt.department,
        value: dpt.id,
      }));
      inquirer
        .prompt([
          {
            name: "title",
            type: "input",
            message: "What's their title?"
          },
          {
            name: "salary",
            type: "input",
            message: "What's their salary?"
          },
          {
            name: "department_id",
            type: "list",
            message: "What's their department?",
            choices: depData
          },
        ])
        .then(function (answer){
          connection.query("INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)", 
          [answer.title, answer.salary, answer.department_id],
           function (err) {
            if (err) throw err;
            console.log(`${answer.title} was added successfully`)
            main();
          } )
        })
  })
}

//add employee function
function addEmp() {
  connection.query("SELECT * FROM roles JOIN employee ON employee.id = roles.id", function (err, res) {
    if (err) throw err;
      const roleInfo = res.map((role) => ({
        name: role.title,
        value: role.id
      }));

      inquirer
      .prompt([
        {
          name: "firstName",
          type: "input",
          message: "What is the employee's name?",
        },
        {
          name: "lastName",
          type: "input",
          message: "What is the employee's last name?",
        },
        {
          name: "title",
          type: "list",
          message: "What is their role?",
          choices: roleInfo
        }
      ])
      .then(function (answer) {
        connection.query("INSERT INTO employee (first_name, last_name, role_id) VALUES (?, ?, ?)",
        [answer.firstName, answer.lastName, answer.title],
        (err, res) => {
          if (err) throw err;
         console.log("A new employee was added to the database") 
         main();
        })
      })
  })
}

//update employee function
function updEmp(){
  connection.query(`SELECT * FROM employee`, function (err, res)  {
    if (err) throw err;
    const names = res.map (element => {
      return `${element.id}: ${element.first_name} ${element.last_name}`
    })
    connection.query("SELECT title, id FROM roles", function(err, success){
      if (err) throw err;
      const roles = success.map(element => element.title);
      inquirer.prompt([
        {
          name: "who",
          type: "list",
          choices: names,
          message: "Whom would you like to update?"
        },
        {
          name: "role",
          type: "list",
          choices: roles,
          message: "What is the title of their new role?"
        }
      ]).then(answer => {
        console.log(answer);
        const empIdToUpdate = answer.who.split(":")[0];
        console.log(empIdToUpdate)
        const chosenRole = success.find(element => {
          return element.title === answer.role
        });
        console.log(chosenRole.id);
        connection.query("UPDATE employee SET role_id=? where id=?", [chosenRole.id, empIdToUpdate],
        // connection.query(`UPDATE employee SET role_id = ? WHERE id = ?`,
        // [
        //   answer.role.id, answer.who.split(": ")[0]
        // ],
        (err, roles) => {
          if (err) throw err;
          console.log(`Role successfully changed`)
          main();
        })  
      })
    })
  })
}