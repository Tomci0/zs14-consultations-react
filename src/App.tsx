import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

import Header from './components/header';

import Index from './routes/index/index';
import Calendar from './routes/calendar/index';
import Consultations from './routes/consultations/index';
import { ToastContainer } from 'react-toastify';
import { AuthProvider } from './services/useAuth';

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
                    {/* <Route path="*" element={<Navigate to="/" replace />} /> */}
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
