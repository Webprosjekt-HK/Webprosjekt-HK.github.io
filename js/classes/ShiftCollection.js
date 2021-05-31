export default class ShiftCollection {
    fetchShifts = () => {
        return JSON.parse(localStorage.getItem("shifts"));
    };
    addShift = (shift) => {
        const shifts = this.fetchShifts();

        for (let i = 0; i < shifts.length; i++) {
            if (shifts[i].id === shift.id) {
                return { status: "Shift already exists", code: 400 };
            }
        }

        shifts.push(shift);
        localStorage.setItem("shifts", JSON.stringify(shifts));
        return { status: "Shift added", code: 200 };
    };
    getShiftById = (shiftID) =>
        this.fetchShifts().find((e) => e.id === shiftID);

    // returns the index of the removed item. If none is found returns -1
    removeShift = (shiftID) => {
        let shiftIndex = -1;
        let shifts = this.fetchShifts();
        for (let i = 0; i < shifts.length; i++) {
            if (shifts[i].id === shiftID) {
                shiftIndex = i;
                shifts.splice(i, 1);
                break;
            }
        }
        console.log("shifts:");
        console.log(shifts);
        localStorage.setItem("shifts", JSON.stringify(shifts));
        return shiftIndex;
    };
    // Returns all shifts that matches the employee's ID.
    filterShiftsEmployeeID = (employeeID) => {
        return this.fetchShifts().filter((el) => el.employeeID === employeeID);
    };
    // Returns index of the updated item. -1 if there wasn't a matching item to update.
    updateShift = (shift) => {
        const shifts = this.fetchShifts();
        for (let i = 0; i < shifts.length; i++) {
            if (shift.id == shifts[i].id) {
                shifts.splice(i, 1, shift);
                localStorage.setItem("shifts", JSON.stringify(shifts));
                return i;
            }
        }
        return -1;
    };
    getNextShiftByUserId = (userId) => {
        const shifts = this.filterShiftsEmployeeID(userId).filter((d) => {
            const today = new Date();

            if (new Date(d.start) >= today) return d;
        });
        if (shifts.length > 0) {
            let lowestDate = new Date(shifts[0].start);

            for (let i = 1; i < shifts.length; i++) {
                if (new Date(shifts[i].start) < lowestDate)
                    lowestDate = new Date(shifts[i].start);
            }

            return lowestDate;
        } else return null;
    };
    getHoursWorkedByUserId = (userId) => {
        const today = new Date();
        const shiftsThisMonth = this.filterShiftsEmployeeID(userId).filter(
            (d) => {
                const shiftDate = new Date(d.start);
                if (
                    today.getFullYear() === shiftDate.getFullYear() &&
                    today.getMonth() === shiftDate.getMonth() &&
                    today.getDate() >= shiftDate.getDate()
                )
                    return d;
            }
        );

        let sumHours = 0;

        for (let i = 0; i < shiftsThisMonth.length; i++) {
            const currentShift = shiftsThisMonth[i];
            sumHours +=
                new Date(currentShift.end) - new Date(currentShift.start);
        }
        return sumHours / 3600000;
    };
}
