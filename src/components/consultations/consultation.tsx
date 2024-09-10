import { useState, useEffect } from 'react';

import { ETime, EBuilding } from '../../types/enums';

import { Icon } from '@iconify/react';

import { ISignedConsultation } from '../../api/getUserConsultations';
import getConsultations from '../../api/getConsultations';
import { formatDate } from '../../lib/formatter';

import ConsultationInfoModal from '../calendar/modals/consultation-info';
import IConsultation from '../../types/consultation.type';

export default function Consultation({ data }: { data: ISignedConsultation }) {
    const [show, setShow] = useState<boolean>(false);
    const [consultationData, setConsultationData] = useState<IConsultation | undefined>();

    useEffect(() => {
        const api = async () => {
            try {
                const consultation = await getConsultations({ id: data.id });

                if (consultation.length === 0) {
                    return;
                }

                setConsultationData(consultation[0]);
            } catch (error) {
                console.error('Błąd podczas pobierania danych użytkownika:', error);
                return;
            }
        };

        api();
    }, [data.id]);

    if (!consultationData) {
        return <></>;
    }

    return (
        <>
            <div className="consultation-item" onClick={() => setShow(true)}>
                <div className="consultation-item__header">
                    <div className="consultation-item__header__title">
                        Konsultacje z przedmiotu {consultationData.subject}
                    </div>
                    <div className="consultation-item__header__date">
                        <Icon icon="mdi:clock" />
                        {formatDate(consultationData.date)} {ETime[consultationData.time]}
                    </div>
                </div>
                <div className="consultation-item__content">
                    <Item icon="mdi:account" label="Nauczyciel" value={consultationData.teacher?.name} />
                    <Item icon="mdi:door" label="Sala" value={consultationData.room} />
                    <Item icon="mdi:building" label="Budynek" value={consultationData.building} />
                </div>
            </div>

            <ConsultationInfoModal
                show={show}
                setShow={setShow}
                consultationData={consultationData}
                withSign={false}
                withUnsign={true}
            />
        </>
    );
}

function Item({ icon, label, value }: { icon: string; label: string; value?: string | number }) {
    return (
        <div className="consultation-item__content__info">
            <Icon icon={icon} />
            <span className="consultation-item__content__info__label">{label}:</span>
            <span className="consultation-item__content__info__value">{value}</span>
        </div>
    );
}
