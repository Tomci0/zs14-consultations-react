import { useEffect, useState } from 'react';

import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';

import Header from './components/header';

import Index from './routes/index';
import Calendar from './components/calendar';
import Consultations from './routes/consultations';
import VerifyAccountModal from './components/verify-account';

import IUser from './types/user.type';
import getUser from './api/getCurrentUser';
import { ToastContainer } from 'react-toastify';

function Main() {
    const location = useLocation();
    const [userData, setUserData] = useState<IUser>({});
    const [authenticated, setAuthenticated] = useState<boolean>(false);
    const [showVerifyAccount, setShowVerifyAccount] = useState<boolean>(true);
    const [isLogged, setIsLogged] = useState<boolean>(false);

    useEffect(() => {
        const api = async () => {
            try {
                const user = await getUser();
                setUserData(user);
                setAuthenticated(user.isLogged);
            } catch (error) {
                console.error('Błąd podczas pobierania danych użytkownika:', error);
                setAuthenticated(false);
            }
        };

        api();
    }, [isLogged]);

    useEffect(() => {
        if (userData.isLogged) {
            setAuthenticated(true);
        } else {
            setAuthenticated(false);
        }
    }, [userData]);

    return (
        <>
            <ToastContainer />
            <Header userData={userData} active={location.pathname} isLogged={isLogged} setIsLogged={setIsLogged} />
            <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/calendar" element={<Calendar />} />

                {authenticated ? <Route path="/consultations" element={<Consultations />} /> : ''}

                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>

            {/* <VerifyAccountModal show={showVerifyAccount} setShow={setShowVerifyAccount} userCode="123456" /> */}
        </>
    );
}

export default function App() {
    return (
        <div className="App container">
            <Router>
                <Main />
            </Router>
        </div>
    );
}
