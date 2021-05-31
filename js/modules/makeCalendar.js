const makeCalendar = (element, options, schedules) => {
    const calendar = new tui.Calendar(element, options);
    calendar.clear();
    calendar.createSchedules(schedules);
    return calendar;
};

export default makeCalendar;
