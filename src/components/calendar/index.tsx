import { useState, useEffect } from 'react';

import './main.scss';

import Card from 'react-bootstrap/Card';
import { Icon } from '@iconify/react';

import Datepicker from './datepicker';

export default function Calendar() {
    const [date, setDate] = useState(new Date());

    const days = ['Pon', 'Wt', 'Śr', 'Czw', 'Pt', 'Sob', 'Nie'];

    useEffect(() => {
        const [year, month] = [date.getFullYear(), date.getMonth()];
        const daysTable = getDaysTable(year, month);
        console.log(daysTable);
    }, [date]);

    return (
        <Card>
            <Card.Header>
                <Icon className="icon" icon="mdi:calendar" />
                <div className="title">Kalendarz Konsultacji</div>
            </Card.Header>
            <Card.Body>
                <Datepicker date={date} setDate={setDate} />

                <div id="calendar">
                    <div className="table-responsive">
                        <table id="calendar" className="table table-bordered mb-0 user-select-none">
                            <thead>
                                <tr className="table-header">
                                    {days.map((day, index) => (
                                        <th
                                            scope="col"
                                            className={'text-center ' + (index > 4 ? 'disabled' : '')}
                                            key={index}
                                        >
                                            {day}.
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {getDaysTable(date.getFullYear(), date.getMonth()).map((week, index) => (
                                    <tr key={index}>
                                        {week.map((day, index) => (
                                            <td key={index} className={day ? 'text-center' : 'disabled'}>
                                                {day}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </Card.Body>
        </Card>
    );
}

function getDaysTable(year: number, month: number): (number | false)[][] {
    const daysTable = Array(42).fill(false);
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    let firstDayIndex = (firstDay.getDay() + 6) % 7;

    for (let i = 0; i < lastDay.getDate(); i++) {
        daysTable[firstDayIndex + i] = i + 1;
    }

    const weeks = [];
    for (let i = 0; i < daysTable.length; i += 7) {
        const week = daysTable.slice(i, i + 7);
        if (week.some((day) => day !== false)) {
            weeks.push(week);
        }
    }

    return weeks;
}

const setCalendar = (date: Date): void => {};
