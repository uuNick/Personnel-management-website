import React, { useState, useEffect, useRef } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import "react-big-calendar/lib/css/react-big-calendar.css";
import getAllEvents from './getAllEvents';
import html2canvas from 'html2canvas';
import { Box, Button } from '@mui/material';


const CalendarComponent = ({ employeeId }) => {

    const [events, setEvents] = useState([]);
    const localizer = momentLocalizer(moment);
    const [calendarDate, setCalendarDate] = useState(moment().startOf('month')); // Состояние для текущего месяца
    const calendarRef = useRef(null);

    useEffect(() => {
        const fetchEvents = async () => {
            const fetchedEvents = await getAllEvents(employeeId);
            setEvents(fetchedEvents);
        };
        fetchEvents();
    }, [employeeId]);

    const handleMonthChange = (date) => {
        setCalendarDate(moment(date));
    };

    const captureCalendar = async () => {
        if (calendarRef.current) {
            const canvas = await html2canvas(calendarRef.current);
            const imgData = canvas.toDataURL('image/png');

            const month = calendarDate.format('MMMM');
            const year = calendarDate.year();
            const filename = `calendar_${month}_${year}_${employeeId}.png`;

            const link = document.createElement('a');
            link.href = imgData;
            link.download = filename;
            link.click();
        } else {
            console.error("Calendar element not found");
        }
    };


    return (
        <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column'
        }}>
            <div ref={calendarRef}>
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
                    onNavigate={handleMonthChange}
                    eventPropGetter={event => ({
                        style: {
                            backgroundColor: getBackgroundColor(event),
                            color: getColor(event),
                            fontSize: "16px"
                        },
                    })}
                />
            </div>
            <Button sx={{ margin: "20px auto" }} color="primary.contrastText" onClick={captureCalendar}>Сделать снимок</Button>
        </Box>
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
