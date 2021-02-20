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


//error checking method, apply to each function?
// try {}

// catch (err) {
//     console.log(err);
// }

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
            //push new engineer into the array, passing through name, id, email and github
            const manager = new Manager(name, id, email, officeNumber)
            employees.push(manager)
            console.log(employees)
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
                    name: 'gitHub',
                    message: "Please enter the engineer's gitHub",
                },

            ])

            .then(function ({ name, id, email, gitHub }) {
                //push new engineer into the array, passing through name, id, email and github
                employees.push(new Engineer(name, id, email, gitHub));
                console.log(employees)
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
                //push new intern into the array
                employees.push(new Intern(name, id, email, school));
                console.log(employees)
                //when finished pushing the new intern into the array, ask if they want to add another team member
                return promptRole();
            })
    }

    // else {
    //     //if they dont want to add another engineer or intern, return the array of teamMembers previously created
    //     return employees;
    // }
}



try {
    promptManager();
} catch (err) {
    console.log(err);
}




// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

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
