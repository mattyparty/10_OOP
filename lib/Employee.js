// TODO: Write code to define and export the Employee class

class Employee {
  constructor(name, id, email) {
    this.name = name;
    this.id = id;
    this.email = email;
  }

  getName() {
    ///code here
    return this.name;
  }

  getId() {
    ///code here
    return this.id;
  }

  getEmail() {
    ///code here
    return this.email;
  }

  getRole() {
    ///returns employee
    return "Employee";
  }
}

module.exports = Employee;
