const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

///matt code

const teamMembers = [];
const emptyId = [];
const employeeQuestions = [
  {
    type: "input",
    name: "managerName",
    message: "What's the Manager's Name?",
  },
  {
    type: "input",
    name: "managerId",
    message: "What's the Manager's ID?",
  },
  {
    type: "input",
    name: "managerEmail",
    message: "What's the Manager's Email?",
  },
  {
    type: "input",
    name: "officeNumber",
    message: "What's the Manager's Office Number?",
  },
];

//manager function
function manager() {
  console.log("Lets Build the Team!");
  inquirer.prompt(employeeQuestions).then(function (data) {
    const manager = new Manager(
      data.managerName,
      data.managerId,
      data.managerEmail,
      data.officeNumber
    );
    teamMembers.push(manager);
    emptyId.push(data.managerId);
    //call team function once manager info is entered
    team();
  });
}
//engineer funtion
function engineer() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "engineerName",
        message: "Input  engineer's name?",
      },
      {
        type: "input",
        name: "engineerId",
        message: "Input engineer's ID?",
      },
      {
        type: "input",
        name: "engineerEmail",
        message: "Input engineer's email?",
      },
      {
        type: "input",
        name: "engineerGithub",
        message: "Input engineer's GitHub username?",
      },
    ])
    .then(function (data) {
      const engineer = new Engineer(
        data.engineerName,
        data.engineerId,
        data.engineerEmail,
        data.engineerGithub
      );
      teamMembers.push(engineer);
      emptyId.push(data.engineerId);
      team();
    });
}

//Intern Function

function intern() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "internName",
        message: "Input intern's name?",
      },
      {
        type: "input",
        name: "internId",
        message: "Input intern's ID?",
      },
      {
        type: "input",
        name: "internEmail",
        message: "Input intern's email?",
      },
      {
        type: "input",
        name: "internSchool",
        message: "Input intern's school?",
      },
    ])
    .then(function (data) {
      const intern = new Intern(
        data.internName,
        data.internId,
        data.internEmail,
        data.internSchool
      );
      teamMembers.push(intern);
      emptyId.push(intern);
      team();
    });
}

function team() {
  //build team here
  inquirer
    .prompt([
      {
        type: "list",
        name: "teamMemberChoice",
        message: "What Team Member Type would you like to Add?",
        choices: ["Engineer", "Intern", "No more Team Members to Add"],
      },
    ])
    .then(function (data) {
      if (data.teamMemberChoice === "Engineer") {
        engineer();
      } else if (data.teamMemberChoice === "Intern") {
        intern();
      } else outputTeam();
    });
}

//function to render html pages

function outputTeam() {
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR);
  }
  fs.writeFileSync(outputPath, render(teamMembers), "utf-8");
  //console.log(teamMembers);
}

// function to initialize program
function init() {
  manager();
}

// function call to initialize program
init();
