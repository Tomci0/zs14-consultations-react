import React from 'react';

import { Icon } from '@iconify/react';
import Datepicker from '../datepicker';

import ICalendarDate from '../../types/calendar.types';

export default function CalendarDate({ date, setDate, schoolYear }: ICalendarDate) {
    function prevMonth() {
        if (date.getFullYear() === schoolYear.start.getFullYear() && date.getMonth() === schoolYear.start.getMonth())
            return;
        setDate(new Date(date.getFullYear(), date.getMonth() - 1));
    }

    function nextMonth() {
        if (date.getFullYear() === schoolYear.end.getFullYear() && date.getMonth() === schoolYear.end.getMonth())
            return;
        setDate(new Date(date.getFullYear(), date.getMonth() + 1));
    }

    return (
        <div className="datepicker">
            <div
                className={
                    'prev ' +
                    (date.getFullYear() === schoolYear.start.getFullYear() &&
                    date.getMonth() === schoolYear.start.getMonth()
                        ? 'disabled'
                        : '')
                }
                onClick={prevMonth}
            >
                <Icon icon="mdi:chevron-left" />
            </div>

            <span className="date">
                <Datepicker currentDate={date} setDate={setDate} schoolYear={schoolYear} />
            </span>

            <div
                className={
                    'next ' +
                    (date.getFullYear() === schoolYear.end.getFullYear() &&
                    date.getMonth() === schoolYear.end.getMonth()
                        ? 'disabled'
                        : '')
                }
                onClick={nextMonth}
            >
                <Icon icon="mdi:chevron-right" />
            </div>
        </div>
    );
}
