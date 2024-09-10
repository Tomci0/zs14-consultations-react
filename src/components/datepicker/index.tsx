import { useState, useEffect, useRef } from 'react';

import { Icon } from '@iconify/react';

import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';

import IDatePicker from './types';

import './main.scss';

export default function Datepicker({ currentDate, setDate, schoolYear }: IDatePicker) {
    const [showPopover, setShowPopover] = useState(false);
    const popoverRef = useRef<HTMLDivElement | null>(null);

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

    useEffect(() => {
        const handleClick = (event: MouseEvent) => {
            if (showPopover && popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
                setShowPopover(false);
            }
        };

        document.addEventListener('mousedown', handleClick);

        return () => {
            document.removeEventListener('mousedown', handleClick);
        };
    }, [showPopover]);

    return (
        <OverlayTrigger
            trigger="click"
            key="bottom"
            placement="bottom"
            show={showPopover}
            onToggle={() => setShowPopover(!showPopover)}
            overlay={
                <Popover id="month-picker" placement="bottom">
                    <Popover.Body ref={popoverRef}>
                        <div className="current-year">
                            <Icon
                                className={
                                    'prev ' +
                                    (currentDate.getFullYear() === schoolYear.start.getFullYear() ? 'disabled' : '')
                                }
                                icon="mdi:chevron-left"
                                onClick={() => {
                                    if (currentDate.getFullYear() === schoolYear.start.getFullYear()) return;
                                    setDate(new Date(currentDate.getFullYear() - 1, currentDate.getMonth()));
                                }}
                            />
                            <span>{currentDate.getFullYear()}</span>
                            <Icon
                                className={
                                    'next ' +
                                    (currentDate.getFullYear() === schoolYear.end.getFullYear() ? 'disabled' : '')
                                }
                                icon="mdi:chevron-right"
                                onClick={() => {
                                    if (currentDate.getFullYear() === schoolYear.end.getFullYear()) return;
                                    setDate(new Date(currentDate.getFullYear() + 1, currentDate.getMonth()));
                                }}
                            />
                        </div>

                        <div className="months">
                            {months.map((month, index) => (
                                <div
                                    className={
                                        'month ' +
                                        (currentDate.getMonth() === index ? 'active' : '') +
                                        ' ' +
                                        (!isMonthInSchoolYear(currentDate.getFullYear(), index, schoolYear)
                                            ? 'disabled'
                                            : '')
                                    }
                                    onClick={(el) => {
                                        if ((el.target as any).classList.contains('disabled')) return;
                                        setDate(new Date(currentDate.getFullYear(), index));
                                        setShowPopover(false);
                                    }}
                                >
                                    {month}
                                </div>
                            ))}
                        </div>
                    </Popover.Body>
                </Popover>
            }
        >
            <div className="datepicker">
                <span className="month">{months[currentDate.getMonth()]}</span>
                <span className="year">{currentDate.getFullYear()}</span>
            </div>
        </OverlayTrigger>
    );
}

function isMonthInSchoolYear(year: number, month: number, schoolYear: { start: Date; end: Date }) {
    return (
        (year === schoolYear.start.getFullYear() && month >= schoolYear.start.getMonth()) ||
        (year === schoolYear.end.getFullYear() && month <= schoolYear.end.getMonth())
    );
}
