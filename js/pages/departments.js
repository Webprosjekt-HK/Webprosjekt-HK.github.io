import MakeProfileBanner from "/js/modules/MakeProfileBanner.js";
import EmployeeCollection from "/js/classes/EmployeeCollection.js";
import DepartmentCollection from "/js/classes/DepartmentCollection.js";
import makeInfoPage from "/js/modules/makeInfoPage.js";

const departments = (() => {
    /**
     * TODO:
     * - Automatisk oppdatere info om avdeling når man endrer i dropdown.
     * - Endre så det faktisk er forskjellig gruppe ansatte når man velger forskjellige
     * avdelinger.
     * - Mer hypping kommentering av kode. Tydelig forklar hva hver del gjør.
     * **/
    const init = (department) => {
        document.getElementById('avdelinger').addEventListener('change', () => init(department));
        //Creating necessary objects to manipulate and deploy to DOM
        const mainElement = document.getElementById("main");
        mainElement.innerHTML = ``;
        let employeeList = new EmployeeCollection().fetchEmployees();
        let makeProfileBanner = new MakeProfileBanner("main-body");
        let selectedDepartment = document.getElementById("avdelinger").value;
        let currentDepartment =
            new DepartmentCollection().filterDepartmentsById(
                selectedDepartment
            );
        let profileInfo = new makeInfoPage("info-page");

        //Deploy info about selected department (Selected in dropdown menu)
        profileInfo.deploy(
            `${currentDepartment.name}`,
            `${currentDepartment.address}`,
            `${currentDepartment.weekHours}`,
            `${currentDepartment.weekendHours}`,
            `${currentDepartment.phoneNumber}`,
            `${currentDepartment.emailAddress}`,
            `${currentDepartment.mapLocation}`
        );

        //Deploy info about each employee
        for (let i = 1; i < 4; i++) {
            for (let j = 0; i < 4; j++) {
                makeProfileBanner.apply(
                    `${j + 1}`,
                    `${employeeList[j].firstName} ${employeeList[j].lastName}`,
                    `${employeeList[j].role}`,
                    `${employeeList[j].phoneNumber}`,
                    `${employeeList[j].username}`
                );
            }
        }
    };
    return { init };
})();

export default departments;
