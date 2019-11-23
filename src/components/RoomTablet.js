import React, {useState, useEffect} from 'react';
import {ClockCustom} from "./ClockCustom";
import {CalendarCustom} from "./CalendarCustom";
import "../styles/RoomTablet.css"

export const RoomTablet = (props) => {
    const [display, setDisplay] = useState("clock");

    useEffect(() => {
    }, []);

    return (
        <div className="bg-dark border-danger p-5 room">
            {display === "clock" ? <ClockCustom roomName={props.roomName}/> :
                <CalendarCustom roomName={props.roomName}/>}
        </div>
    );
};