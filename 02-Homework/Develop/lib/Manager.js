// TODO: Write code to define and export the Manager class. HINT: This class should inherit from Employee.
const Employee = require("./Employee")

// TODO: Write code to define and export the Engineer class.  HINT: This class should inherit from Employee.

class Manager extends Employee {
        constructor(name, id, email, officeNumber) {
          super(name, id, email);
          this.officeNumber = officeNumber
        }
      get officeNumber(){
      return this.officeNumber
        }
      get role(){
          return Manager
      }  
        
      }
      
      module.exports = Manager;