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
        name: "",
        value: ""
      },
      {
        name: "",
        value: ""
      },
      {
        name: "",
        value: ""
      },
      {
        name: "",
        value: ""
      },
      {
        name: "",
        value: ""
      },
      {
        name: "",
        value: ""
      },
      {
        name: "",
        value: ""
      }
    ]
  }])
};