import React from 'react';
import { RoomTablet } from "../components/RoomTablet"

const size = window.innerWidth / 3.5;

export const RoomsPage = (props) => {

    return (
        <div className="row d-flex justify-content-around mt-5">
            {props.rooms.map(room =>
                <div key={room} className="col-4 d-flex justify-content-center">
                    <RoomTablet size={size} userData={props.userData} organization={props.organization} room={room}/>
                </div>
            )}
        </div>
    );
};