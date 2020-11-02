// TODO: Write code to define and export the Manager class. HINT: This class should inherit from Employee.
const Employee = require("./Employee");

class Manager extends Employee {
    constructor(name, id, email, officeNumber) {
        // if (!name) {
        //     throw new Error("You are missing the name!");
        // }
        // if (!id) {
        //     throw new Error("You are missing the ID!");
        // }
        // if (!email) {
        //     throw new Error("You are missing the email!");
        // }
        // if (!officeNumber) {
        //     throw new Error("You are missing the office number!");
        // }
        super(name, id, email);

        this.officeNumber = officeNumber;       
    
    }

    getOfficeNumber() {
        return this.officeNumber;
    }

    getRole() {
        return "Manager";
    }
}

module.exports = Manager;