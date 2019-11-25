import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { loginApi } from "../apis/users_api";

export const Login = (props) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [checkbox, setCheckbox] = useState(false);

    const [loggedIn, setLoggedIn] = useState(false);
    console.log(props);

    useEffect(() => {
        // Update useEffect
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = await loginApi(username, password, checkbox);
        props.onLogin(data)
    };

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handleCheckboxChange = (e) => {
        setCheckbox(e.target.checked);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    return (
        <>
            <div className="container mt-5 pt-3">
                <div className="row">
                    <div xs={6} className='col border-right'>
                        <div className='h3 text-center text-uppercase font-weight-bold'>
                            Login
                        </div>
                        <form onSubmit={handleSubmit} className='mt-4'>
                            <div className="form-group">
                                <label>Username</label>
                                <input value={username} onChange={handleUsernameChange} className="form-control" placeholder="Username" required/>
                            </div>

                            <div className="form-group">
                                <label>Password</label>
                                <input value={password} onChange={handlePasswordChange} className="form-control" type="password"
                                       placeholder="Password" required/>
                            </div>
                            <div className="form-group form-inline">
                                <input onChange={handleCheckboxChange} className="form-check-input" type="checkbox"/>
                                <label className="form-check-label">Remember me</label>
                            </div>

                            <div className="text-center">
                                <button block variant="dark" className="btn btn-dark btn-block">
                                    Login
                                </button>
                            </div>
                        </form>

                    </div>

                    <div className='col position-relative' xs={6}>
                        <div className='h3 text-uppercase font-weight-bold text-center'>
                            new user?
                        </div>
                        <button block variant='warning' bsSize="large" style={{bottom: 0}} className='btn btn-dark btn-block position-absolute'>
                            Signup
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};