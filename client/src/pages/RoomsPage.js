import React from 'react';
import {RoomTablet} from "../components/RoomTablet"
import ContainerDimensions from 'react-container-dimensions'

export const RoomsPage = (props) => {

    return (
        <div className="container-fluid">
            <div className="row">
                {props.rooms.map(room =>
                    <div key={room} className="col-xs-12 col-md-6 col-xl-4">
                        <ContainerDimensions>
                            {({width}) => {
                                return <RoomTablet width={width * 0.9} userData={props.userData} organization={props.organization} room={room}/>
                            }}
                        </ContainerDimensions>
                    </div>
                )}
            </div>
        </div>
    );
};