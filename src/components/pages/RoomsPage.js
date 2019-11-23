import React, {useState, useEffect} from 'react';
import {RoomTablet} from "../RoomTablet"

export const RoomsPage = () => {
    const rooms = ["Alpha", "Bravo", "Charlie"];

    return (
        <div className="row d-flex justify-content-around m-5">
            {rooms.map(room =>
                <div className="col">
                    <RoomTablet roomName={room}/>
                </div>
            )}
        </div>
    );
};