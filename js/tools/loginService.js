import EmployeeCollection from "/js/classes/EmployeeCollection.js";

const checkCredentials = (userName, password) => {
    const employees = new EmployeeCollection().fetchEmployees();
    let loggedInUser = null;
    employees.forEach((e) => {
        if (e.username === userName && e.password === password) {
            console.info("found match, logging in...");
            loggedInUser = e;
        }
    });
    return loggedInUser;
};
export default checkCredentials;
