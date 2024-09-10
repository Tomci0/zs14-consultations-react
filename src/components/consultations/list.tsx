import React from 'react';
import IConsultation from '../../types/consultation.type';
import Consultation from './consultation';
import { ISignedConsultation } from '../../api/getUserConsultations';
import Consultations from '.';
import { formatDate } from '../../lib/formatter';
import { format } from 'path';

interface ISortedConsultations {
    title: string;
    consultations: ISignedConsultation[];
}

export default function List({ consultations }: { consultations: ISignedConsultation[] }) {
    const sortedConsultations: ISortedConsultations[] = [];

    consultations.forEach((consultation) => {
        const currentDate = new Date();
        const date = new Date(consultation.date);
        const day = date.getDate();
        const month = date.getMonth();
        const year = date.getFullYear();

        // only today

        if (currentDate.getDate() === day && currentDate.getMonth() === month && currentDate.getFullYear() === year) {
            if (!sortedConsultations[0]) {
                sortedConsultations[0] = {
                    title: 'Dzisiaj',
                    consultations: [consultation],
                };
            } else {
                sortedConsultations[0].consultations.push(consultation);
            }
        }

        // W tym tygodniu

        const weekEnd = new Date();
        weekEnd.setDate(day + (6 - currentDate.getDay()));

        if (date >= currentDate && date <= weekEnd) {
            if (!sortedConsultations[1]) {
                sortedConsultations[1] = {
                    title: 'W tym tygodniu',
                    consultations: [consultation],
                };
            } else {
                sortedConsultations[1].consultations.push(consultation);
            }
        }

        // W tym miesiącu

        if (date.getMonth() === currentDate.getMonth() && date.getFullYear() === currentDate.getFullYear()) {
            if (!sortedConsultations[2]) {
                sortedConsultations[2] = {
                    title: 'W tym miesiącu',
                    consultations: [consultation],
                };
            } else {
                sortedConsultations[2].consultations.push(consultation);
            }
        }

        // W 

        if (date.getFullYear() === currentDate.getFullYear()) {
            if (!sortedConsultations[3]) {
                sortedConsultations[3] = {
                    title: 'Inne',
                    consultations: [consultation],
                };
            } else {
                sortedConsultations[3].consultations.push(consultation);
            }
        }
    });

    return (
        <div className="consultations-list">
            {sortedConsultations.map((consultation) => (
                <>
                    <Label title={consultation.title} />
                    {consultation.consultations.map((consultation) => (
                        <Consultation data={consultation} />
                    ))}
                </>
            ))}
        </div>
    );
}

function Label({ title }: { title: string }) {
    return <div className="consultation-list__label">{title}</div>;
}
