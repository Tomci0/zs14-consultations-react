import React from 'react';

import Header from '../../components/header';
import Calendar from '../../components/calendar';

const user = {
    name: 'John Doe',
    image: '/images/512.png',
    isTeacher: true,
    isAdmin: false,
};

export default function App() {
    return (
        <div className={'App container'}>
            <Header
                name={user.name}
                image={user.image}
                isTeacher={user.isTeacher}
                isAdmin={user.isAdmin}
                active={window.location.pathname}
            />

            <Calendar />
        </div>
    );
}
