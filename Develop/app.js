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
                message: 'Please enter your GitHub.',
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
                message: 'Please enter your school.',
                name: 'school'
            }
        ])
            //then push results into team arry\
            .then(res => {
                const intern = new Intern(res.name, res.id, res.email, res.school);
                team.push(intern);
                createTeam();
                console.log(team)
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


// const questions = [
//     {
//         type: 'input',
//         message: 'Please enter your full name.',
//         name: 'fullName'
//     },
//     {
//         type: 'input',
//         message: 'Please enter your employee ID number.',
//         name: 'id'
//     },
//     {
//         type: 'input',
//         message: 'Please enter your email.',
//         name: 'email'
//     },
//     {
//         type: 'list',
//         message: 'Please enter your role.',
//         choices: ['Manager', 'Engineer', 'Intern'],
//         name: 'role'
//     },
// ];

// const inquireQ = () => {
//     inquirer
//         .prompt([
//             {
//                 type: 'list',
//                 message: 'What would you like to do?',
//                 choices: ['Build team', 'Finish team'],
//                 name: 'moreTeam'
//             }
//         ]).then(res => {
//             const moreTeam = res.moreTeam;

//             switch (moreTeam) {
//                 case "Build team":
//                     inquirer.prompt(questions)
//                         .then(response => {
//                             if (response.role === "Manager") {
//                                 inquirer.prompt({
//                                     type: 'input',
//                                     message: 'Please enter manager office phone number.',
//                                     name: 'officeNumber'
//                                 })
//                             }
//                         })
//             }
//         })

// }

//-----------------------------------------------------

// inquirer
//     .prompt(questions);

//-----------------------------------------------------

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
