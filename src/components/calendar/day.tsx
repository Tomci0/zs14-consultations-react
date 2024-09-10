import { useState, useEffect } from 'react';

import PlateList from './platelist';
import getConsultations from '../../api/getConsultations';
import IConsultation from '../../types/consultation.type';

export default function Day({
    date,
    day,
    plateList,
}: {
    date: Date;
    day: number | boolean;
    plateList: IConsultation[] | boolean;
}) {
    if (typeof plateList !== 'object' || plateList.length === 0) {
        return (
            <td className="disabled">
                <div className="day-month">
                    <div className="day">
                        <span> </span>
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
