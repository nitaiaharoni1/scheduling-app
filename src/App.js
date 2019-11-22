import React from 'react';
import { RoomsPage } from "./components/pages/RoomsPage";
import { NavBar } from "./components/NavBar";

function App() {
  return (
    <div className="App">
        <NavBar/>
        <RoomsPage/>
    </div>
  );
}

export default App;
