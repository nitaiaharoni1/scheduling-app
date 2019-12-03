import React, {useState, useEffect} from 'react';
import {ClockCustom} from "./ClockCustom";
import {CalendarCustom} from "./CalendarCustom";
import uuid from "uuid";
import moment from "moment";
import {getEventsApi, putEventApi, postEventApi, deleteEventApi} from "../apis/events_api";

export const RoomTablet = (props) => {
    const [isMouseInside, setIsMouseInside] = useState(false);
    const [events, setEvents] = useState(null);
    const [time, setTime] = useState(moment());
    const [occupied, setOccupied] = useState(false);
    const [nearestTime, setNearestTime] = useState(null);

    useEffect(() => {
        setInterval(() => {
            setTime(moment());
        }, 1000 * 60);
        getEvents();
    }, []);

    useEffect(() => {
        if (events) {
            const occupiedStatus = isOccupied();
            getNearestTime(occupiedStatus);
        }
    }, [time, events]);

    const handleMouseEnter = () => {
        setIsMouseInside(true)
    };

    const handleMouseLeave = () => {
        setIsMouseInside(false)
    };


    const getEvents = async () => {
        const newEvents = await getEventsApi(props.organization, props.room);
        if (newEvents) {
            setEvents(newEvents);
        }
    };

    const postEvent = async (event) => {
        const newEvents = await postEventApi(props.organization, props.room, event);
        if (newEvents) {
            setEvents(newEvents);
        }
    };

    const deleteEvent = async (event) => {
        const newEvents = await deleteEventApi(props.organization, props.room, event);
        if (newEvents) {
            setEvents(newEvents);
        }
    };

    const putEvent = async (event) => {
        const newEvents = await putEventApi(props.organization, props.room, event);
        if (newEvents) {
            setEvents(newEvents);
        }
    };

    const isOccupied = () => {
        let occupiedStatus = events.some(event =>
            time.isBetween(event.start, event.end)
        );
        setOccupied(occupiedStatus);
        return occupiedStatus;
    };

    const getNearestTime = (occupiedStatus) => {
        let nearestArr = [];
        for (let event of events) {
            if (time.isBefore(event.start)) {
                nearestArr.push(event.start)
            }
            if (time.isBefore(event.end)) {
                nearestArr.push(event.end)
            }
        }
        nearestArr.sort((first, second) => {
            return moment(first).isAfter(moment(second)) ? 1 : -1;
        });
        if (occupiedStatus) {
            while (nearestArr.length > 1 && moment(nearestArr[0]).isSame(nearestArr[1])) {
                nearestArr.shift();
                nearestArr.shift();
            }
        }
        if (nearestArr.length > 0) {
            setNearestTime(nearestArr[0])
        }
    };

    const handleSelectSlot = async ({start, end}) => {
        const id = uuid();
        const description = window.prompt('Enter a new event\'s name:');
        if (description) {
            const title = `${props.userData.firstName} ${props.userData.lastName}:\n${description}`;
            postEvent({id, start, end, title});
        }
    };

    let doubleClick1 = 0;
    const handleSelectEvent = async (event) => {
        if (doubleClick1 === 0) {
            doubleClick1 = 1;
            setTimeout(() => {
                if (doubleClick1 === 1) {
                    promptEditEvent(event);
                    doubleClick1 = 0;
                }
            }, 300);
        } else {
            promptDeleteEvent(event);
            doubleClick1 = 0;
        }
    };

    const promptEditEvent = (event) => {
        const description = window.prompt('Edit event\'s name:');
        if (description) {
            const title = `${props.userData.firstName} ${props.userData.lastName}:\n${description}`;
            putEvent({...event, title});
        }
    };

    const promptDeleteEvent = (event) => {
        const confirmation = window.confirm('Are you sure you want to delete this event?:');
        if (confirmation) {
            deleteEvent(event);
        }
    };

    const handleChange = async ({event, start, end}) => {
        putEvent({...event, start, end});
    };

    let size;
    if (props.width > 1200) {
        size = props.width * 0.85
    } else {
        size = props.width * 0.6
    }
    return (
        <div>
            {events && <div style={{width: props.width, height: props.width, "border-radius": "10%", "border": "5px solid"}}
                            onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}
                            className={"mx-auto my-3 bg-dark p-4 p-xl-5 room " + (occupied ? "border-danger" : "border-success")}>

                {isMouseInside &&
                <CalendarCustom height={props.width * 0.75} time={time} room={props.room}
                                onChange={handleChange} onSelectSlot={handleSelectSlot} onSelectEvent={handleSelectEvent} events={events}/>}

                {!isMouseInside &&
                <ClockCustom size={size} occupied={occupied} room={props.room} nearestTime={nearestTime} time={time}/>}
            </div>}
        </div>
    );
};