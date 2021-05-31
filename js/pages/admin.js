import { Employee } from "/js/classes/Person.js";
import EmployeeCollection from "/js/classes/EmployeeCollection.js";
import MakeAdminPanels from "/js/modules/MakeAdminPanels.js";

const admin = (() => {
    const init = (state) => {
        const employeeCollection = new EmployeeCollection();
        const departmentsWithAdmin = state.loggedInUser.adminPrivileges;
        const adminPanel = new MakeAdminPanels(departmentsWithAdmin).getPanel();
        const mainContainer = document.getElementById("main");
        mainContainer.innerHTML = "";
        mainContainer.append(adminPanel);
        adminPanel.querySelector("#admin-save-btn").onclick = () => {
            const departmentsInfo = adminPanel.querySelectorAll(
                ".department-registration"
            );
            const firstName = adminPanel.querySelector("#add-first-name").value;
            const lastName = adminPanel.querySelector("#add-last-name").value;
            const address = adminPanel.querySelector("#add-address").value;
            const birthDate = adminPanel.querySelector("#add-birth-date").value;
            const userName = adminPanel.querySelector("#add-username").value;
            const password = adminPanel.querySelector("#add-password").value;
            const profilePicture = adminPanel.querySelector(
                "#add-profile-picture"
            ).value;
            const role = adminPanel.querySelector("#add-role").value;
            const phoneNumber = adminPanel.querySelector("#add-phone").value;
            const departmentId = [];
            const adminPriv = [];

            Array.from(departmentsInfo).forEach((e) => {
                const isEmployee = e.querySelector('input[type="checkbox"]');
                const isLeader = e.querySelector(
                    'input[type="radio"].is-leader'
                ).checked;
                if (isEmployee.checked || isLeader)
                    departmentId.push(parseInt(isEmployee.value));
                if (isLeader) adminPriv.push(parseInt(isEmployee.value));
            });
            const employee = new Employee(
                employeeCollection.getNewId(),
                role,
                phoneNumber,
                firstName,
                lastName,
                userName,
                password,
                address,
                400000,
                profilePicture,
                departmentId,
                adminPriv,
                new Date(birthDate)
            );
            const msgElement = document.getElementById("status-msg-admin");
            const msg = employeeCollection.addEmployee(employee);
            msgElement.innerHTML = msg.status;
            if (msg.code == 200) msgElement.style.color = "green";
            else msgElement.style.color = "red";
        };
    };
    return { init };
})();

export default admin;
