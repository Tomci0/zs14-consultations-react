import { useState, useEffect } from 'react';

import './main.scss';

import Card from 'react-bootstrap/Card';
import { Icon } from '@iconify/react';

import Datepicker from './datepicker';

import Week from './week';
import Day from './day';

import IConsultation from '../../types/consultation.type';
import getConsultations from '../../api/getConsultations';

export default function Calendar() {
    const [schoolYear, setSchoolYear] = useState({
        start: new Date('2024-09-02'),
        end: new Date('2025-06-20'),
    });
    const [date, setDate]: [Date, (date: Date) => void] = useState<Date>(
        (new Date() < schoolYear.start && schoolYear.start) ||
            (new Date() > schoolYear.end && schoolYear.end) ||
            new Date()
    );

    const days = ['Pon', 'Wt', 'Śr', 'Czw', 'Pt', 'Sob', 'Nie'];

    const [consultationList, setConsultationList] = useState<IConsultation[] | boolean | undefined>();

    useEffect(() => {
        const api = async () => {
            const min_date = new Date(date.getFullYear(), date.getMonth(), 1);
            const max_date = new Date(date.getFullYear(), date.getMonth() + 1, 0);
            try {
                const consultations: IConsultation[] = await getConsultations({
                    min_date,
                    max_date,
                });

                setConsultationList(consultations);
            } catch (error) {
                console.log(error);
                return;
            }
        };

        api();
    }, [date]);

    if (consultationList === undefined) {
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
        <Card>
            <Card.Header>
                <Icon className="icon" icon="mdi:calendar" />
                <div className="title">Kalendarz Konsultacji</div>
            </Card.Header>
            <Card.Body>
                <Datepicker date={date} setDate={setDate} schoolYear={schoolYear} />

                <div id="calendar">
                    <div className="table-responsive">
                        <table id="calendar" className="table table-bordered mb-0 user-select-none">
                            <thead>
                                <tr className="table-header">
                                    {days.map((day, index) => (
                                        <th scope="col" className={'text-center ' + (index > 4 ? 'disabled' : '')}>
                                            {day}.
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {getDaysTable(date.getFullYear(), date.getMonth()).map((week, index) => (
                                    <Week>
                                        {week.map((day, index) => (
                                            <Day
                                                date={new Date(date.getFullYear(), date.getMonth(), Number(day))}
                                                day={day}
                                                plateList={
                                                    consultationList
                                                        ? (consultationList as IConsultation[]).filter(
                                                              (consultation) => consultation.date.getDate() === day
                                                          )
                                                        : false
                                                }
                                            />
                                        ))}
                                    </Week>
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
