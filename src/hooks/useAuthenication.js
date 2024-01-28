import axios from 'axios';
import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router';

const storage = window.localStorage;

export const useAuthenication = () => {
    const navigate = useNavigate();

    const getToken = useCallback(
        () => storage.getItem('register-class_access-token'),
        []
    );
    const setToken = useCallback((token) => {
        storage.setItem('register-class_access-token', token);
    }, []);

    const clearToken = useCallback(() => {
        storage.removeItem('register-class_access-token');
    }, []);

    const getRole = useCallback(
        () => storage.getItem('register-class_access-role'),
        []
    );
    const setRole = useCallback((role) => {
        storage.setItem('register-class_access-role', role);
    }, []);

    const clearRole = useCallback(() => {
        storage.removeItem('register-class_access-role');
    }, []);

    const logout = useCallback(() => {
        clearToken();
        clearRole();
        navigate('/login');
    });

    const login = async ({ username, password, role }) => {
        try {
            const authenication = await axios({
                method: 'post',
                url: 'http://34.101.208.43:8080/api/login',
                data: { username, password, role },
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            });
            if (authenication?.data?.access_token) {
                setToken(authenication?.data?.access_token);
                setRole(role);
                navigate(0);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return { getRole, getToken, setToken, login, logout };
};
