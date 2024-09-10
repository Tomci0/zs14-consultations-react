import React from 'react';

import { Card } from 'react-bootstrap';
import { Icon } from '@iconify/react';

import getUserConsultations, { ISignedConsultation } from '../../api/getUserConsultations';

import List from './list';

import './style.scss';

export default function Consultations() {
    const consultations: ISignedConsultation[] = getUserConsultations();
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
