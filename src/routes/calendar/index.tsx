import React from 'react';

import Header from '../../components/header';
import Calendar from '../../components/calendar';

import { ConsultationProvider } from '../../services/useConsultations';

export default function App() {
    return (
        <ConsultationProvider>
            <Calendar />
        </ConsultationProvider>
    );
}
