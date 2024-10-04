import React from 'react';

import { Icon } from '@iconify/react';
import { EBuilding, ETime } from '../../../../types/enums';
import IConsultation from '../../../../types/consultation.type';

import { Title } from './index';

import { formatDate } from '../../../../lib/formatter';

export default function Info({ data }: { data: IConsultation }) {
    return (
        <>
            <Title text="Informacje:" icon="mdi:info" />
            <div className="info">
                {data.date ? (
                    <Item
                        icon="mdi:calendar"
                        label="Data"
                        value={
                            data.date > new Date()
                                ? formatDate(new Date(data.date)) + ' ' + ETime[data.time]
                                : 'Ta konsultacja już się odbyła'
                        }
                    />
                ) : (
                    ''
                )}
                {data.subject ? <Item icon="mdi:book" label="Przedmiot" value={data.subject} /> : ''}
                {data.teacher ? (
                    <Item icon="mdi:account" label="Nauczyciel" value={data.teacher?.name as string} />
                ) : (
                    ''
                )}
                {data.building ? <Item icon="mdi:building" label="Budynek" value={data.building} /> : ''}
                {data.room ? <Item icon="mdi:door" label="Sala" value={data.room} /> : ''}
                {data.max_students ? (
                    <Item
                        icon="mdi:chair-school"
                        label="Liczba miejsc"
                        value={data.students + '/' + data.max_students.toString()}
                    />
                ) : (
                    ''
                )}
                {data.end_signing_up ? (
                    <Item
                        icon="mdi:clock"
                        label="Zapisy do"
                        value={
                            formatDate(data.end_signing_up) +
                            ' ' +
                            ((data.end_signing_up.getHours() > 9
                                ? data.end_signing_up.getHours()
                                : '0' + data.end_signing_up.getHours()) +
                                ':' +
                                (data.end_signing_up.getMinutes() > 9
                                    ? data.end_signing_up.getMinutes()
                                    : '0' + data.end_signing_up.getMinutes()))
                        }
                    />
                ) : (
                    ''
                )}
            </div>
        </>
    );
}

function Item({ icon, label, value }: { icon: string; label: string; value: string }) {
    return (
        <div className="item">
            <div className="item-label">
                <Icon icon={icon} />
                <span className="label">{label}:</span>
            </div>
            <span className="value">{value}</span>
        </div>
    );
}
