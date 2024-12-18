import React, { useState, useEffect } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar'
import moment from 'moment'
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import "react-big-calendar/lib/css/react-big-calendar.css";
import getAllEvents from './getAllEvents';


const CalendarComponent = ({ employeeId, key }) => {

    const [events, setEvents] = useState([]);
    // const localizer = momentLocalizer(moment);
    const locales = {
        "ru": require("date-fns/locale/ru")
    };

    const localizer = dateFnsLocalizer({
        format,
        parse,
        startOfWeek,
        getDay,
        locales
    });

    useEffect(() => {
        const fetchEvents = async () => {
            const fetchedEvents = await getAllEvents(employeeId);
            setEvents(fetchedEvents);
        };
        fetchEvents();
    }, [employeeId]);

    return (
        <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 500 }}
            defaultView="month"
            formats={{
                dayFormat: 'ddd D',
                dayRangeHeaderFormat: 'MMMM YYYY'
            }}
            eventPropGetter={event => ({
                style: {
                    backgroundColor: getBackgroundColor(event),
                    color: getColor(event),
                    fontSize: "16px"
                },
            })}
        />
    );
}

const getBackgroundColor = (event) => {
    switch (event.type) {
        case 'sickLeave':
            return 'blue';
        case 'dayOff':
            return 'red';
        case 'vacation':
            return 'green';
        default:
            return 'gray'; // Цвет по умолчанию
    }
};

const getColor = (event) => {
    switch (event.type) {
        case 'sickLeave':
            return 'white';
        case 'dayOff':
            return 'white';
        case 'vacation':
            return 'white';
        default:
            return 'black'; // Цвет по умолчанию
    }
};

export default CalendarComponent;
