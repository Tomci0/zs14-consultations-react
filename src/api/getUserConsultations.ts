import { getApiUrl } from '../constants/functions';
import IConsultation from '../types/consultation.type';
import IScope from '../types/scope.types';
import IUser from '../types/user.type';

export interface ISignedConsultation {
    user: string | IUser;
    consultation: string | IConsultation;
    date: Date;
    reason: string;
    scope: string | IScope;
}

export default async function getUserConsultations(user_id: string) {
    const response = await fetch(getApiUrl('consultations', 'signed'), {
        method: 'GET',
        credentials: 'include',
    });

    const data = await response.json();

    return data.data;
}
