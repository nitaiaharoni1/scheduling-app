import React from 'react';
import {RoomTablet} from "../components/RoomTablet"

export const RoomsPage = (props) => {

    return (
        <>
            <div className="row d-flex justify-content-around m-5">
                {props.rooms.map(room =>
                    <div key={room} className="col d-flex justify-content-center">
                        <RoomTablet userData={props.userData} organization={props.organization} room={room}/>
                    </div>
                )}
            </div>
        </>
    );
};