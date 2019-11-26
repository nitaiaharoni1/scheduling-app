import React, {useEffect, useState} from 'react';

export const NavBar = (props) => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    useEffect(() => {
        if (props.userData && props.userData.firstName && props.userData.lastName) {
            const first = capitalizeFirst(props.userData.firstName);
            const last = capitalizeFirst(props.userData.lastName);
            setFirstName(first);
            setLastName(last);
        }
    }, [props.userData]);

    const capitalizeFirst = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    };

    let component;
    if (props && props.orgName) {
        component = (
            <nav className="navbar navbar-light bg-light position-relative">
                <span className="navbar-brand">
                    <img src={props.icon} width="35" height="35" className="align-top mr-2 align-middle"/>
                    {props.orgName}
                    <span className="ml-5 text-capitalize text-muted"
                          style={{fontSize: "large"}}>{`${firstName}, ${lastName}`}
                    </span>
                </span>
                <span className="navbar-brand position-absolute" style={{left: "50%", transform: "translatex(-50%)"}}>Roomer</span>
                <a onClick={props.onLogout} href="" className='p font-weight-bold nav-link text-dark pr-5'>Logout</a>
            </nav>
        )
    } else {
        component = (
            <nav className="navbar navbar-light bg-light">
                <div className="navbar-brand text-center w-100 position-relative">
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