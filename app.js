const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "templates");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

let employeeList = [];
let employeeID = 1;

// manager questions
function managerQuestions() {
    inquirer.prompt([
            {
                type: "input",
                message: "Enter the Manager's name.",
                name: "managerName"
            },
            {
                type: "input",
                message: "Enter the Manager's email address.",
                name: "managerEmail"
             },
             {
                type: "input",
                message: "What is the Manager's office number?",
                name: "managerNumber"
             }

        ])
        .then(function(response) {
            let managerName = response.managerName;
            let managerEmail = response.managerEmail;
            let managerNumber = response.managerNumber;
            let manager = new Manager(
                managerName,
                employeeID,
                managerEmail,
                managerNumber,
            );

            employeeList.push(manager);
            employeeID++;

            console.log(`Manager's Employee Information`);

            employeeQuestions();
        });
}

// identifying employee type & basic info
function employeeQuestions() {
    inquirer.prompt([
        {
            type: "input",
            message: "Enter the Employee's name.",
            name: "employeeName"
        },
        {
            type: "list",
            message: "Select the Employee's role.",
            choices: ["Intern", "Engineer"],
            name: "employeeType"
        },
        {
            type: "input",
            message: "Enter the Employee's email address.",
            name: "employeeEmail"
        }
        
    ])
    // capturing repsonse for employee type
    .then(function(response) {
        let employeeName = response.employeeName;
        let employeeType = response.employeeType;
        let employeeEmail = response.employeeEmail;

        //engineer questions
        if (employeeType === "Engineer") {
            inquirer.prompt([
                {
                    type: "input",
                    message: "Enter your GitHub username",
                    name: "gitUser"
                },
                {
                    type: "list",
                    message: "Are there any other employees you'd like to add?",
                    choices: ["Yes", "No"],
                    name: "addlEmployees"
                }
            ])
            .then(function(response) {
                let employeeGitHub = response.gitUser;
                let engineer = new Engineer(
                    employeeName,
                    employeeID,
                    employeeEmail,
                    employeeGitHub
                );

                employeeList.push(engineer);
                employeeID++;

                if (response.addlEmployees === "Yes") {
                    employeeQuestions();
                } else {
                    display()
                    return;
                }
            });
        // triggering intern questions    
        } else {
            inquirer.prompt([
                {
                    type: "input",
                    message: "What school did/does the intern attend?",
                    name: "internSchool"
                },
                {
                    type: "list",
                    message: "Are there any other employees you'd like to add?",
                    choices: ["Yes", "No"],
                    name: "addlEmployees"
                }

            ])
            .then(function(response) {
                let employeeSchool = response.internSchool;
                let intern = new Intern(
                    employeeName,
                    employeeID,
                    employeeEmail,
                    employeeSchool
                );
                
                employeeList.push(intern);
                employeeID++;

                if (response.addlEmployees === "Yes") {
                    employeeQuestions();
                } else {
                    display()
                    return;
                }
            });
            }
        });




    }
    

    function display() {
        fs.writeFile(outputPath, render(employeeList), function(err) {
        if (err) {
            return console.log(err);
        }
    });
    }

    managerQuestions();


