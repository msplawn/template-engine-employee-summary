const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const Employee = require("./lib/Employee");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

let team = [];

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
function appMenu ()   {
    console.log("Let's build your team!")
    function createManager() {
        //inquire name, id, email, officeNumber
        inquirer.prompt([
            {
                type: 'input',
                message: 'Please enter your full name.',
                name: 'name'
            },
            {
                type: 'input',
                message: 'Please enter your employee ID number.',
                name: 'id'
            },
            {
                type: 'input',
                message: 'Please enter your email.',
                name: 'email'
            },
            {
                type: 'input',
                message: 'Please enter your office number.',
                name: 'officeNumber'
            }
        ])
            //then push results into team arry\
            .then(res => {
                const manager = new Manager(res.name, res.id, res.email, res.officeNumber);
                team.push(manager);
                createTeam();
            })
    }

    function createTeam() {
        // inquire with list Engineer or intern
        inquirer.prompt([
            {
                type: 'list',
                message: 'Do you want to create an engineer, intern, or build your team template?',
                name: 'memberChoice',
                choices: ['engineer', 'intern', 'Build your team template']
            }
        ]).then(res => {
            switch (res.memberChoice) {
                case "engineer":
                    addEngineer();
                    break;
                case "intern":
                    addIntern();
                    break;
                case 'Build your team template':
                    buildTeam();
            }
        })
    }

    function addEngineer() {
        // inquire name, id, email, github
        //push result into team arry
        inquirer.prompt([
            {
                type: 'input',
                message: 'Please enter engineer name.',
                name: 'name'
            },
            {
                type: 'input',
                message: 'Please enter engineer employee ID number.',
                name: 'id'
            },
            {
                type: 'input',
                message: 'Please enter engineer email.',
                name: 'email'
            },
            {
                type: 'input',
                message: 'Please enter engineer GitHub.',
                name: 'github'
            }
        ])
            //then push results into team arry\
            .then(res => {
                const engineer = new Engineer(res.name, res.id, res.email, res.github);
                team.push(engineer);
                createTeam();
            })
    }

    function addIntern() {
        // inquire name, id, email, school
        //push result into team arry
        inquirer.prompt([
            {
                type: 'input',
                message: 'Please enter intern name.',
                name: 'name'
            },
            {
                type: 'input',
                message: 'Please enter intern employee ID number.',
                name: 'id'
            },
            {
                type: 'input',
                message: 'Please enter intern email.',
                name: 'email'
            },
            {
                type: 'input',
                message: 'Please enter intern school.',
                name: 'school'
            }
        ])
            //then push results into team arry\
            .then(res => {
                const intern = new Intern(res.name, res.id, res.email, res.school);
                team.push(intern);
                createTeam();
            })
    }

    function buildTeam() {
        // fs.writeFileSync('index.html/, team)
        if (!fs.existsSync(OUTPUT_DIR)) {
            fs.mkdirSync(OUTPUT_DIR);
        }
        fs.writeFileSync(outputPath, render(team), "utf-8");
    }
    createManager();
}
appMenu();


