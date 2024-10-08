import React from 'react';
import Consultation from './consultation';
import { ISignedConsultation } from '../../api/getUserConsultations';

import moment from 'moment';
import IConsultation from '../../types/consultation.type';

interface ISortedConsultations {
    title: string;
    consultations: ISignedConsultation[];
}

export default function List({ consultations }: { consultations: ISignedConsultation[] }) {
    const sortedConsultations: ISortedConsultations[] = [];

    consultations.forEach((consultation) => {
        const consultationDate = new Date((consultation.consultation as IConsultation).date);

        if (isDateToday(consultationDate)) {
            addToSection(sortedConsultations, 'Dzisiaj', consultation);
        } else if (isDateInThisWeek(consultationDate)) {
            addToSection(sortedConsultations, 'W tym tygodniu', consultation);
        } else if (isDateInThisMonth(consultationDate)) {
            addToSection(sortedConsultations, 'W tym miesiącu', consultation);
        } else {
            addToSection(sortedConsultations, 'Inne', consultation);
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

function isDateToday(date: Date) {
    return (
        date.getDate() === new Date().getDate() &&
        date.getMonth() === new Date().getMonth() &&
        date.getFullYear() === new Date().getFullYear()
    );
}

function isDateInThisWeek(consultationDate: Date) {
    const startWeek = moment().startOf('week').toDate();
    const endWeek = moment().endOf('week').toDate();

    return consultationDate > startWeek && consultationDate < endWeek;
}

function isDateInThisMonth(consultationDate: Date) {
    const startMonth = moment().startOf('month').toDate();
    const endMonth = moment().endOf('month').toDate();

    return consultationDate > startMonth && consultationDate < endMonth;
}

const addToSection = (
    sortedConsultations: {
        title: string;
        consultations: ISignedConsultation[];
    }[],
    title: string,
    consultation: ISignedConsultation
) => {
    let section = sortedConsultations.find((section: any) => section.title === title);
    if (!section) {
        section = { title, consultations: [] };
        sortedConsultations.push(section);
    }
    section.consultations.push(consultation);
};
