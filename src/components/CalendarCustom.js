import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment';
import "../styles/CalendarCustom.css"
import "react-big-calendar/lib/css/react-big-calendar.css"
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';

export const CalendarCustom = (props) => {
    const [state, setState] = useState(null);
    const [date, setDate] = useState(moment().format('h:mm'));
    const localizer = momentLocalizer(moment);

    useEffect(() => {
        setInterval(() =>
                setDate(moment().format('h:mm')),
            1000 * 60);
    }, []);

    return (
        <div className="container p-1 position-relative">
            <div className="h5 text-white position-absolute"> {date}</div>
            <div className="d-flex justify-content-center">
                <button type="button" className="btn btn-outline-light rounded-pill btn-sm mr-1">
                    <i className="fas fa-chevron-left fa-lg"></i>
                </button>
                <div className="h6 text-white text-muted">{props.roomName}</div>
                <div className="h6 text-white font-weight-light ml-1">Today</div>
                <button type="button" className="btn btn-outline-light rounded-pill btn-sm ml-1">
                    <i className="fas fa-chevron-right fa-lg"></i>
                </button>
            </div>
            <hr className="bg-white"/>
            <div>
                <Calendar
                    localizer={localizer}
                    events={[]}
                    views={['day']}
                    defaultView="day"
                    style={{height: 200}}
                />
            </div>
        </div>
    );
};