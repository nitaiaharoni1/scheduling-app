import React, { useState, useEffect } from 'react';
import roomerIcon from '../assets/clock.png';

export const NavBar = (props) => {
    const [state, setState] = useState(null);

    useEffect(() => {
        // Update useEffect
    }, []);

    return (
        <nav className="navbar navbar-light bg-light">
            <div className="navbar-brand text-center w-100">
                <img className="mb-1" src={roomerIcon} width="50" height="50"/>
                <span className="">Roomer</span>
            </div>
            {props.orgName && (
                <div className="position-absolute my-auto">
                    <span className="h5 mx-2">{props.orgName}</span>
                    <img className="" src={props.icon} width="50" height="50"/>
                    <span className="ml-5">{`${props.userData.firstName}, ${props.userData.lastName}`}</span>
                </div>
            )}
        </nav>
    );
};