export default class Shift {
    id;
    start;
    end;
    departmentID;
    employeeID;
    constructor(id, start, end, departmentID, employeeID) {
        this.id = id;
        this.start = start;
        this.end = end;
        this.departmentID = departmentID;
        this.employeeID = employeeID;
    }
}
