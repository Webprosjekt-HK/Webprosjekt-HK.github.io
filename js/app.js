import profile from "/js/pages/profile.js";
import shiftOverview from "/js/pages/shiftOverview.js";
import * as setup from "/js/tools/setup.js";
import checkCredentials from "/js/tools/loginService.js";
import signup from "/js/tools/signupService.js";
import { Employee } from "/js/classes/Person.js";
import departments from "/js/pages/departments.js";
import DepartmentCollection from "/js/classes/DepartmentCollection.js";

import salesInfo from "/js/pages/sales.js";
import menu from "/js/pages/menu.js";

const state = {
    loggedInUser: {},
};

// Denne importerer brukerene våre ved første kjøring
setup.saveShifts();
setup.saveEmployees();
setup.saveDepartments();
setup.addEventListeners(state);
// Dev environment. Use this to skip going through the landingpage
//const user = checkCredentials("gjerdmunn@gylnepizza.no", "1234");
//if (user !== null) state.loggedInUser = user;

// prod
state.loggedInUser = JSON.parse(localStorage.getItem("user"));
if (!state.loggedInUser) window.location.replace("/landingpage.html");
setup.initPageSettings(state.loggedInUser);
// Midlertidig fiks på ødelagt localStorage-objekter

try {
    profile.init(state);
} catch (error) {
    localStorage.removeItem("employees");
    window.location.reload();
    console.error(error);
    console.error("Attempting to reinstall data");
}
