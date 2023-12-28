import axios from 'axios';
import { useCallback } from 'react';

const storage = window.localStorage;

export const useAuthenication = () => {
    const getToken = useCallback(
        () => storage.getItem('register-class_access-token'),
        []
    );
    const setToken = useCallback((token) => {
        storage.setItem('register-class_access-token', token);
    }, []);

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
            console.log(authenication);
            setToken(authenication?.data?.access_token);
        } catch (error) {
            console.log(error);
        }
    };

    return { getToken, setToken, login };
};
