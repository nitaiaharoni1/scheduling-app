import React, {useEffect, useState} from 'react';
import {organizationsApi} from "../apis/organizations_api";
import {signupApi} from "../apis/users_api";

export const Signup = (props) => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [organization, setOrganization] = useState();
    const [availableOrganizations, setAvailableOrganizations] = useState([]);

    useEffect(() => {
        getAvailableOrganizations();
    }, []);

    const getAvailableOrganizations = async () => {
        const orgNames = await organizationsApi();
        if (orgNames) {
            setAvailableOrganizations(orgNames);
        }
    };

    const handleChange = e => {
        const val = e.target.value;
        switch (e.target.id) {
            case "firstName":
                setFirstName(val);
                break;
            case "lastName":
                setLastName(val);
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

    const handleSignupFailed = () => {
        setEmail("");
        setPassword("");
        setFirstName("");
        setLastName("");
        setOrganization();
        alert("User already exists");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = await signupApi(firstName, lastName, password, email, organization);
        if (data) {
            props.onSignup(data)
        } else {
            handleSignupFailed();
        }
    };

    return (
        <>
            <div className="container my-5 pb-3">
                <div className='h3 text-uppercase font-weight-bold'>Signup</div>
                <form onSubmit={handleSubmit} className='my-4'>
                    <div className="row">
                        <div className="col form-group">
                            <label>First name</label>
                            <input type="text" value={firstName} onChange={handleChange} id="firstName" placeholder="Enter your first name"
                                   className="form-control"
                                   required/>
                        </div>

                        <div className="col form-group">
                            <label>Last name</label>
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
                            {availableOrganizations.map(orgName =>
                                <option>{orgName}</option>
                            )};
                        </select>
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