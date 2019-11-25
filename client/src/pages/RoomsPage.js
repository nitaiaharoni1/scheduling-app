import React, { useState, useEffect } from 'react';
import { RoomTablet } from "../components/RoomTablet"

export const RoomsPage = (props) => {
    console.log(props.rooms);

    return (
        <>
            <div className="row d-flex justify-content-around m-5">
                {props.rooms.map(room =>
                    <div className="col d-flex justify-content-center">
                        <RoomTablet roomName={room}/>
                    </div>
                )}
            </div>
        </>
    );
};