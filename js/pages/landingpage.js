import checkCredentials from "/js/tools/loginService.js";
import * as setup from "/js/tools/setup.js";

function login(username, password) {
    if (!localStorage.getItem("employees")) {
        setup.saveEmployees();
        setup.saveDepartments();
        setup.savePizzas();
        setup.saveShifts();
    }
    const user = checkCredentials(username, password);

    if (user !== null) {
        localStorage.setItem("user", JSON.stringify(user));
        window.location.replace("/index.html");
        console.log("Logging in");
    } else {
        console.error("wrong username or password");
    }
}

document.querySelector("#login-btn").onclick = (e) => {
    e.preventDefault();
    const username = document.getElementById("loginUser").value;
    const password = document.getElementById("loginPassword").value;

    login(username, password);
};
