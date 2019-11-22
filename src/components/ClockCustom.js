import React, { useState, useEffect } from 'react';
import Clock from 'react-clock'
import "../styles/ClockCustom.css"

export const ClockCustom = (props) => {
    const [date, setDate] = useState(new Date());

    useEffect(() => {
        setInterval(() =>
                setDate(new Date()),
            1000);
    }, []);

    return (
        <>
            <div className="h5 text-center text-white pb-3 m-0"> {props.roomName} </div>
            <Clock size={200} value={date} minuteHandLength={90} minuteHandOppositeLength={0} hourHandOppositeLength={0} secondHandOppositeLength={0} minuteHandWidth={9} hourHandWidth={9} hourMarksLength={6} renderMinuteMarks={false} className="clock m-auto py-4"/>
            <hr className="bg-white"/>
            <div className="h5 text-danger"> Free for 4 hours </div>
        </>
    );
};