import React from 'react';
import Consultations from '../../components/consultations';

import useAuth from '../../services/useAuth';
import { Navigate, NavLink } from 'react-router-dom';

export default function Consultation() {
    const { user } = useAuth();

    if (isEmptyObject(user)) {
        return <></>;
    }

    if (user.isLogged == false) {
        return <Navigate to="/" />;
    }

    return <Consultations />;
}

const isEmptyObject = (obj: any) => {
    return Object.keys(obj).length === 0;
};
