import React, {useState} from 'react';
import {loginApi} from "../apis/users_api";

export const Login = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [checkbox, setCheckbox] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = await loginApi(email, password, checkbox);
        if (data) {
            props.onLogin(data)
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
        <>
            <div className="container mt-5 pt-3">
                <div className="row">
                    <div className='col border-right'>
                        <div className='h3 text-center text-uppercase font-weight-bold'>
                            Login
                        </div>
                        <form onSubmit={handleSubmit} className='mt-4'>
                            <div className="form-group">
                                <label>Email</label>
                                <input type="email" value={email} onChange={handleEmailChange} className="form-control" placeholder="Enter your email"
                                       required/>
                            </div>

                            <div className="form-group">
                                <label>Password</label>
                                <input value={password} onChange={handlePasswordChange} className="form-control" type="password"
                                       placeholder="Enter your password" required/>
                            </div>
                            <div className="form-group form-inline">
                                <input onChange={handleCheckboxChange} className="form-check-input" type="checkbox"/>
                                <label className="form-check-label">Remember me</label>
                            </div>

                            <div className="text-center">
                                <button className="btn btn-dark btn-block">
                                    Login
                                </button>
                            </div>
                        </form>

                    </div>

                    <div className='col position-relative'>
                        <div className='h3 text-uppercase font-weight-bold text-center'>
                            new user?
                        </div>
                        <button onClick={props.onClickSignup} style={{bottom: 0}} className='btn btn-dark btn-block position-absolute'>
                            Signup
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};