import { EColors, ETime } from './enums';

export default interface ICalendarDate {
    date: Date;
    setDate: (date: Date) => void;
    schoolYear: {
        start: Date;
        end: Date;
    };
}

export interface IPlate {
    time: ETime;
    subject: string;
    teacher: string;
    color: EColors;
}
