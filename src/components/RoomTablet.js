import React, { useState, useEffect } from 'react';
import {ClockCustom} from "./ClockCustom";
import {CalendarCustom} from "./CalendarCustom";
import "../styles/RoomTablet.css"

export const RoomTablet = (props) => {
    const [date, setDate] = useState();

    useEffect(() => {
    }, []);

    return (
        <div className="bg-dark border-danger p-5 room">
            <CalendarCustom roomName={props.roomName}/>
        </div>
    );
};