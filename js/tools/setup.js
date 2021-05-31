import { Employee } from "/js/classes/Person.js";
import Shift from "/js/classes/Shift.js";
import Department from "/js/classes/Department.js";
import DepartmentCollection from "/js/classes/DepartmentCollection.js";
import Pizza from "/js/classes/Pizza.js";
import salesInfo from "/js/pages/sales.js";
import menu from "/js/pages/menu.js";
import profile from "/js/pages/profile.js";
import shiftOverview from "/js/pages/shiftOverview.js";
import departments from "/js/pages/departments.js";
import Ingredient from "/js/classes/Ingredient.js";
import storageOverview from "/js/pages/storageOverview.js";
import admin from "/js/pages/admin.js";

const employees = [
    new Employee(
        1,
        "Kjøkkensjef",
        45533312,
        "Ola",
        "Nordmann",
        "ola@gylnepizza.no",
        "1234",
        "pizzaveien 1",
        420000,
        "images/ansatt_1.png",
        [1, 2, 3, 4],
        [1, 2, 3, 4],
        new Date("01.08.1978")
    ),
    new Employee(
        2,
        "Soussjef",
        45533312,
        "Solveig",
        "Hanssen",
        "solveig@gylnepizza.no",
        "1234",
        "pizzaveien 1",
        420000,
        "images/ansatt_2.png",
        [1, 2, 3, 4],
        [1, 2, 3],
        new Date("01.03.1979")
    ),
    new Employee(
        3,
        "Pizzakokk",
        45533312,
        "Brage",
        "Morgenstierne",
        "brage@gylnepizza.no",
        "1234",
        "pizzaveien 1",
        420000,
        "images/ansatt_3.png",
        [2, 3],
        [],
        new Date("06.09.1995")
    ),
    new Employee(
        4,
        "Pizzakokk",
        45533312,
        "Hege",
        "Svendsen",
        "hege@gylnepizza.no",
        "1234",
        "pizzaveien 1",
        420000,
        "images/ansatt_4.png",
        [1, 2, 4],
        [],
        new Date("01.12.2000")
    ),
];
const shifts = [
    new Shift(
        "2-2021-05-02T08:30:00",
        "2021-05-02T08:30:00",
        "2021-05-02T16:30:00",
        1,
        2
    ),
    new Shift(
        "1-2021-06-25T08:30:00",
        "2021-06-25T08:30:00",
        "2021-06-25T16:30:00",
        1,
        1
    ),
    new Shift(
        "2-2021-06-26T08:30:00",
        "2021-06-26T08:30:00",
        "2021-06-26T16:30:00",
        1,
        2
    ),
    new Shift(
        "3-2021-06-27T08:30:00",
        "2021-06-27T08:30:00",
        "2021-06-27T16:30:00",
        1,
        3
    ),
    new Shift(
        "4-2021-06-28T08:30:00",
        "2021-06-28T08:30:00",
        "2021-06-28T16:30:00",
        1,
        4
    ),
    new Shift(
        "1-2021-06-29T08:30:00",
        "2021-06-29T08:30:00",
        "2021-06-29T16:30:00",
        1,
        1
    ),
    new Shift(
        "1-2021-06-22T08:30:00",
        "2021-06-22T08:30:00",
        "2021-06-22T16:30:00",
        1,
        1
    ),
    new Shift(
        "1-2021-06-21T08:30:00",
        "2021-06-21T08:30:00",
        "2021-06-21T16:30:00",
        1,
        1
    ),
    new Shift(
        "2-2021-06-01T08:30:00",
        "2021-06-01T08:30:00",
        "2021-06-01T16:30:00",
        1,
        2
    ),
    new Shift(
        "2-2021-06-02T08:30:00",
        "2021-06-02T08:30:00",
        "2021-06-02T16:30:00",
        1,
        2
    ),
    new Shift(
        "3-2021-06-03T08:30:00",
        "2021-06-03T08:30:00",
        "2021-06-03T16:30:00",
        1,
        3
    ),
];
const _departments = [
    new Department(
        1,
        "Oslo - Majorstuen",
        "Majagata 17, 3232 Oslo",
        "06:00 - 23:00",
        "10:00 - 03:00",
        "+47 303030",
        "post@gylnepizza.no",
        "majorstuen.png"
    ),
    new Department(
        2,
        "Oslo - Storo",
        "GSV 666, 4825 Oslo",
        "06:00 - 23:00",
        "10:00 - 03:00",
        "+47 404040",
        "post@gylnepizza.no",
        "storo.png"
    ),
    new Department(
        3,
        "Oslo - Skippergata",
        "Skippergata, 1111 Oslo",
        "06:00 - 23:00",
        "10:00 - 03:00",
        "+47 505050",
        "post@gylnepizza.no",
        "skippergata.png"
    ),
    new Department(
        4,
        "Oslo - Ensjø",
        "Ensjøveien 33, 9292 Oslo",
        "06:00 - 23:00",
        "10:00 - 03:00",
        "+47 606060",
        "post@gylnepizza.no",
        "ensjo.png"
    ),
];

const menuItems = [
    new Pizza("Margarita", "Mozarella og tomatsaus", 30, 94, 64),
    new Pizza("Hawaii", "Mozarella, tomatsaus, ananas og skinke", 40, 104, 64),
    new Pizza("Pepperoni", "Mozarella, tomatsaus og pepperoni", 35, 114, 79),
    new Pizza("Ham", "Mozarella, tomatsaus og skinke", 40, 94, 54),
    new Pizza(
        "The Tropical",
        "Mozarella, tomatsaus, osteblanding, ananas og oregano",
        45,
        128,
        83
    ),
    new Pizza(
        "Californian Dream",
        "Rømmedressing, tomatsaus, osteblanding, skinke og ruccola",
        60,
        138,
        78
    ),
    new Pizza(
        "Thai Chicken",
        "Sataysaus, paprika, rødløk, sataykylling, ananas, peanøtter og koriander",
        60,
        158,
        98
    ),
    new Pizza(
        "Green Garden",
        "Avokado, rødløk, osteblanding, cherrytomater og limezest",
        56,
        168,
        112
    ),
    new Pizza(
        "Big Shot",
        "BBQ-kylling, bacon, pepperoni, cherrytomater og oregano",
        60,
        168,
        108
    ),
    new Pizza(
        "Rio Grande",
        "Spicy tacokrydret kjøttdeig, spicy salsa, fersk paprika, lime, jalapeno og tortilla chips",
        63,
        168,
        105
    ),
    new Pizza(
        "Spicy Chicken",
        "Spicy marinert kylling, rødløk, osteblanding, jalapeno og limezest",
        50,
        168,
        118
    ),
    new Pizza(
        "Pepper Steak",
        "Marinert biffkjøtt, rødløk, paprika og oregano",
        45,
        158,
        113
    ),
];

const extraPizza = [
    new Pizza(
        "Quattro formaggi",
        "Fire typer oster - Ricotta, gorgonzola, mozarella og parmesan",
        40,
        160,
        120
    ),
    new Pizza("Diavolo", "Salami, jalapenos, ost og pizzasaus", 35, 158, 123),
    new Pizza(
        "Særingen",
        "Tomatsaus og ost toppet med skinke, ananas, agurk, mais",
        40,
        140,
        100
    ),
];

const ingredients = [
    new Ingredient("Pizzasaus", 50, 1000, 3),
    new Ingredient("Mel", 20, 1500, 2),
    new Ingredient("Olje", 5, 1000, 1),
    new Ingredient("Ost", 100, 2000, 3),
];

export function initPageSettings(user) {
    const departmentCollection = new DepartmentCollection();
    // if user's not admin, remove settings button
    if (user.adminPrivileges.length == 0)
        document.getElementById("admin-page").parentElement.remove();

    const depColl = new DepartmentCollection();
    document.getElementById("avdelinger").innerHTML += user.departmentID.map(
        (e) => {
            const dep = depColl.filterDepartmentsById(e);
            return `<option value="${dep.id}">${dep.name}</option>`;
        }
    );
    // sette profilbilde i thumbnail
    document.getElementById("employee-thumbnail").src = user.pictureUrl;

    // Legger inn info i sidemenyen.. flytte et annet sted etterhvert
    document.querySelector(".profile-name").innerHTML =
        user.firstName + " " + user.lastName;
}
export function saveIngredients() {
    localStorage.setItem("ingredients", JSON.stringify(ingredients));
}

export function saveEmployees() {
    if (localStorage.getItem("employees")) return;
    localStorage.setItem("employees", JSON.stringify(employees));
    window.location.reload();
}

export function saveDepartments() {
    localStorage.setItem("departments", JSON.stringify(_departments));
}

export function savePizzas() {
    localStorage.setItem("pizzas", JSON.stringify(menuItems));
}

export function saveExtraPizza() {
    localStorage.setItem("extra-pizzas", JSON.stringify(extraPizza));
}

export function saveShifts() {
    if (localStorage.getItem("shifts")) return;
    localStorage.setItem("shifts", JSON.stringify(shifts));
    window.location.reload();
}
function setActiveElement(el) {
    Array.from(document.querySelectorAll(".nav-list a")).forEach((button) => {
        if (button.classList.contains("is-active")) {
            button.classList.toggle("is-active");
        }
        console.log(el);
        el.classList.toggle("is-active");
    });
}
export function addEventListeners(state) {
    // Event handler for links
    document.getElementById("log-out").onclick = () => {
        localStorage.removeItem("user");
        window.location.href = "/landingpage.html";
    };
    const pageTitleElement = document.getElementById("page-title");
    document.getElementById("profile-link").onclick = (el) => {
        pageTitleElement.innerHTML = "Min Side";
        profile.init(state).render();
        setActiveElement(el.target);
    };
    document.getElementById("shift-link").onclick = (el) => {
        shiftOverview.init(state);
        pageTitleElement.innerHTML = "Skift";
        document.getElementById("avdelinger").disabled = false;
        setActiveElement(el.target);
    };
    document.getElementById("department-link").onclick = (el) => {
        pageTitleElement.innerHTML = "Avdelinger";
        document.getElementById("avdelinger").disabled = false;
        departments.init();
        setActiveElement(el.target);
    };
    document.getElementById("sales-link").onclick = (el) => {
        salesInfo.init();
        pageTitleElement.innerHTML = "Omsetning";
        document.getElementById("avdelinger").disabled = false;
        setActiveElement(el.target);
    };
    document.getElementById("menu-link").onclick = (el) => {
        menu.init();
        pageTitleElement.innerHTML = "Meny";
        document.getElementById("avdelinger").disabled = false;
        setActiveElement(el.target);
    };
    document.getElementById("storage-link").onclick = (el) => {
        storageOverview.init();
        pageTitleElement.innerHTML = "Vareoversikt";
        document.getElementById("avdelinger").disabled = false;
        setActiveElement(el.target);
    };
    document.getElementById("admin-page").onclick = (el) => {
        admin.init(state);
        pageTitleElement.innerHTML = "Innstillinger";
        setActiveElement(el.target);
    };
}
