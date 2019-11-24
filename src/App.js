import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { RoomsPage } from "./components/pages/RoomsPage";
import { Login } from "./components/pages/Login";

function App() {
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        // Update useEffect
    }, []);

    return (
        <Router>
            <div className="App">
                <Switch>
                    <Login/>
                </Switch>
            </div>
        </Router>
    );
}

export default App;
