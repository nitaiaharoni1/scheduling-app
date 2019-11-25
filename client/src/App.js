import React, {useState, useEffect} from 'react';
import {NavBar} from "./components/NavBar";
import {RoomsPage} from "./pages/RoomsPage";
import {Login} from "./pages/Login";
import {authApi, logoutApi} from "./apis/users_api";
import {Loading} from "./components/Loading";

function App() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);
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
    }

    const handleLogin = (data) => {
        const {firstName, lastName} = data.userData;
        setOrganizationData(data.organizationData);
        setUserData({firstName, lastName});
        setLoggedIn(true);
    };

    const handleLogout = async () => {
        const status = await logoutApi();
        if (status) {
            setLoggedIn(false);
        }
    };

    let component;
    if (loading) {
        component = <Loading/>
    } else {
        if (loggedIn) {
            component = <RoomsPage organization={organizationData.name} rooms={organizationData.rooms}/>
        } else {
            component = <Login onLogin={handleLogin}/>
        }
    }

    return (
        <div className="App">
            <NavBar onLogout={handleLogout} icon={organizationData.icon} userData={userData} orgName={organizationData.title}/>
            {component}
        </div>
    );
}

export default App;
