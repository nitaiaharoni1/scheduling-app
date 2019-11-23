import React, {useState, useEffect} from 'react';
import {ClockCustom} from "./ClockCustom";
import {CalendarCustom} from "./CalendarCustom";
import "../styles/RoomTablet.css"
import uuid from "uuid";
import moment from "moment";

export const RoomTablet = (props) => {
    const [display, setDisplay] = useState(false);
    const [events, setEvents] = useState([]);
    const [time, setTime] = useState(moment());
    const [occupied, setOccupied] = useState(false);
    const [nearestTime, setNearestTime] = useState(null);

    useEffect(() => {
        isOccupied();
        getNearestTime();
    }, [events]);

    useEffect(() => {
        setInterval(() => {
            setTime(moment());
        }, 1000 * 60);
    }, []);

    const isOccupied = () => {
        let isOccupied = events.some(event =>
            time.isBetween(event.start, event.end)
        );
        setOccupied(isOccupied)
    };

    const getNearestTime = () => {
        let nearestArr = [];
        for(let event of events){
            if(time.isBefore(event.start)){
                nearestArr.push(event.start)
            }
            if(time.isBefore(event.end)){
                nearestArr.push(event.end)
            }
        }
        nearestArr.sort((first, second) => {
            return moment(first).isAfter(moment(second)) ? 1 : -1;
        });
        if(nearestArr.length > 0){
            setNearestTime(nearestArr[0])
        }
    };

    const handleMouseEnter = () => {
        setDisplay(true)
    };

    const handleMouseLeave = () => {
        setDisplay(false)
    };

    const handleSelectEvent = (event) => {
        console.log(events);
        const title = window.prompt('Edit event\'s name:');
        if(title){
            const updatedEvents = [...events].map(existingEvent => {
                return existingEvent.id === event.id ? {...existingEvent, title} : existingEvent
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

    const handleChange = ({event, start, end}) => {
        console.log(JSON.stringify(events));
        console.log(JSON.stringify(time));
        const updatedEvents = [...events].map(existingEvent => {
            return existingEvent.id === event.id ? {...existingEvent, start, end} : existingEvent
        });
        setEvents(updatedEvents)
    };

    return (
        <div className={"bg-dark p-5 room " + (occupied ? "border-danger" : "border-success")}
             style={{width: "25vw", height: "25vw"}}
             onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            {display ?
                <CalendarCustom time={time} roomName={props.roomName} onChange={handleChange}
                                onSelectSlot={handleSelectSlot}
                                onSelectEvent={handleSelectEvent} events={events}/>
                :
                <ClockCustom occupied={occupied} roomName={props.roomName} nearestTime={nearestTime} time={time}/>
            }
        </div>
    );
};