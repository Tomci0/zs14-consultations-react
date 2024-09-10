import { format } from 'path';
import { getApiUrl } from '../constants/functions';
import IConsultation from '../types/consultation.type';
import IUser from '../types/user.type';

export interface IFilters {
    id?: string;
    min_date?: Date;
    max_date?: Date;
    date?: Date;
    teacher?: string;
    subject?: string;
    building?: string;
}

export default async function getConsultations(filters?: IFilters): Promise<IConsultation[]> {
    let queryString: string = '';
    if (filters) {
        queryString = new URLSearchParams(filters as any).toString();
    }

    const response: any = await fetch(getApiUrl('consultations', `get${queryString !== '' ? '?' + queryString : ''}`), {
        method: 'GET',
        credentials: 'include',
    });

    const consultations = await response.json();

    if (consultations.error) {
        return [];
    }

    return consultations.data.map((consultation: IConsultation) => {
        return {
            ...consultation,
            date: new Date(consultation.date),
            end_signing_up: new Date(consultation.end_signing_up as Date),
        } as IConsultation;
    }) as IConsultation[];
}
