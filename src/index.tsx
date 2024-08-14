import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import './App.scss';
import App from './routes/index';
import Calendar from './routes/calendar';

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
    },
    {
        path: '/calendar',
        element: <Calendar />,
    },
]);

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <div className="App">
        <React.StrictMode>
            <RouterProvider router={router} />
        </React.StrictMode>
    </div>
);
