import React, { createContext, ReactNode, useContext, useEffect, useMemo, useState } from 'react';

import IConsultation from '../types/consultation.type';

interface AuthContextType {
    consultations: IConsultation[] | boolean | undefined;
    signingModalShow: boolean;
    consultationModalShow: boolean;
    setConsultations: (consultations: IConsultation[] | boolean | undefined) => void;
    setSigningModalShow: (show: boolean) => void;
    setConsultationModalShow: (show: boolean) => void;
}

const ConsultationContext = createContext<AuthContextType>({
    consultations: undefined,
    signingModalShow: false,
    consultationModalShow: false,
    setConsultations: () => {},
    setSigningModalShow: () => {},
    setConsultationModalShow: () => {},
});

export function ConsultationProvider({ children }: { children: ReactNode }): JSX.Element {
    const [consultations, setConsultations] = useState<IConsultation[] | boolean | undefined>();
    const [signingModalShow, setSigningModalShow] = useState<boolean>(false);
    const [consultationModalShow, setConsultationModalShow] = useState<boolean>(false);

    return (
        <ConsultationContext.Provider
            value={{
                consultations,
                setConsultations,
                signingModalShow,
                setSigningModalShow,
                consultationModalShow,
                setConsultationModalShow,
            }}
        >
            {children}
        </ConsultationContext.Provider>
    );
}

export default function useConsultation() {
    const context = useContext(ConsultationContext);

    if (!context) {
        throw new Error('useConsultation must be used within a ConsultationProvider');
    }

    return context;
}
