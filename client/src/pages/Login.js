import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { loginApi } from "../apis/users_api";

export const Login = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [checkbox, setCheckbox] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = await loginApi(email, password, checkbox);
        if (data) {
            props.onData(data);
            props.onLogin();
        } else {
            handleLoginFailed();
        }
    };

    const handleLoginFailed = () => {
        setEmail("");
        setPassword("");
        setCheckbox(false);
        alert("Login Failed");
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleCheckboxChange = (e) => {
        setCheckbox(e.target.checked);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    return (
        <div className="container px-2 px-md-4 mt-5 pt-3">
            <div className="row m-0">
                <div className='col border-right px-2 px-md-4'>
                    <div className="h-100 d-flex flex-column justify-content-between">
                        <div className='h3 text-center text-uppercase font-weight-bold'>
                            Login
                        </div>
                        <form onSubmit={handleSubmit} className='mt-4'>
                            <div className="form-group">
                                <label>Email</label>
                                <input name="email" type="email" value={email} onChange={handleEmailChange} className="form-control"
                                       placeholder="Enter your email"
                                       required/>
                            </div>

                            <div className="form-group">
                                <label>Password</label>
                                <input name="password" value={password} onChange={handlePasswordChange} className="form-control" type="password"
                                       placeholder="Enter your password" required/>
                            </div>
                            <div className="form-group ml-4">
                                <label className="form-check-label">
                                    <input onChange={handleCheckboxChange} className="form-check-input" type="checkbox"/>
                                    Remember me
                                </label>
                            </div>

                            <div className="text-center">
                                <button className="btn btn-dark btn-block">
                                    Login
                                </button>
                            </div>
                        </form>
                    </div>

                </div>

                <div className='col px-2 px-md-4'>
                    <div className="h-100 d-flex flex-column justify-content-between">
                        <div className='h3 text-uppercase font-weight-bold text-center'>
                            new user?
                        </div>
                        <Link to="/signup" className="mb-0">
                            <button className='mb-0 btn btn-dark btn-block'>
                                Signup
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};