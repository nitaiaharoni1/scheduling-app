import React from 'react';
import {Link} from "react-router-dom";

export const NavBar = (props) => {
    let component;
    if (props && props.orgName) {
        component = (
            <nav className="navbar navbar-light bg-light mb-4">
                <span className="navbar-brand py-0">
                    <img src={props.icon} style={{height: "2rem", width: "2rem"}} className="align-top mr-2 align-middle"/>
                    <span className="d-none d-md-inline">{props.orgName}</span>
                    <span className="ml-3 ml-md-4 ml-lg-5 text-capitalize text-muted d-none d-md-inline" style={{fontSize: "large"}}>
                        {`${props.userData.firstName}, ${props.userData.lastName}`}
                    </span>
                </span>

                <Link to="#" className="text-dark nounderline navbar-brand position-absolute" style={{left: "50%", transform: "translatex(-50%)"}}>
                    <span>Roomer</span>
                </Link>

                <a onClick={props.onLogout} href="#" className='p font-weight-bold nav-link text-dark pr-0 pr-sm-2 pr-lg-4 pr-xl-5'>Logout</a>
            </nav>
        )
    } else {
        component = (
            <nav className="navbar navbar-light bg-light mb-4">
                <div className="navbar-brand text-center m-auto">
                    <Link to="/login" className="text-dark nounderline">
                        <span>Roomer</span>
                    </Link>
                </div>
            </nav>
        )
    }

    return (
        <div>
            {component}
        </div>
    );
};