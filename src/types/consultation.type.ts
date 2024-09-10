import { EBuilding, ETime } from './enums';

import IScope from './scope.types';
import IUser from './user.type';

export default interface IConsultation {
    id: number;

    date: Date;
    time: number;
    subject?: string;
    teacher?: IUser;
    building?: string;
    room?: string;

    color?: string;

    max_students?: number;
    students?: number;
    end_signing_up?: Date;

    description?: string;
    scopes?: IScope[];
}
