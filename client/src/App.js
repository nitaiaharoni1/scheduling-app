import React, { useState, useEffect } from 'react';
import { Switch, Route, useHistory } from "react-router-dom";

import Cookies from 'js-cookie'
import { NavBar } from "./components/NavBar";
import { RoomsPage } from "./pages/RoomsPage";
import { Login } from "./pages/Login";
import { getDataApi, logoutApi } from "./apis/users_api";
import { Signup } from "./pages/Signup";

function App() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [organizationData, setOrganizationData] = useState({});
    const [userData, setUserData] = useState({});
    let history = useHistory();

    useEffect(() => {
        handleAuth();
    }, []);

    const handleAuth = async () => {
        const cookie = Cookies.get('roomer_token');
        if (cookie) {
            const userData = await getDataApi();
            if (userData) {
                handleData(userData);
                handleLogin();
            } else {
                history.push("/login");
            }
        } else {
            history.push("/login");
        }
    };

    const handleData = (data) => {
        let {firstName, lastName} = data.userData;
        setUserData({firstName, lastName});
        setOrganizationData(data.organizationData);
    };

    const handleLogin = () => {
        setLoggedIn(true);
        history.push("/");
    };

    const handleLogout = async () => {
        const status = await logoutApi();
        if (status) {
            setLoggedIn(false);
            setUserData({});
            setOrganizationData({});
            history.push("/login");
        }
    };

    return (
        <Switch>
            <div className="App">
                <NavBar onLogout={handleLogout} icon={organizationData.icon} userData={userData} orgName={organizationData.title}/>
                <Route exact path="/login" render={() =>
                    <Login onLogin={handleLogin} onData={handleData}/>
                }/>
                <Route exact path="/signup" render={() =>
                    <Signup onSignup={handleLogin} onData={handleData}/>
                }/>

                {loggedIn && <Route exact path="/" render={() =>
                    <RoomsPage userData={userData} organization={organizationData.name} rooms={organizationData.rooms}/>
                }/>}
            </div>
        </Switch>
    );
}

export default App;
