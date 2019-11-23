import React, {useState, useEffect} from 'react';
import Clock from 'react-clock'
import "../styles/ClockCustom.css"
import moment from "moment";

export const ClockCustom = (props) => {
    const [date, setDate] = useState(new Date());
    const [msg, setMsg] = useState("");

    useEffect(() => {
        setInterval(() =>
                setDate(new Date()),
            1000);
    }, []);

    useEffect(() => {
        getMsg();
    }, [props.occupied, props.nearestTime,props.time]);

    const getMsg = () => {
        let text;
        let timeMsg;
        if(props.nearestTime){
            let timeDiff = moment(props.nearestTime).diff(moment(props.time), 'hours');
            if(timeDiff){
                timeMsg = `${timeDiff} hours`
            } else{
                timeDiff = moment(props.nearestTime).diff(moment(props.time), 'minutes');
                timeMsg = `${timeDiff} minutes`
            }
            if(props.occupied){
                text = `Free in ${timeMsg}`
            } else{
                text = `Free for ${timeMsg}`
            }
            return setMsg(text);
        }
        return setMsg('Free for all day')
    };

    return (
        <div className="d-flex flex-column h-100 w-100">
            <div className="h5 text-white text-center pb-4 mb-2 m-0 font-weight-bold"> {props.roomName} </div>
            <Clock value={date}
                   minuteHandLength={90}
                   minuteHandOppositeLength={0}
                   hourHandOppositeLength={0}
                   secondHandOppositeLength={0}
                   minuteHandWidth={9}
                   hourHandWidth={9}
                   hourMarksLength={6}
                   renderMinuteMarks={false}
                   renderNumbers={true}
                   className={"m-auto py-4 " + (props.occupied ? "clock-red" : "clock-green")}/>
            <hr className="bg-white mt-5 mb-1 mx-0"/>
            <div className={"h5 mb-0 " + (props.occupied ? "text-danger" : "text-success")}> {msg}</div>
        </div>
    );
};