import './App.css';
// import {Button, Alert, Nav} from 'react-bootstrap'
import React, { cloneElement, useState } from 'react';
import { routes } from './constants';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Main from './components/Main/Main';

const App = () => {
    // if (!token) return <Login setToken={setToken} />;

    return (
        <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/' element={<Main />}>
                {routes.map(({ path, element }, index) => (
                    <Route
                        key={index}
                        path={path}
                        element={cloneElement(element)}
                    />
                ))}
            </Route>
        </Routes>
    );
};

export default App;

// <Route path='/' element={<Main />}>
//                         {routes.map(({ path, element }, index) => (
//                             <Route
//                                 key={index}
//                                 path={path}
//                                 element={cloneElement(element)}
//                             />
//                         ))}
//                     </Route>
