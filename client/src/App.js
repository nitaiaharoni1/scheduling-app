import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { NavBar } from "./components/NavBar";
import { RoomsPage } from "./pages/RoomsPage";
import { Login } from "./pages/Login";
import { authApi } from "./apis/users_api";

function App() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [organizationData, setOrganizationData] = useState({});
    const [userData, setUserData] = useState({});

    useEffect(async () => {
        const data = await authApi();
        if (data) {
            handleLogin(data);
        }
    }, []);

    const handleLogin = (data) => {
        const {firstName, lastName} = data.userData;
        setOrganizationData(data.organizationData);
        setUserData({firstName, lastName});
        setLoggedIn(true);
    };

    return (
        <div className="App">
            <NavBar icon={organizationData.icon} userData={userData} orgName={organizationData.name}/>
            {loggedIn ? <RoomsPage rooms={organizationData.rooms}/> : <Login onLogin={handleLogin}/>}
        </div>
    );
}

export default App;
