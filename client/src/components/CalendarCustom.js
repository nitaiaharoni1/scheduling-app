import React from 'react';
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
    const parsedEvents = events.map(event => {
        return {id: event.id, title: event.title, start: moment(event.start)._d, end: moment(event.end)._d}
    });

    return (
        <div className="container p-0 position-relative">
            <div className="h5 text-white position-absolute font-weight-bold"> {props.time.format('H:mm')}</div>
            <div className="d-flex justify-content-center">
                <div className="h5 text-white my-auto font-weight-bold">{props.room}</div>
            </div>
            <DragAndDropCalendar
                selectable
                resizable
                localizer={localizer}
                events={parsedEvents}
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