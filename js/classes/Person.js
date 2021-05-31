export default class Person {
    id;
    role;
    phoneNumber;
    firstName;
    lastName;
    username;
    password;
    address;
    birthDate;
    constructor(
        id,
        role,
        phoneNumber,
        firstName,
        lastName,
        username,
        password,
        address,
        birthDate
    ) {
        this.id = id;
        this.role = role;
        this.phoneNumber = phoneNumber;
        this.firstName = firstName;
        this.lastName = lastName;
        this.username = username;
        this.password = password;
        this.address = address;
        this.birthDate = birthDate;
    }
}

export class Employee extends Person {
    departmentID;
    adminPrivileges;
    salary;
    pictureUrl;
    constructor(
        id,
        role,
        phoneNumber,
        firstName,
        lastName,
        username,
        password,
        address,
        salary,
        pictureUrl,
        departmentID,
        adminPrivileges,
        birthDate
    ) {
        super(
            id,
            role,
            phoneNumber,
            firstName,
            lastName,
            username,
            password,
            address, birthDate
        );
        this.departmentID = departmentID;
        this.adminPrivileges = adminPrivileges;
        this.salary = salary;
        this.pictureUrl = pictureUrl;
    }
    setSalary = (amount) => (this.salary = amount);
    setAdmin = (departmentID) => this.adminPrivileges.push(departmentID);
    setDepartment = (departmentID) => this.departmentID.push(departmentID);
    removeAdmin = (departmentID) => {
        const departmentIndex = this.adminPrivileges.indexOf(departmentID);
        this.departmentID.splice(departmentIndex, 1);
    };
}
