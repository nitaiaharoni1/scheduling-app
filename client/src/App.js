import React, {useState, useEffect} from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import {NavBar} from "./components/NavBar";
import {RoomsPage} from "./components/pages/RoomsPage";
import {Login} from "./components/pages/Login";
import {initApi} from "./apis/users_api";

function App() {
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        // initApi();
    }, []);

    return (
        <Router>
            <div className="App">
                <NavBar/>
                <Switch>
                    <Login/>
                </Switch>
            </div>
        </Router>
    );
}

export default App;
