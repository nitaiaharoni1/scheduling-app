import React, { Component, useState } from 'react';

export const Signup = (props) => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [organization, setOrganization] = useState("Select your organization");

    const handleChange = e => {
        const val = e.target.value;
        switch (e.target.id) {
            case "firstName":
                setFirstName(val);
                break;
            case "lastName":
                setLastName(val);
                break;
            case "username":
                setUsername(val);
                break;
            case "email":
                setEmail(val);
                break;
            case "password":
                setPassword(val);
                break;
            case "organization":
                setOrganization(val);
                break;
        }
    };

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (true) {
            props.userSignup();
        }
    };

    return (
        <>
            <div className="container my-5 pb-3">
                <div className='h3 text-uppercase font-weight-bold'>Signup</div>
                <form onSubmit={handleSubmit} className='my-4'>
                    <div className="row">
                        <div className="col form-group">
                            <label>First Name</label>
                            <input type="text" value={firstName} onChange={handleChange} id="firstName" placeholder="Enter your first name"
                                   className="form-control"
                                   required/>
                        </div>

                        <div className="col form-group">
                            <label>Last Name</label>
                            <input type="text" value={lastName} onChange={handleChange} id="lastName" placeholder="Enter your last name"
                                   className="form-control"
                                   required/>
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Email</label>
                        <input type="email" value={email} onChange={handleChange} id="email" placeholder="Enter your email" className="form-control"
                               required/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="orgSelect">Organization</label>
                        <select value={organization} onChange={handleChange} className="form-control" id="organization">
                            <option disabled selected>Select your organization</option>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Username</label>
                        <input type="text" value={username} onChange={handleChange} id="username" placeholder="Enter a username"
                               className="form-control" required/>
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" value={password} onChange={handleChange} id="password" placeholder="Enter a password"
                               className="form-control"
                               required/>
                    </div>


                    <div className="form-group mt-4">
                        <button type="submit" class="btn btn-dark btn-block">
                            Signup
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};