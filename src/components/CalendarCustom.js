import React, {useState, useEffect} from 'react';
import {Calendar, momentLocalizer} from 'react-big-calendar'
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop'

import moment from 'moment';
import uuid from 'uuid';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css'
import '../styles/CalendarCustom.css';

const DragAndDropCalendar = withDragAndDrop(Calendar);
const localizer = momentLocalizer(moment);
localizer.formats.timeGutterFormat = 'H:mm';

export const CalendarCustom = (props) => {
    const [events, setEvents] = useState([]);
    const [time, setTime] = useState(moment().format('H:mm'));

    useEffect(() => {
        setInterval(() =>
                setTime(moment().format('H:mm')),
            1000 * 60);
    }, []);

    const handleSelectEvent = (event) => {
        console.log(events);
        const title = window.prompt('Edit event\'s name:');
        if(title){
            const updatedEvents = [...events].map(existingEvent => {
                return existingEvent.id === event.id ? {
                    ...existingEvent,
                    title: "<b>" + title + "</b>" + '\ndescription'
                } : existingEvent
            });
            setEvents(updatedEvents)
        }
    };

    const handleSelectSlot = ({start, end}) => {
        const id = uuid();
        const title = window.prompt('Enter a new event\'s name:');
        if(title){
            setEvents([...events, {id, start, end, title}])
        }
    };

    const handleChange = ({event, start, end, id}) => {
        console.log(events);
        const updatedEvents = [...events].map(existingEvent => {
            return existingEvent.id === event.id ? {...existingEvent, start, end} : existingEvent
        });
        setEvents(updatedEvents)
    };

    return (
        <div className="container p-0 position-relative">
            <div className="h6 text-white position-absolute ml-2 mt-1"> {time}</div>
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
                onEventResize={handleChange}
                onSelectEvent={handleSelectEvent}
                onEventDrop={handleChange}
                onSelectSlot={handleSelectSlot}
                defaultDate={new Date()}
            />
        </div>
    );
};