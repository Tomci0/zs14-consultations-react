import React, { createContext, ReactNode, useContext, useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import IConsultation from '../types/consultation.type';

import getConsultations from '../api/getConsultations';

import IUser from '../types/user.type';

interface verifyContextType {
    code: string[];
    loading: boolean;
    error?: any;
    setCode: (code: string[]) => void;
    setUserData: (userData: IUser) => void;
    userData: any;

    showVerifyModal: boolean;
    setShowVerifyModal: (show: boolean) => void;
    showCreateModal: boolean;
    setShowCreateModal: (show: boolean) => void;
}

const VerifyContext = createContext<verifyContextType>({
    code: ['', '', '', '', '', ''],
    loading: false,

    setCode: () => {},
    setUserData: () => {},
    userData: {},
    showVerifyModal: false,
    setShowVerifyModal: () => {},
    showCreateModal: false,
    setShowCreateModal: () => {},
});

export function VerifyProvider({ children }: { children: ReactNode }): JSX.Element {
    const [code, setCode] = useState<string[]>(['', '', '', '', '', '']);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<any>(undefined);
    const [userData, setUserData] = useState<IUser>({});

    const [showVerifyModal, setShowVerifyModal] = useState<boolean>(false);
    const [showCreateModal, setShowCreateModal] = useState<boolean>(false);

    return (
        <VerifyContext.Provider
            value={{
                code,
                loading,
                error,
                setCode,
                setUserData,
                userData,

                showVerifyModal,
                setShowVerifyModal,
                showCreateModal,
                setShowCreateModal,
            }}
        >
            {children}
        </VerifyContext.Provider>
    );
}

export default function useConsultations() {
    return useContext(VerifyContext);
}
