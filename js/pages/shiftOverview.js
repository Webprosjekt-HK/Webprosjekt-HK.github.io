import makeCalendar from "/js/modules/makeCalendar.js";
import EmployeeCollection from "/js/classes/EmployeeCollection.js";
import ShiftCollection from "/js/classes/ShiftCollection.js";
import Shift from "/js/classes/Shift.js";
import DepartmentCollection from "/js/classes/DepartmentCollection.js";

const shiftOverview = ((state) => {
    const shiftCollection = new ShiftCollection();
    const employeeCollection = new EmployeeCollection();
    const departmentCollection = new DepartmentCollection();

    const calendarOption = {
        defaultView: "week",
        taskView: ["task"],
        useCreationPopup: false,
        useDetailPopup: false,
        template: {
            timegridDisplayPrimaryTime: function (time) {
                const hour =
                    parseInt(time.hour) > 9 ? time.hour : "0" + time.hour;
                const minutes =
                    parseInt(time.minutes) > 9
                        ? time.minutes
                        : "0" + time.minutes;
                return hour + ":" + minutes;
            },
            timegridDisplayTime: function (time) {
                return getPadStart(time.hour) + ":" + getPadStart(time.hour);
            },
            milestone: function (schedule) {
                return (
                    '<span style="color:red;"><i class="fa fa-flag"></i> ' +
                    schedule.title +
                    "</span>"
                );
            },
            milestoneTitle: function () {
                return "Milestone";
            },
            task: function (schedule) {
                return "&nbsp;&nbsp;#" + schedule.title;
            },
            taskTitle: function () {
                return "<span>Opp- gaver</span>";
            },
            allday: function (schedule) {
                return schedule.title + ' <i class="fa fa-refresh"></i>';
            },
            alldayTitle: function () {
                return "Hel dag";
            },
            time: function (schedule) {
                return (
                    schedule.title +
                    ' <i class="fa fa-refresh"></i><br />' +
                    new Date(schedule.start).getHours() +
                    " - " +
                    new Date(schedule.end).getHours()
                );
            },
        },
        month: {
            daynames: ["Søn", "Man", "Tir", "Ons", "Tor", "Fre", "Lør"],
            startDayOfWeek: 1,
            narrowWeekend: false,
        },
        week: {
            daynames: ["Søn", "Man", "Tir", "Ons", "Tor", "Fre", "Lør"],
            startDayOfWeek: 1,
            narrowWeekend: false,
        },
    };
    const mainContainer = document.getElementById("main");
    function generateScaffold() {
        mainContainer.innerHTML = `
            <div class="container column">
                <div id="shift-menu" >
                    <div class="columns">
                        
                        <div class="column">
                            <button
                                id="prev-btn"
                                class="button is-info is-outlined"
                                data-action="move-prev"
                            >
                                Forrige
                            </button>
                            <button id="today-btn" class="button is-info is-outlined">I dag</button>
                            <button id="next-btn" class="button is-info is-outlined">Neste</button>
                        </div>
                        <div class="column">
                            <p id="shift-month"></p>
                        </div>
                        <div class="column">
                            <p id="admin-text" ></p>
                        </div>
                    </div>
                </div>
                <div id="calendar"></div>
            </div>
        `;
    }
    function generatePopupMenu(calendar, users, schedule, update) {
        const containerElement = document.createElement("div");
        containerElement.id = "popup-panel";
        const htmlContent = `
            <div class="panel">
                <div class="panel-heading">
                    <div class="block">
                        <p id="popup-header-text">Legg til vakt</p>
                        <button
                            id="popup-close"
                            aria-label="Close"
                            class="delete is-right"
                        >
                            close
                        </button>                       
                    </div>
                </div>

                <div class="panel-block">
                    <div class="control has-icons-left">
                        <div class="select">
                            <select id="select-employee">
                                ${users.map((e) => {
                                    return (
                                        '<option value="' +
                                        e.id +
                                        '">' +
                                        e.firstName +
                                        " " +
                                        e.lastName +
                                        "</option>"
                                    );
                                })}
                            </select>
                        </div>
                        
                    </div>
                </div>
                <div class="panel-block">
                    <div class="control has-icons-left">
                        <div
                            class="
                            tui-datepicker-input
                            tui-datetime-input
                            tui-has-focus
                        "
                        >
                            <input
                                type="text"
                                id="datepicker-start-target"
                                aria-label="Date-Time"
                            />
                            <span class="tui-ico-date"></span>
                        </div>
                        <div id="datepicker-start" class="control"></div>
                    </div>
                </div>
                <div class="panel-block">
                    <div class="control has-icons-left">
                        <div
                            class="
                            tui-datepicker-input
                            tui-datetime-input
                            tui-has-focus
                        "
                        >
                            <input
                                type="text"
                                id="datepicker-end-target"
                                aria-label="Date-Time"
                            />
                            <span class="tui-ico-date"></span>
                        </div>
                        <div id="datepicker-end" class="control"></div>
                    </div>
                </div>
                <div class="panel-block">
                    <div class="control has-icons-left">
                        <button id="popup-confirm" class="button is-outlined is-primary">Legg til</button>
                        <button id="delete-button" class="button is-outlined is-danger">Slett</button>
                    </div>
                </div>
            </div>
        `;
        containerElement.innerHTML = htmlContent;

        containerElement.querySelector("#popup-close").onclick = () =>
            containerElement.remove();

        const picker1 = new tui.DatePicker(
            containerElement.querySelector("#datepicker-start"),
            {
                input: {
                    element: containerElement.querySelector(
                        "#datepicker-start-target"
                    ),
                },
                timePicker: {
                    showMeridiem: false,
                    inputType: "spinBox",
                },
            }
        );

        const picker2 = new tui.DatePicker(
            containerElement.querySelector("#datepicker-end"),
            {
                input: {
                    element: containerElement.querySelector(
                        "#datepicker-end-target"
                    ),
                },
                timePicker: {
                    showMeridiem: false,
                    inputType: "spinBox",
                },
            }
        );
        const headerText = containerElement.querySelector("#popup-header-text");
        const confirmButton = containerElement.querySelector("#popup-confirm");
        const deleteButton = containerElement.querySelector("#delete-button");
        deleteButton.onclick = () => {
            calendar.deleteSchedule(schedule.schedule.id, "1");
            shiftCollection.removeShift(schedule.schedule.id);
            containerElement.remove();
        };
        let start = schedule.start;
        let end = schedule.end;
        if (update) {
            start = schedule.schedule.start;
            end = schedule.schedule.end;
            headerText.innerText = "Oppdater vakt";
            containerElement.querySelector("select").value =
                schedule.schedule.id[0];
            picker1.setDate(new Date(start));
            picker2.setDate(new Date(end));
            confirmButton.innerHTML = "Oppdater";
            confirmButton.onclick = () => {
                const newSchedule = {
                    start: picker1.getDate(),
                    end: picker2.getDate(),
                    employeeID: parseInt(
                        containerElement.querySelector("select").value
                    ),
                };
                updateSchedule(calendar, schedule.schedule.id, newSchedule);
                containerElement.remove();
            };
        } else {
            deleteButton.style.visibility = "hidden";

            confirmButton.onclick = () => {
                createSchedule(calendar, schedule, picker1, picker2);
            };
        }
        picker1.setDate(new Date(start));
        picker2.setDate(new Date(end));
        return containerElement;
    }
    function createScheduleId(employeeID, startDate) {
        return (
            employeeID +
            "-" +
            startDate.getFullYear() +
            "-" +
            (parseInt(startDate.getMonth()) + 1) +
            "-" +
            startDate.getDate() +
            "T" +
            startDate.getHours() +
            ":" +
            startDate.getMinutes() +
            ":" +
            startDate.getSeconds()
        );
    }

    function updateSchedule(calendar, oldID, schedule) {
        // Since I used the date as an ID, i dont want to use the
        // available update method. Instead I'll just delete the schedule and
        // create another one, with a fresh ID.
        const newID = createScheduleId(schedule.employeeID, schedule.start);
        const selectedDepartment = document.getElementById("avdelinger").value;
        calendar.deleteSchedule(oldID, "1");

        shiftCollection.removeShift(oldID);
        const shift = new Shift(
            newID,
            schedule.start,
            schedule.end,
            parseInt(selectedDepartment),
            parseInt(schedule.employeeID)
        );
        const userObject = employeeCollection.findEmployeeById(
            shift.employeeID
        );
        const status = shiftCollection.addShift(shift);

        calendar.createSchedules([
            {
                id: newID,
                employeeID: shift.employeeID,
                calendarId: "1",
                title: userObject.firstName + " " + userObject.lastName,
                category: "time",
                dueDateClass: "",
                body: "",
                start: shift.start.toISOString(),
                end: shift.end.toISOString(),
            },
        ]);
        calendar.render();
        document.getElementById("popup-panel").remove();
    }
    function createSchedule(calendar, schedule, startPicker, endPicker) {
        const start = new Date(startPicker.getDate());
        const end = new Date(endPicker.getDate());
        const userId = parseInt(
            document.getElementById("select-employee").value
        );
        const shiftId = createScheduleId(userId, start);
        const departmentId = document.getElementById("avdelinger").value;
        const shift = new Shift(shiftId, start, end, departmentId, userId);
        shiftCollection.addShift(shift);

        calendar.createSchedules([
            {
                id: shiftId,
                employeeID: userId,
                calendarId: "1",
                title: document.getElementById("select-employee")
                    .selectedOptions[0].text,
                category: "time",
                dueDateClass: "",
                body: "",
                start: start.toISOString(),
                end: end.toISOString(),
            },
        ]);

        document.getElementById("popup-panel").remove();
    }

    const init = (state) => {
        generateScaffold();
        const selectedDepartment = document.getElementById("avdelinger").value;
        let isAdmin =
            state.loggedInUser.adminPrivileges.indexOf(
                parseInt(selectedDepartment)
            ) !== -1
                ? true
                : false;
        if (isAdmin) {
            document.getElementById("admin-text").innerText =
                "Du er registrert som leder, og kan endre vaktlistene ved denne avdelingen";
        } else document.getElementById("admin-text").innerText = "";
        const shifts = shiftCollection.fetchShifts();
        const schedules = [];
        let selectedLocation = document.getElementById("avdelinger");
        shifts
            .filter((e) => e.departmentID == selectedLocation.value)
            .forEach((shift) => {
                const userObject = employeeCollection.findEmployeeById(
                    parseInt(shift.employeeID)
                );
                schedules.push({
                    id: shift.id,
                    employeeID: shift.employeeID,
                    calendarId: "1",
                    title: userObject.firstName + " " + userObject.lastName,
                    category: "time",
                    dueDateClass: "",
                    body: "",
                    start: shift.start,
                    end: shift.end,
                    bgColor: "#e4f2fa",
                });
            });
        calendarOption.disableClick = !isAdmin;
        calendarOption.disableDblClick = !isAdmin;

        const calendar = makeCalendar(
            document.getElementById("calendar"),
            calendarOption,
            schedules
        );
        document.getElementById("shift-month").innerHTML = new Date(
            calendar.getDate()
        ).toLocaleString("nb-NO", { month: "long" });
        selectedLocation.addEventListener("change", (e) => {
            init(state);
        });

        calendar.on({
            clickSchedule: function (e) {
                if (!isAdmin) return;
                const popupBar = generatePopupMenu(
                    calendar,
                    employeeCollection.fetchEmployees(),
                    e,
                    true
                );
                mainContainer.append(popupBar);
            },
            beforeCreateSchedule: function (e) {
                if (!isAdmin) return;

                mainContainer.append(
                    generatePopupMenu(
                        calendar,
                        employeeCollection.fetchEmployees(),
                        e,
                        false
                    )
                );
                // open a creation popup
            },
            beforeUpdateSchedule: function (e) {
                if (!isAdmin) return;
                e.schedule.start = e.start;
                e.schedule.end = e.end;
                shiftCollection.removeShift(e.schedule.id);
                const shiftId = createScheduleId(
                    e.schedule.id[0],
                    e.schedule.start
                );
                const shift = new Shift(
                    shiftId,
                    new Date(e.schedule.start),
                    new Date(e.schedule.end),
                    document.getElementById("avdelinger").value,
                    e.schedule.id[0]
                );
                shiftCollection.addShift(shift);
                calendar.updateSchedule(
                    e.schedule.id,
                    e.schedule.calendarId,
                    e.schedule
                );
            },
            beforeDeleteSchedule: function (e) {
                cal.deleteSchedule(e.schedule.id, e.schedule.calendarId);
            },
        });
        mainContainer.querySelector("#next-btn").onclick = () => {
            calendar.next();
            document.getElementById("shift-month").innerHTML = new Date(
                calendar.getDate()
            ).toLocaleString("nb-NO", { month: "long" });
        };

        mainContainer.querySelector("#prev-btn").onclick = () => {
            calendar.prev();
            document.getElementById("shift-month").innerHTML = new Date(
                calendar.getDate()
            ).toLocaleString("nb-NO", { month: "long" });
        };

        mainContainer.querySelector("#today-btn").onclick = () => {
            calendar.today();
            document.getElementById("shift-month").innerHTML = new Date(
                calendar.getDate()
            ).toLocaleString("nb-NO", { month: "long" });
        };
    };
    return { init };
})();

export default shiftOverview;
