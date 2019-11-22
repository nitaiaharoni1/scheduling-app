import React, {useState, useEffect} from 'react';
import {Calendar, momentLocalizer} from 'react-big-calendar'
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop'

import moment from 'moment';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css'

import '../styles/CalendarCustom1.css';

export const CalendarCustom = (props) => {
    const [events, setEvents] = useState([]);
    const [time, setTime] = useState(moment().format('H:mm'));

    const localizer = momentLocalizer(moment);
    localizer.formats.timeGutterFormat = 'H:mm';
    const btnStyle = {
        "border-radius": "50%",
        "opacity": "50%",
        "padding-left": "10px",
        "padding-right": "10px"
    };

    useEffect(() => {
        setInterval(() =>
                setTime(moment().format('H:mm')),
            1000 * 60);
    }, []);

    const handleSelect = ({start, end}) => {
        const title = window.prompt('New Event name');
        if (title){
            setEvents([...events, {start, end, title}])
        }
    };

    return (
        <div className="container p-0 position-relative">
            <div className="h6 text-white position-absolute ml-2 mt-1"> {time}</div>
            <div className="d-flex justify-content-center">
                <button type="button" className="btn btn-outline-light btn-sm mr-2" style={btnStyle}>
                    <i className="fas fa-chevron-left fa-sm"></i>
                </button>
                <div className="h6 text-white text-muted my-auto font-weight-bold">{props.roomName}</div>
                <button type="button" className="btn btn-outline-light btn-sm ml-2" style={btnStyle}>
                    <i className="fas fa-chevron-right fa-sm"></i>
                </button>
            </div>
            <Calendar
                selectable
                localizer={localizer}
                events={events}
                views={['day']}
                defaultView="day"
                style={{height: 300}}
                timeslots={2}
                step={30}
                onSelectEvent={event => alert(event.title)}
                onSelectSlot={handleSelect}
            />
        </div>
    );
};