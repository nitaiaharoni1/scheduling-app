import React, {useState, useEffect} from 'react';
import icon from '../assets/clock.png';

export const NavBar = (props) => {
    const [state, setState] = useState(null);

    useEffect(() => {
        // Update useEffect
    }, []);

    return (
        <nav className="navbar navbar-light bg-light">
            <div className="navbar-brand text-center w-100">
                <img className="mb-1" src={icon} width="50" height="50"/>
                <span>Roomer</span>
            </div>
        </nav>
    );
};