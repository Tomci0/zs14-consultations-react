import { BrowserRouter as Router, Routes, Route, useLocation, useParams } from 'react-router-dom';

import Header from './components/header';

import Index from './routes/index/index';
import Calendar from './routes/calendar/index';
import Consultations from './routes/consultations/index';
import { ToastContainer } from 'react-toastify';
import { AuthProvider } from './services/useAuth';
import { notify, notifyPromise } from './lib/notifications';
import { useEffect } from 'react';

function Main() {
    const location = useLocation();

    // get error from url

    const error = new URLSearchParams(location.search).get('error');

    console.log(error);

    useEffect(() => {
        if (error) {
            if (error === 'not_logged') {
                notify('Musisz być zalogowany, aby zobaczyć tę stronę', {
                    type: 'error',
                });
            } else if (error === 'insufficient_permissions') {
                notify('Nie masz wystarczających uprawnień, aby zobaczyć tę stronę', {
                    type: 'error',
                });
            }

            // clear error from url
            window.history.replaceState({}, document.title, '/');
        }
    }, [error]);

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
