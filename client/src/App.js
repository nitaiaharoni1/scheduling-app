import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { NavBar } from "./components/NavBar";
import { RoomsPage } from "./pages/RoomsPage";
import { Login } from "./pages/Login";
import { authApi, logoutApi } from "./apis/users_api";
import { Loading } from "./components/Loading";

function App() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);
    const [organizationData, setOrganizationData] = useState({});
    const [userData, setUserData] = useState({});

    useEffect( () => {
        async function auth() {
            const data = await authApi();
            setLoading(false);
            if (data) {
                handleLogin(data);
            }
        }
        auth();
    }, []);

    const handleLogin = (data) => {
        const {firstName, lastName} = data.userData;
        setOrganizationData(data.organizationData);
        setUserData({firstName, lastName});
        setLoggedIn(true);
    };

    const handleLogout = async () => {
        setLoggedIn(false);
        const status = await logoutApi();
    };

    let component;
    if (loading) {
        component = <Loading/>
    } else {
        if (loggedIn) {
            component = <RoomsPage rooms={organizationData.rooms}/>
        } else {
            component = <Login onLogin={handleLogin}/>
        }
    }

    return (
        <div className="App">
            <NavBar onLogout={handleLogout} icon={organizationData.icon} userData={userData} orgName={organizationData.name}/>
            {component}
        </div>
    );
}

export default App;
