import React from 'react';

import { Icon } from '@iconify/react';

export default function Datepicker({ date, setDate }: { date: Date; setDate: (date: Date) => void }) {
    const months = [
        'Styczeń',
        'Luty',
        'Marzec',
        'Kwiecień',
        'Maj',
        'Czerwiec',
        'Lipiec',
        'Sierpień',
        'Wrzesień',
        'Październik',
        'Listopad',
        'Grudzień',
    ];

    function prevMonth() {
        setDate(new Date(date.getFullYear(), date.getMonth() - 1));
    }

    function nextMonth() {
        setDate(new Date(date.getFullYear(), date.getMonth() + 1));
    }

    return (
        <div className="datepicker">
            <div className="prev" onClick={prevMonth}>
                <Icon icon="mdi:chevron-left" />
            </div>

            <span className="date">
                <span className="month">{months[date.getMonth()]}</span>
                <span className="year">{date.getFullYear()}</span>
            </span>

            <div className="next" onClick={nextMonth}>
                <Icon icon="mdi:chevron-right" />
            </div>
        </div>
    );
}
