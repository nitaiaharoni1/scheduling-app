import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

export const Login = () => {
    const rooms = ["Alpha"/*, "Bravo", "Charlie"*/];

    return (
        <>
            <div className="container mt-5 pt-3 Login">
                <div className="row">
                    <div xs={6} className='col border-right'>
                        <h3 className='text-center text-uppercase font-weight-bold'>
                            Login
                        </h3>
                        <form action="" className='mt-4'>
                            <div className="form-group" controlId="username">
                                <label>Username</label>
                                <input className="form-control" placeholder="Username" required/>
                            </div>

                            <div className="form-group" controlId="password">
                                <label>Password</label>
                                <input className="form-control" type="password" placeholder="Password" required/>
                            </div>
                            <div className="form-group" controlId="remember">
                                <label>Remember me</label>
                                <input class="form-check" type="checkbox"/>
                            </div>
                            <button block variant="dark" type="submit" className="btn btn-dark">
                                Login
                            </button>
                        </form>

                    </div>

                    <div className='col' xs={6}>
                        <h3 className='text-center text-uppercase font-weight-bold '>
                            new user?
                        </h3>
                        <Link to='signup'>
                            <label/>
                            <button block variant='warning' bsSize="large" className='mt-4 btn btn-dark'>
                                Signup
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};