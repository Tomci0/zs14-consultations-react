import React, { createContext, ReactNode, useContext, useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import getCurrentUser from '../api/getCurrentUser';

import IUser from '../types/user.type';
import LogIn from '../api/logIn';
import logoutApi from '../api/logout';

import { notifyPromise, updateNotify } from '../lib/notifications';
import { toast } from 'react-toastify';
import { getApiUrl } from '../constants/functions';

interface AuthContextType {
    isLogged: boolean;
    loading: boolean;
    error?: any;
    user: IUser;
    login: (email: string, password: string) => Promise<any>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
    user: { isLogged: false },
    isLogged: false,
    loading: false,
    login: () => Promise.resolve({}),
    logout: () => {},
});

export function AuthProvider({ children }: { children: ReactNode }): JSX.Element {
    const [user, setUser] = useState<IUser>({});
    const [isLogged, setIsLogged] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<any>(undefined);

    const location = useLocation();

    useEffect(() => {
        if (error) setError(undefined);
    }, [location.pathname]);

    useEffect(() => {
        getCurrentUser()
            .then((user) => {
                setUser(user);
                setIsLogged(user.isLogged);
                setLoading(false);
            })
            .catch((error) => {
                setError(error);
                setLoading(false);
            });
    }, []);

    async function login(email: string, password: string) {
        setLoading(true);
        const toastId = notifyPromise('Logowanie...');

        // const response = await LogIn(email, password);

        const data = await fetch(getApiUrl('auth', 'login'), {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: email,
                password: password,
            }),
        });

        const response = await data.json();

        if (response.error) {
            updateNotify(toastId, response.message, false, { type: 'error' });
            setError(response.error);
            setLoading(false);
        } else {
            updateNotify(toastId, 'Zalogowano pomyślnie.', false, { type: 'success' });
            setUser(response.data);
            setIsLogged(true);
            setLoading(false);
        }

        return response;
    }

    function logout() {
        const toastId = notifyPromise('Wylogowywanie...');
        logoutApi()
            .then(() => {
                updateNotify(toastId, 'Wylogowano pomyślnie.', false, { type: 'success' });
                setUser({ isLogged: false });
                setIsLogged(false);
                return;
            })
            .catch((error) => {
                updateNotify(toastId, 'Błąd podczas wylogowywania.', false, { type: 'error' });
                setError(error);
            })
            .finally(() => {
                setLoading(false);
            });
    }

    const memoedValue = useMemo(
        () => ({
            user,
            isLogged,
            loading,
            error,
            login,
            logout,
        }),
        [user, isLogged, loading, error]
    );

    return <AuthContext.Provider value={memoedValue}>{children}</AuthContext.Provider>;
}

export default function useAuth() {
    return useContext(AuthContext);
}
