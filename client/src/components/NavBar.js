import React from 'react';
import { Link } from "react-router-dom";

export const NavBar = (props) => {
    let component;
    if (props && props.orgName) {
        component = (
            <nav className="navbar navbar-light bg-light">
                <span className="navbar-brand">
                    <img src={props.icon} width="35" height="35" className="align-top mr-2 align-middle"/>
                    {props.orgName}
                    <span className="ml-5 text-capitalize text-muted"
                          style={{fontSize: "large"}}>{`${props.userData.firstName}, ${props.userData.lastName}`}
                    </span>
                </span>

                <Link to="/login" className="nounderline navbar-brand position-absolute" style={{left: "50%", transform: "translatex(-50%)"}}>
                    <span>Roomer</span>
                </Link>

                <a onClick={props.onLogout} href="#" className='p font-weight-bold nav-link text-dark pr-5'>Logout</a>
            </nav>
        )
    } else {
        component = (
            <nav className="navbar navbar-light bg-light">
                <div className="navbar-brand text-center w-100">
                    <Link to="/login" className="text-dark nounderline">
                        <span>Roomer</span>
                    </Link>
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