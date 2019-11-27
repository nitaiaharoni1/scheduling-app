import React, { useState, useEffect } from 'react';
import { NavBar } from "./components/NavBar";
import { RoomsPage } from "./pages/RoomsPage";
import { Login } from "./pages/Login";
import { authApi, logoutApi } from "./apis/users_api";
import { Loading } from "./components/Loading";
import { Signup } from "./pages/Signup";

function App() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);
    const [signupPage, setSignupPage] = useState(false);
    const [organizationData, setOrganizationData] = useState({});
    const [userData, setUserData] = useState({});

    useEffect(() => {
        auth();
    }, []);

    const auth = async () => {
        const data = await authApi();
        setLoading(false);
        if (data) {
            handleLogin(data);
        }
    };

    const handleLogin = (data) => {
        let {firstName, lastName} = data.userData;
        setUserData({firstName, lastName});
        setOrganizationData(data.organizationData);
        setLoggedIn(true);
    };

    const handleLogout = async () => {
        const status = await logoutApi();
        if (status) {
            setLoggedIn(false);
        }
    };

    const handleSignup = (data) => {
        setSignupPage(false);
        handleLogin(data);
    };

    const handleSignupPage = () => {
        setSignupPage(true);
    };

    let component;
    if (loading) {
        component = <Loading/>
    } else if (signupPage) {
        component = <Signup onSignup={handleSignup}/>
    } else if (loggedIn) {
        component = <RoomsPage userData={userData} organization={organizationData.name} rooms={organizationData.rooms}/>
    } else {
        component = <Login onLogin={handleLogin} onClickSignup={handleSignupPage}/>
    }

    return (
        <div className="App">
            <NavBar onLogout={handleLogout} icon={organizationData.icon} userData={userData} orgName={organizationData.title}/>
            {component}
        </div>
    );
}

export default App;
