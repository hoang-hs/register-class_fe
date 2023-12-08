import './App.css';
// import {Button, Alert, Nav} from 'react-bootstrap'
// import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";
import Sidebar from "./components/Sidebar";
import HeaderBar from "./components/HeaderBar";

function App() {
    return (
        <div>
            <HeaderBar/>
            <Sidebar/>
        </div>
    );
}

export default App;
