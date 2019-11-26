import React, { Component, useState } from 'react';

export const Signup = (props) => {
    const [agree, setUsername] = useState("");
    const [firstName, setPassword] = useState("");
    const [lastName, setChesckbasdsaox] = useState(false);
    const [username, setCheckbsoasadassdasx] = useState(false);
    const [email, setCheckbsoasdasx] = useState(false);
    const [password, setChesasdasckbox] = useState(false);
    const [organization, setsCheckbox] = useState(false);

    const handleChange = e => {
    };

    const handleCheckbox = e => {

    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (true) {
            props.userSignup();
            props.history.push('');
        }
    };

    return (
        <>
            <div className="container my-5 pb-3">
                <div className='h2 text-uppercase text-center font-weight-bold'>Signup</div>
                <form onSubmit={handleSubmit} className='my-4'>
                    <div className="row">
                        <div className="col form-group" controlId="firstName">
                            <label>First Name</label>
                            <input value={username} onChange={handleChange} placeholder="Username" className="form-control" required/>
                        </div>

                        <div className="col form-group" controlId="firstName">
                            <label>First Name</label>
                            <input value={username} onChange={handleChange} placeholder="Username" className="form-control" required/>
                        </div>
                    </div>

                    <div className="col form-group" controlId="firstName">
                        <label>First Name</label>
                        <input value={username} onChange={handleChange} placeholder="Username" className="form-control" required/>
                    </div>

                    <div className="col form-group" controlId="firstName">
                        <label>First Name</label>
                        <input value={username} onChange={handleChange} placeholder="Username" className="form-control" required/>
                    </div>

                    <div className="col form-group" controlId="firstName">
                        <label>First Name</label>
                        <input value={username} onChange={handleChange} placeholder="Username" className="form-control" required/>
                    </div>


                    <div className="row">
                        <div className="col form-group" controlId="country">
                            <label>Country</label>
                            <input className="form-control" onChange={handleChange} as="select" required>
                                <option disabled selected>Choose...</option>
                                <option>Israel</option>
                                <option>United States</option>
                                <option>United Kingdom</option>
                            </input>
                        </div>

                        <div className="col form-group" controlId="city">
                            <label>City</label>
                            <input className="form-control" onChange={handleChange} placeholder="City" required/>
                        </div>

                        <div className="col form-group" controlId="houseNum">
                            <label>House Number</label>
                            <input className="form-control" onChange={handleChange} type='number' placeholder="House Number" required/>
                        </div>

                        <div className="col form-group" controlId="zip">
                            <label>Zip</label>
                            <input className="form-control" onChange={handleChange} type='number' placeholder="Zip" required/>
                        </div>
                    </div>

                    <div className='d-flex justify-content-center'>
                        <input type="checkbox" onChange={handleCheckbox} id="checkbox" type="checkbox" required/>
                        <label>I agree to
                            <a> terms of service</a>
                        </label>
                    </div>

                    <button block variant="warning" type="submit">
                        Submit
                    </button>
                </form>
            </div>
        </>
    );
};