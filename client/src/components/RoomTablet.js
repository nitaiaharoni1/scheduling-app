import React, {useState, useEffect} from 'react';
import {ClockCustom} from "./ClockCustom";
import {CalendarCustom} from "./CalendarCustom";
import "../styles/RoomTablet.css"
import uuid from "uuid";
import moment from "moment";
import {getEventsApi, postEventsApi} from "../apis/rooms_api";

export const RoomTablet = (props) => {
    const [isMouseInside, setIsMouseInside] = useState(false);
    const [events, setEvents] = useState(false);
    const [time, setTime] = useState(moment());
    const [occupied, setOccupied] = useState(false);
    const [nearestTime, setNearestTime] = useState(null);


    useEffect(async () => {
        setInterval(() => {
            setTime(moment());
        }, 1000 * 60);
        const fetchedEvents = await getEvents();
        if (fetchedEvents) {
            setEvents(fetchedEvents);
        }
    }, []);

    useEffect(() => {
        isOccupied();
        getNearestTime();
    }, [events]);

    const getEvents = async () => {
        return await getEventsApi(props.organization, props.room);
    };

    const postEvents = (updatedEvents) => {
        postEventsApi(props.organization, props.room, updatedEvents);
    };

    const isOccupied = () => {
        if (events) {
            let isOccupied = events.some(event =>
                time.isBetween(event.start, event.end)
            );
            setOccupied(isOccupied)
        }
    };

    const getNearestTime = () => {
        if (events) {
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
            if (nearestArr.length > 0) {
                setNearestTime(nearestArr[0])
            }
        }
    };

    const handleMouseEnter = () => {
        setIsMouseInside(true)
    };

    const handleMouseLeave = () => {
        setIsMouseInside(false)
    };

    const handleSelectEvent = async (event) => {
        const fetchedEvents = await getEvents();
        const title = window.prompt('Edit event\'s name:');
        if (title) {
            const updatedEvents = [...fetchedEvents].map(existingEvent => {
                return existingEvent.id === event.id ? {...existingEvent, title} : existingEvent
            });
            setEvents(updatedEvents);
            postEvents(updatedEvents);
        }
    };

    const handleSelectSlot = async ({start, end}) => {
        const fetchedEvents = await getEvents();
        const id = uuid();
        const title = window.prompt('Enter a new event\'s name:');
        if (title) {
            const updatedEvents = [...fetchedEvents, {id, start, end, title}];
            setEvents(updatedEvents);
            postEvents(updatedEvents);
        }
    };

    const handleChange = async ({event, start, end}) => {
        const fetchedEvents = await getEvents();
        const updatedEvents = [...fetchedEvents].map(existingEvent => {
            return existingEvent.id === event.id ? {...existingEvent, start, end} : existingEvent
        });
        setEvents(updatedEvents);
        postEvents(updatedEvents);
    };

    let screen;
    if (isMouseInside) {
        screen =
            (<CalendarCustom
                time={time}
                room={props.room}
                onChange={handleChange}
                onSelectSlot={handleSelectSlot}
                onSelectEvent={handleSelectEvent}
                events={events}/>)
    } else {
        screen = (<ClockCustom
            occupied={occupied}
            room={props.room}
            nearestTime={nearestTime}
            time={time}/>)
    }

    return (
        <>
            {events && (
                <div className={"bg-dark p-5 room " + (occupied ? "border-danger" : "border-success")}
                     style={{width: "25vw", height: "25vw"}}
                     onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                    {screen}
                </div>
            )}
        </>
    );
};