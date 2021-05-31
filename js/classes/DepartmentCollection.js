export default class DepartmentCollection {
    //Function to get all locally stored department objects
    fetchDepartments = () => {
        return JSON.parse(localStorage.getItem("departments"));
    };
    //Function to get all departments that match ID in function parameter
    filterDepartmentsById = (depID) => {
        return this.fetchDepartments().find((e) => e.id == depID);
    };
}
