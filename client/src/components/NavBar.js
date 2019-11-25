import React, { useState, useEffect } from 'react';
import roomerIcon from '../assets/clock.png';

export const NavBar = (props) => {
    const [state, setState] = useState(null);

    useEffect(() => {
        // Update useEffect
    }, []);

    let component;
    if (props && props.orgName) {
        component = (
            <nav className="navbar navbar-light bg-light">
                <a className="navbar-brand" href="">
                    <img src={props.icon} width="35" height="35" className="align-top mr-2 align-middle"/>
                    {props.orgName}
                </a>
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <a className="nav-link" href="#">{`${props.userData.firstName}, ${props.userData.lastName}`}</a>
                    </li>
                </ul>
                <a className="navbar-brand text-center" href="#">Roomer</a>
                <a href="" onClick={props.onLogout} className='h6 font-weight-bold nav-link text-dark'>Logout</a>
            </nav>
        )
    } else {
        component = (
            <nav className="navbar navbar-light bg-light">
                <div className="navbar-brand text-center w-100 position-relative">
                    <img className="mb-1" src={roomerIcon} width="50" height="50"/>
                    <span className="">Roomer</span>
                </div>
            </nav>
        )
    }

    return (
        <>
            {component}
        </>
    );
};