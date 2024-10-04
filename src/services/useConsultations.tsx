import React, { createContext, ReactNode, useContext, useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import IConsultation from '../types/consultation.type';

import getConsultations from '../api/getConsultations';

interface consultationContextType {
    consultations: IConsultation[];
    loading: boolean;
    error?: any;
    setConsultations: (min_date: Date, max_date: Date) => void;
    refreshConsultations: () => void;
}

const ConsultationContext = createContext<consultationContextType>({
    consultations: [],
    loading: false,
    setConsultations: () => {},
    refreshConsultations: () => {},
});

export function ConsultationProvider({ children }: { children: ReactNode }): JSX.Element {
    const [consultations, setConsultationsData] = useState<IConsultation[]>([]);
    const [error, setError] = useState<any>(undefined);
    const [loading, setLoading] = useState<boolean>(true);
    const [consultationsRange, setConsultationsRange] = useState<{ min_date: Date; max_date: Date }>({
        min_date: new Date(),
        max_date: new Date(),
    });

    const [showSignModal, setShowSignModal] = useState<boolean>(false);
    const [showInfoModal, setShowInfoModal] = useState<boolean>(false);

    const location = useLocation();

    useEffect(() => {
        if (error) setError(undefined);
    }, [location.pathname]);

    function setConsultations(min_date: Date, max_date: Date) {
        setLoading(true);
        setConsultationsRange({ min_date, max_date });
        getConsultations({ min_date, max_date })
            .then((data) => {
                setConsultationsData(data);
            })
            .catch((error) => {
                setError(error);
            })
            .finally(() => {
                setLoading(false);
            });
    }

    function refreshConsultations() {
        setLoading(true);
        getConsultations(consultationsRange)
            .then((data) => {
                setConsultationsData(data);
            })
            .catch((error) => {
                setError(error);
            })
            .finally(() => {
                setLoading(false);
            });
    }

    return (
        <ConsultationContext.Provider
            value={{
                consultations,
                loading,
                error,
                setConsultations,
                refreshConsultations,
            }}
        >
            {children}
        </ConsultationContext.Provider>
    );
}

export default function useConsultations() {
    return useContext(ConsultationContext);
}
