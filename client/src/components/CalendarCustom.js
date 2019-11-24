import React, {useState, useEffect} from 'react';
import {Calendar, momentLocalizer} from 'react-big-calendar'
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop'

import moment from 'moment';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css'
import '../styles/CalendarCustom.css';

const DragAndDropCalendar = withDragAndDrop(Calendar);
const localizer = momentLocalizer(moment);
localizer.formats.timeGutterFormat = 'H:mm';

export const CalendarCustom = (props) => {
    const events = props.events;

    return (
        <div className="container p-0 position-relative">
            <div className="h6 text-white position-absolute ml-2 mt-1"> {props.time.format('H:mm')}</div>
            <div className="d-flex justify-content-center">
                <div className="h5 text-white my-auto font-weight-bold">{props.roomName}</div>
            </div>
            <DragAndDropCalendar
                selectable
                resizable
                localizer={localizer}
                events={events}
                views={['day']}
                defaultView="day"
                style={{height: 300}}
                timeslots={2}
                step={30}
                onEventResize={props.onChange}
                onSelectEvent={props.onSelectEvent}
                onEventDrop={props.onChange}
                onSelectSlot={props.onSelectSlot}
                defaultDate={new Date()}
            />
        </div>
    );
};