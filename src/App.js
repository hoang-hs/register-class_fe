import './App.css';
// import {Button, Alert, Nav} from 'react-bootstrap'
import React, { cloneElement, useEffect, useState } from 'react';
import { routes_by_role } from './constants';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Main from './components/Main/Main';
import { useAuthenication } from './hooks/useAuthenication';

const App = () => {
    const { getRole } = useAuthenication();
    const role = getRole();

    return (
        <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/' element={<Main />}>
                {routes_by_role[role]?.map(
                    ({ path, element, index, subRoutes }, idx) => (
                        <Route
                            index={index}
                            key={idx}
                            path={path}
                            element={cloneElement(element)}
                        >
                            {subRoutes?.map(
                                ({ path, element, index, subRoutes }, idx) => {
                                    return (
                                        <Route
                                            index={index}
                                            key={idx}
                                            path={path}
                                            element={cloneElement(element)}
                                        >
                                            {subRoutes?.map()}
                                        </Route>
                                    );
                                }
                            )}
                        </Route>
                    )
                )}
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
