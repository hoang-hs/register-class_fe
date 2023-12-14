import './App.css';
// import {Button, Alert, Nav} from 'react-bootstrap'
import React, { cloneElement, useState } from "react";
import Sidebar from "./components/Sidebar/Sidebar";
import {routes} from './constants';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login';

const App = () => {
    const [token, setToken] = useState();

    if (!token) return <Login setToken={setToken}/>;

    return (
        <div className='d-flex h-100'>
            {/* <HeaderBar/> */}
            <Sidebar />
            <div className='px-5 py-4 w-100 bg-light'>
                <Routes>
                    {routes.map(({ path, element }, index) => (
                        <Route 
                            key={index} 
                            path={path}
                            element={cloneElement(element, { token })}
                        />
                    ))}
                </Routes> 
            </div>
        </div>
    );
}

export default App;
