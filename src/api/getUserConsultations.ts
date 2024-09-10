export interface ISignedConsultation {
    id: string;
    date: Date;
    reason: string;
    scope: string | number;
}

const userConsultations: ISignedConsultation[] = [
    {
        id: '1',
        date: new Date('2024-09-02T18:00:00'),
        reason: 'Dział 1',
        scope: 1,
    },
    {
        id: '2',
        date: new Date('2024-09-02T18:00:00'),
        reason: 'Dział 1',
        scope: 1,
    },
];

export default function getUserConsultations() {
    return userConsultations;
}
