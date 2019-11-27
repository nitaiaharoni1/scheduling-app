import React from 'react';
import {RoomTablet} from "../components/RoomTablet"

export const RoomsPage = (props) => {

    return (
        <>
            <div className="row d-flex justify-content-around">
                {props.rooms.map(room =>
                    <div key={room} className="col-4 d-flex justify-content-center">
                        <RoomTablet userData={props.userData} organization={props.organization} room={room}/>
                    </div>
                )}
            </div>
        </>
    );
};