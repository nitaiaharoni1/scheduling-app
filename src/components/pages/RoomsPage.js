import React, { useState, useEffect } from 'react';
import { RoomTablet } from "../RoomTablet"

export const RoomsPage = (props) => {
    const [state, setState] = useState(null);

    useEffect(() => {
        // Update useEffect
    }, []);

    return (
            <div className="row d-flex justify-content-around m-5">
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
    );
};