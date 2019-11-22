import React, { useState, useEffect } from 'react';
import { RoomTablet } from "../RoomTablet"

export const RoomsPage = (props) => {
    const [state, setState] = useState(null);

    useEffect(() => {
        // Update useEffect
    }, []);

    return (
        <div className="container my-5">
            <div className="row d-flex justify-content-around">
                <div className="col">
                    <RoomTablet roomName="Alpha"/>
                </div>
                <div className="col">
                    <RoomTablet roomName="Beta"/>

                </div>
                <div className="col">
                    <RoomTablet roomName="Charlie"/>
                </div>
            </div>
        </div>
    );
};