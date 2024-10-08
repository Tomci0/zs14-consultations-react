import { useState, useEffect } from 'react';

import './main.scss';

import Card from 'react-bootstrap/Card';
import { Icon } from '@iconify/react';

import Datepicker from './datepicker';
import Week from './week';
import Day from './day';

import useAuth from '../../services/useAuth';
import useConsultation from '../../services/useConsultations';

export default function Calendar() {
    const { isLogged } = useAuth();
    const { consultations, setConsultations } = useConsultation();
    const [schoolYear] = useState({
        start: new Date('2024-09-02'),
        end: new Date('2025-06-20'),
    });

    const [date, setDate] = useState<Date>(
        (new Date() < schoolYear.start && schoolYear.start) ||
            (new Date() > schoolYear.end && schoolYear.end) ||
            new Date()
    );

    const days = ['Pon', 'Wt', 'Śr', 'Czw', 'Pt', 'Sob', 'Nie'];

    useEffect(() => {
        const fetchConsultations = async () => {
            const min_date = new Date(date.getFullYear(), date.getMonth(), 1);
            const max_date = new Date(date.getFullYear(), date.getMonth() + 1, 0);

            setConsultations(min_date, max_date);
        };

        fetchConsultations();
    }, [date, isLogged]);

    if (consultations === undefined) {
        return (
            <Card>
                <Card.Header>
                    <Icon className="icon" icon="mdi:calendar" />
                    <div className="title">Kalendarz Konsultacji</div>
                </Card.Header>
                <Card.Body>
                    <div className="loading">Ładowanie...</div>
                </Card.Body>
            </Card>
        );
    }

    return (
        // <div id="content">
        <Card>
            <Card.Header>
                <Icon className="icon" icon="mdi:calendar" />
                <div className="title">Kalendarz Konsultacji</div>
            </Card.Header>
            <Card.Body>
                <Datepicker date={date} setDate={setDate} schoolYear={schoolYear} />
                {/* <div id="calendar"> */}
                <div className="table-responsive">
                    <table id="calendar" className="table table-bordered mb-0 user-select-none">
                        <thead>
                            <tr className="table-header">
                                {days.map((day, index) => (
                                    <th key={index} className={'text-center ' + (index > 4 ? 'disabled' : '')}>
                                        {day}.
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {getDaysTable(date.getFullYear(), date.getMonth()).map((week, weekIndex) => (
                                <Week key={weekIndex}>
                                    {week.map((day, dayIndex) => (
                                        <Day
                                            key={dayIndex}
                                            date={new Date(date.getFullYear(), date.getMonth(), Number(day))}
                                            day={day}
                                        />
                                    ))}
                                </Week>
                            ))}
                        </tbody>
                    </table>
                </div>
                {/* </div> */}
            </Card.Body>
        </Card>
        // </div>
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
