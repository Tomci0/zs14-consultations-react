import React, { createContext, ReactNode, useContext, useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import getCurrentUser from '../api/getCurrentUser';

import IUser from '../types/user.type';
import LogIn from '../api/logIn';
import logoutApi from '../api/logout';

interface AuthContextType {
    isLogged: boolean;
    loading: boolean;
    error?: any;
    user: IUser;
    login: (email: string, password: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
    user: { isLogged: false },
    isLogged: false,
    loading: false,
    login: () => {},
    logout: () => {},
});

export function AuthProvider({ children }: { children: ReactNode }): JSX.Element {
    const [user, setUser] = useState<IUser>({ isLogged: false });
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

    function login(email: string, password: string) {
        setLoading(true);

        // Log in logic

        LogIn(email, password)
            .then((response) => {
                if (response.error) setError(response.error);
                else {
                    setUser(response.user);
                    setIsLogged(true);
                }
            })
            .catch((error) => {})
            .finally(() => {});
    }

    function logout() {
        logoutApi().then(() => setUser({ isLogged: false }));
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
        [user, loading, error]
    );

    return <AuthContext.Provider value={memoedValue}>{!loading && children}</AuthContext.Provider>;
}

export default function useAuth() {
    return useContext(AuthContext);
}
