import { useEffect, useState } from 'react';

import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';

import Header from './components/header';

import Index from './routes/index';
import Calendar from './routes/calendar';
import Consultations from './routes/consultations';

import IUser from './types/user.type';
import getUser from './api/getCurrentUser';
import { ToastContainer } from 'react-toastify';
import useAuth, { AuthProvider } from './services/useAuth';
import PrivateRoute from './services/PrivateRoute';

function Main() {
    const location = useLocation();

    return (
        <>
            <ToastContainer />
            <AuthProvider>
                <Header active={location.pathname} />
                {/* <div id="content"> */}
                <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/calendar" element={<Calendar />} />
                    <Route path="/consultations" element={<Consultations />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
                {/* </div> */}
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
