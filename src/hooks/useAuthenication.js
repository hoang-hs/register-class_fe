import axios from 'axios';
import { useCallback } from 'react';
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

    const logout = useCallback(() => {
        clearToken();
        navigate(0);
    });

    const login = async ({ username, password, role }) => {
        try {
            const authenication = await axios({
                method: 'post',
                url: 'http://34.128.115.142:8080/api/login',
                data: { username, password, role },
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            });
            if (authenication?.data?.access_token) {
                setToken(authenication?.data?.access_token);
                navigate(0);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return { getToken, setToken, login, logout };
};
