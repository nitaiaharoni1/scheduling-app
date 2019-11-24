import React, { useState, useEffect } from 'react';
import { RoomTablet } from "../RoomTablet"
import { NavBar } from "../NavBar";

export const RoomsPage = () => {
    const rooms = ["Alpha"/*, "Bravo", "Charlie"*/];

    return (
        <>
            <NavBar/>
            <div className="row d-flex justify-content-around m-5">
                {rooms.map(room =>
                    <div className="col d-flex justify-content-center">
                        <RoomTablet roomName={room}/>
                    </div>
                )}
            </div>
        </>
    );
};