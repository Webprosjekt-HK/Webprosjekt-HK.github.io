import DepartmentCollection from "../classes/DepartmentCollection";

import DepartmentCollection from "/js/classes/DepartmentCollection.js";

export default function ChangeDepartment(callbackFunction) {
    let selectedDepartment = document.getElementById('avdelinger').addEventListener('change', (e) => {
        new DepartmentCollection().filterDepartmentsById(selectedDepartment)
        callbackFunction(selectedDepartment)
        }
    );
}