const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

let allEmployees = [];

const name = {
    name: 'name',
    message: 'Please enter your name: ',
    type: 'input'
    }
const id = {
    name: 'id',
    message: 'Please enter your ID: ',
    type: 'input'
    }
const email = {
    name: 'email',
    message: 'Please enter your email: ',
    type: 'input'
    }
const officeNumber = {
    name: 'officeNumber',
    message: 'Please enter your office number: ',
    type: 'input'
    }
const github = {
    name: 'github',
    message: 'Please enter your github username: ',
    type: 'input'
    }
const school = {
    name: 'school',
    message: 'Please enter your school name: ',
    type: 'input'
    }

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
async function getEmployee() {
    await inquirer
    .prompt({
        name: 'addEmployee',
        message: 'Add an Employee?',
        type: 'confirm'
    })
    .then(answer => {
        if(answer.addEmployee === true) {
            inquirer
            .prompt({
                name: 'role',
                message: 'Employee role?',
                type: 'list',
                choices: ['Manager', 'Engineer', 'Intern']
            })
            .then(answer => {
                let role = answer.role;
                if(role === "Manager") {
                    getManager()
                } 
                else if(role === "Intern") {
                    getIntern()
                } 
                else if(role === "Engineer") {
                   getEngineer();
                }
            });
        } 
        else {
            console.log("End of session");
            allEmployees = render(allEmployees);
            renderEmployeeInfo();
        }
    })
}

getEmployee()

async function getManager() {
    await inquirer
    .prompt([name, id, email, officeNumber])
    .then(answers => {
        let newEmp = new Manager(answers.name, answers.id, answers.email, answers.officeNumber);
        allEmployees.push(newEmp);
        getEmployee();
    })
}

async function getIntern() {
    await inquirer
    .prompt([name, id, email, school])
    .then(answers => {
        let newEmp = new Intern(answers.name, answers.id, answers.email, answers.school)
        allEmployees.push(newEmp);
        getEmployee();
    })
}

async function getEngineer() {
    await inquirer
    .prompt([name, id, email, github])
    .then(answers => {
        let newEmp = new Engineer(answers.name, answers.id, answers.email, answers.github)
        allEmployees.push(newEmp);
        getEmployee();
    })
}

function renderEmployeeInfo() {
    fs.writeFile(outputPath, allEmployees, function(err){
        if(err) {
            console.log(err)
        }
    })
}


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
