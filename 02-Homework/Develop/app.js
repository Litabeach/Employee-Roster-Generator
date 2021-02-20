const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const employees = [];

//manager questions
function promptManager() {
    return inquirer
        .prompt([

            {
                type: 'input',
                name: 'name',
                message: "Enter the manager's name",
                validate: answer => {
                    if (answer !== "") {
                        return true;
                    }
                    else
                        return "Please enter at least one character"
                }
            },

            {
                type: 'number',
                name: 'id',
                message: 'Please enter the managers ID number',
            },

            {
                type: 'input',
                name: 'email',
                message: 'Please enter the managers email address',
                validate: function (email) {
                    // all the character that can be included in an email address
                    if (/^\w+([\.\+-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
                        return (true)
                    }
                    console.log(" You have entered an invalid email address!")
                    return (false)

                }
            },

            {
                type: 'number',
                name: 'officeNumber',
                message: 'Please enter the managers office number',
            },
        ]).then(function ({ name, id, email, officeNumber }) {
            //push new manager into the array, passing through name, id, email and office number
            const manager = new Manager(name, id, email, officeNumber)
            employees.push(manager)
            return promptRole();
        })

}

//the questions about roles are asked after the manager questions with async/await in the init function
function promptRole() {
    return inquirer
        .prompt([
            {
                type: 'list',
                name: 'role',
                message: "What type of team member would you like to add?",
                choices: ['Engineer', 'Intern', 'No more to add']
            },
        ]).then(function (response) {
            if (response.role == 'No more to add') {
                console.log(employees)
                fs.writeFile(outputPath, render(employees), function (err) {
                    if (err) {
                        console.log(err);
                    }
                    console.log("team.html has been created")
                });
            }
            else {
                promptTeam(response.role)
            }
        })
}


//async function: promptTeam has to wait (await) for the promptRole function to run before it runs
function promptTeam(role) {

    if (role === "Engineer") {
        return inquirer
            .prompt([

                {
                    type: 'input',
                    name: 'name',
                    message: "Enter the engineers's name",
                    validate: answer => {
                        if (answer !== "") {
                            return true;
                        }
                        else
                            return "Please enter at least one character"
                    }
                },

                {
                    type: 'number',
                    name: 'id',
                    message: "Please enter the engineer's ID number",
                },

                {
                    type: 'input',
                    name: 'email',
                    message: 'Please enter the engineers email address',
                    validate: function (email) {
                        //line 42 is all the character that can be included in an email address
                        if (/^\w+([\.\+-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
                            return (true)
                        }
                        console.log(" You have entered an invalid email address!")
                        return (false)
                    }
                },

                {
                    type: 'input',
                    name: 'github',
                    message: "Please enter the engineer's github",
                },
            ])

            .then(function ({ name, id, email, github }) {
                //push new engineer into the array, passing through name, id, email and github
                employees.push(new Engineer(name, id, email, github));

                //ask if they want to add another team member
                return promptRole();
            })
    }

    else if (role === "Intern") {
        return inquirer
            .prompt([

                {
                    type: 'input',
                    name: 'name',
                    message: "Enter the intern's name",
                    validate: answer => {
                        if (answer !== "") {
                            return true;
                        }
                        else
                            return "Please enter at least one character"
                    }
                },

                {
                    type: 'number',
                    name: 'id',
                    message: "Please enter the intern's ID number",
                },

                {
                    type: 'input',
                    name: 'email',
                    message: "Please enter the intern's email address",
                    validate: function (email) {
                        //line 42 is all the character that can be included in an email address
                        if (/^\w+([\.\+-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
                            return (true)
                        }
                        console.log(" You have entered an invalid email address!")
                        return (false)

                    }
                },

                {
                    type: 'input',
                    name: 'school',
                    message: "Please enter the intern's school",
                },
            ])


            .then(function ({ name, id, email, school }) {
                //push new intern into the array, passing the correct variables through
                employees.push(new Intern(name, id, email, school));
                //when finished pushing the new intern into the array, run promptRole to add another team member
                return promptRole();
            })
    }
}


//run the function! 
promptManager();

