import { useState, useEffect } from 'react';

import PlateList from './platelist';
import IConsultation from '../../types/consultation.type';

import useConsultation from '../../services/useConsultations';

export default function Day({ date, day }: { date: Date; day: number | boolean }) {
    const [plateList, setPlateList] = useState<IConsultation[]>([]);
    const { consultations } = useConsultation();

    useEffect(() => {
        if (consultations) {
            const filteredConsultations = consultations.filter(
                (consultation) =>
                    consultation.date.getDate() === date.getDate() &&
                    consultation.date.getMonth() === date.getMonth() &&
                    consultation.date.getFullYear() === date.getFullYear()
            );

            setPlateList(filteredConsultations);
        }
    }, [consultations, date]);

    if (typeof consultations !== 'object' || consultations.length === 0) {
        return (
            <td className={day ? 'text-center' : 'disabled'}>
                <div className="day-month">
                    <div
                        className={
                            'day' +
                            (date.getFullYear() === new Date().getFullYear() &&
                            date.getMonth() === new Date().getMonth() &&
                            day === new Date().getDate()
                                ? ' active'
                                : '')
                        }
                    >
                        <span>{day}</span>
                    </div>
                </div>
            </td>
        );
    }

    return (
        <td className={day ? 'text-center' : 'disabled'}>
            <div className="day-month">
                <div
                    className={
                        'day' +
                        (date.getFullYear() === new Date().getFullYear() &&
                        date.getMonth() === new Date().getMonth() &&
                        day === new Date().getDate()
                            ? ' active'
                            : '')
                    }
                >
                    <span>{day}</span>
                </div>
            </div>

            <PlateList plates={plateList} />
        </td>
    );
}
