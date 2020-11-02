// TODO: Write code to define and export the Engineer class.  HINT: This class should inherit from Employee.
const Employee = require("./Employee");

class Engineer extends Employee {
    constructor(name, id, email, getGithub) {
        // if (!name) {
        //     throw new Error("You are missing the name!");
        // }
        // if (!id) {
        //     throw new Error("You are missing the ID!");
        // }
        // if (!email) {
        //     throw new Error("You are missing the email!");
        // }
        // if (!githubUsername) {
        //     throw new Error("You are missing the GitHub Username!");
        // }
        super(name, id, email);

        this.getGithub = getGithub;
    }
    getGithub() {
        return this.getGithub
    }

getRole() {
    return "Engineer";
}

}

module.exports = Engineer;