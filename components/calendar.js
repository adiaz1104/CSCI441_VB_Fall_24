// Initialize the calendar
document.addEventListener('DOMContentLoaded', function () {
    var calendarEl = document.getElementById('calendar');

    var calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
        },
        events: [
            { title: 'Meeting with Adam', date: '2024-10-10', user: 'adam' },
            { title: 'Project deadline', date: '2024-10-12', user: 'tara' },
            { title: 'Lunch with Jake', date: '2024-10-14', user: 'jake' },
            { title: 'Dylan\'s vacation', date: '2024-10-15', user: 'dylan' },
        ],
        eventDidMount: function (info) {
            info.el.setAttribute('data-user', info.event.extendedProps.user);
        }
    });

    calendar.render();
});

// Filter calendar events by user
function filterByUser() {
    const filterValue = document.getElementById('user-filter').value;
    const calendar = FullCalendar.getCalendar('calendar');

    calendar.getEvents().forEach(event => {
        if (filterValue === "" || event.extendedProps.user === filterValue) {
            event.setProp('display', 'auto');
        } else {
            event.setProp('display', 'none');
        }
    });
}
