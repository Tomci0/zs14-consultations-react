import React, { useEffect, useState } from 'react';

import { Card } from 'react-bootstrap';
import { Icon } from '@iconify/react';

import getUserConsultations, { ISignedConsultation } from '../../api/getUserConsultations';

import List from './list';

import './style.scss';
import useAuth from '../../services/useAuth';
import useConsultations from '../../services/useConsultations';
import IConsultation from '../../types/consultation.type';

export default function Consultations() {
    const { user } = useAuth();
    const [consultations, setConsultations] = useState<ISignedConsultation[]>([]);

    useEffect(() => {
        const fetchConsultations = async () => {
            const consultations: ISignedConsultation[] = await getUserConsultations(user._id as string);

            consultations.forEach((consultation) => {
                (consultation.consultation as IConsultation).date = new Date(
                    (consultation.consultation as IConsultation).date
                );
                (consultation.consultation as IConsultation).end_signing_up = new Date(
                    (consultation.consultation as IConsultation).end_signing_up as Date
                );
            });

            setConsultations(
                consultations.filter((consultation) => (consultation.consultation as IConsultation).date > new Date())
            );
        };

        fetchConsultations();
    }, []);

    return (
        <Card>
            <Card.Header>
                <Icon className="icon" icon="mdi:chair-school" />
                <div className="title">Twoje Konsultacje</div>
            </Card.Header>
            <Card.Body>
                <List consultations={consultations} />
            </Card.Body>
        </Card>
    );
}
