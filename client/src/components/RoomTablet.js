import React, {useState, useEffect} from 'react';
import {ClockCustom} from "./ClockCustom";
import {CalendarCustom} from "./CalendarCustom";
import "../styles/RoomTablet.css"
import uuid from "uuid";
import moment from "moment";
import {getEventsApi, putEventApi, postEventApi} from "../apis/events_api";

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
            getNearestTime();
        }
    }, [time]);

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

    const putEvent = async (event) => {
        const newEvents = await putEventApi(props.organization, props.room, event);
        if (newEvents) {
            setEvents(newEvents);
        }
    };


    const isOccupied = () => {
        let isOccupied = events.some(event =>
            time.isBetween(event.start, event.end)
        );
        setOccupied(isOccupied);
        return isOccupied;
    };

    const getNearestTime = () => {
        const occupiedStatus = isOccupied();
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
            while (nearestArr.length > 1) {
                if (moment(nearestArr[0]).isSame(nearestArr[1])) {
                    nearestArr.shift();
                    nearestArr.shift();
                }
            }
        }
        if (nearestArr.length > 0) {
            setNearestTime(nearestArr[0])
        }
    };

    const handleMouseEnter = () => {
        setIsMouseInside(true)
    };

    const handleMouseLeave = () => {
        setIsMouseInside(false)
    };

    const handleSelectEvent = async (event, e) => {
        const description = window.prompt('Edit event\'s name:');
        if (description) {
            const title = `${props.userData.firstName} ${props.userData.lastName}:\n${description}`;
            putEvent({...event, title});
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

    const handleChange = async ({event, start, end}) => {
        putEvent({...event, start, end});
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