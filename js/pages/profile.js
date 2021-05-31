import MakeTile from "/js/modules/MakeTile.js";
import makeCalendar from "/js/modules/makeCalendar.js";
import ShiftCollection from "/js/classes/ShiftCollection.js";
import DepartmentCollection from "/js/classes/DepartmentCollection.js";

const profile = (() => {
    const shiftCollection = new ShiftCollection();
    const shifts = shiftCollection.fetchShifts();
    const departmentCollection = new DepartmentCollection();
    // The container in the index-file
    const mainElement = document.getElementById("main");

    const calendarOptions = {
        defaultView: "month",
        scheduleView: true, // Can be also ['allday', 'time']
        template: {
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
                return '<label><input type="checkbox" />Task</label>';
            },
            allday: function (schedule) {
                return schedule.title + ' <i class="fa fa-refresh"></i>';
            },
            alldayTitle: function () {
                return "All Day";
            },
            time: function (schedule) {
                const departmentId = shiftCollection.getShiftById(
                    schedule.id
                ).departmentID;
                const departmentName =
                    departmentCollection.filterDepartmentsById(departmentId)
                        ? departmentCollection.filterDepartmentsById(
                              departmentId
                          ).name
                        : "";
                return (
                    '<div class="calendar-mark" >' +
                    new Date(schedule.start).getHours() +
                    " - " +
                    new Date(schedule.end).getHours() +
                    "</div>" +
                    '<span title="' +
                    departmentName +
                    '" class="department-name">' +
                    departmentName +
                    "</span>"
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
    function generateScaffold(userObject) {
        mainElement.innerHTML = `
            <div id="outer-shift-container" class="column is-9">
                <div class="columns is-multiline">
                    <div class="column is-12 cards-container">
                        <div class="columns is-multiline" id="work-info"></div>
                    </div>
                    <div class="column is-12" id="outer-calendar">
                        <div id="calendar-menu">
                            <button id="prev-btn" class="button is-info is-outlined nav-button">Forrige</button>
                            <button id="today-btn" class="button is-info is-outlined nav-button">I dag</button>
                            <button id="next-btn" class="button is-info is-outlined nav-button">Neste</button>
                            <span id="render-range" class="render-range"></span>
                        </div>
                        <div class="container" id="calendar"></div>
                    </div>
                </div>
            </div>
            <div id="profile-info" class="column is-3 is-vcentered">
                <div class="card">
                    <div class="card-image">
                        <figure class="image is-3by3">
                            <img
                                src="${userObject.pictureUrl}"
                                alt="Placeholder image"
                            />
                        </figure>
                    </div>
                    <div class="card-content">
                        <div class="media">
                            <div class="media-content">
                                <p class="title is-4">
                                    ${
                                        userObject.firstName +
                                        " " +
                                        userObject.lastName
                                    }
                                </p>
                                <p class="subtitle is-6">${userObject.role}</p>
                            </div>
                        </div>
                        <div class="content">
                            <p class="italic"">Fødselsdato:<br />${new Date(
                                userObject.birthDate
                            ).toLocaleString("nb-NO", {
                                weekday: "long",
                                month: "long",
                                day: "numeric",
                                year: "numeric",
                            })}</p>
                            <p class="italic">Telefon:<br />${
                                userObject.phoneNumber
                            }</p>
                            <p class="italic">E-post: <br />${
                                userObject.username
                            }</p>
                            <p class="italic">Adresse:<br />${
                                userObject.address
                            }</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
    const init = (state) => {
        const userObject = state.loggedInUser;
        generateScaffold(userObject);
        document.getElementById("avdelinger").disabled = true;

        // Get the shifts from logged in user, and format them for
        // further use in the calendar. Should probably move this
        const schedules = [];

        shifts
            .filter((s) => s.employeeID === userObject.id)
            .forEach((shift) => {
                schedules.push({
                    id: shift.id,
                    calendarId: "1",
                    title: userObject.firstName + " " + userObject.lastName,
                    category: "time",
                    dueDateClass: "",
                    body: "test",
                    start: shift.start,
                    end: shift.end,
                });
            });
        // Gets the object reference to the calendar back from the
        // function-call. Might get usefull
        const calendar = makeCalendar(
            document.getElementById("calendar"),
            calendarOptions,
            schedules
        );

        document.getElementById("prev-btn").onclick = () => {
            calendar.prev();
            document.getElementById("render-range").innerHTML = new Date(
                calendar.getDate()
            ).toLocaleString("nb-NO", { month: "long" });
        };
        document.getElementById("next-btn").onclick = () => {
            calendar.next();
            document.getElementById("render-range").innerHTML = new Date(
                calendar.getDate()
            ).toLocaleString("nb-NO", { month: "long" });
        };
        document.getElementById("render-range").innerHTML = new Date(
            calendar.getDate()
        ).toLocaleString("nb-NO", { month: "long" });
        document.getElementById("today-btn").onclick = () => {
            calendar.today();
            document.getElementById("render-range").innerHTML = new Date(
                calendar.getDate()
            ).toLocaleString("nb-NO", { month: "long" });
        };

        // Legg til tiles
        const makeTile = new MakeTile("work-info");
        const nextShift = shiftCollection.getNextShiftByUserId(userObject.id);
        const hoursWorked = shiftCollection.getHoursWorkedByUserId(
            userObject.id
        );
        const today = new Date();
        const previousMonth = new Date();
        previousMonth.setMonth(today.getMonth() - 1);
        const lastPaycheck = today.getDate() >= 15 ? today : previousMonth;
        lastPaycheck.setDate(15);
        makeTile.apply(
            '<i class="bx bxs-calendar card-icon" ></i>',
            "Neste vakt",
            nextShift != null
                ? nextShift.toLocaleString("nb-NO", {
                      weekday: "long",
                      month: "long",
                      day: "numeric",
                  })
                : "Ingen vakt satt opp",
            "is-4"
        );
        makeTile.apply(
            '<i class="bx bxs-time-five card-icon" ></i>',
            "Timer jobbet",
            hoursWorked,
            "is-4"
        );
        makeTile.apply(
            '<i class="bx bxs-dollar-circle card-icon" ></i>',
            "Siste lønnsslipp",
            lastPaycheck.toLocaleString("nb-NO", {
                weekday: "long",
                day: "numeric",
                month: "long",
            }),
            "is-4"
        );
        return calendar;
    };
    return { init };
})();

export default profile;
