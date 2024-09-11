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
import useAuth, { AuthProvider } from './services/useAuth';

function Main() {
    const location = useLocation();
    const { user, isLogged } = useAuth();

    return (
        <>
            <ToastContainer />
            <AuthProvider>
                <Header active={location.pathname} />
                <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/calendar" element={<Calendar />} />

                    {isLogged ? <Route path="/consultations" element={<Consultations />} /> : ''}

                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </AuthProvider>

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
