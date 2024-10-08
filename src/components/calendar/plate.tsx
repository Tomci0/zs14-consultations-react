import { useState } from 'react';

import { Icon } from '@iconify/react';
import { ETime } from '../../types/enums';

import ConsultationInfoModal from './modals/consultation-info';
import IConsultation from '../../types/consultation.type';

export default function Plate({ data }: { data: IConsultation }) {
    const [show, setShow] = useState<boolean>(false);
    function handleClick() {
        setShow(true);
    }

    return (
        <>
            <div className={'plate ' + data.color} onClick={handleClick}>
                <span className="time">{ETime[data.time]}</span>
                <span className="value">
                    <div className="item">
                        <Icon icon="mdi:person" />
                        <span className="teacher-name">{data.teacher?.name}</span>
                    </div>
                    <div className="item">
                        <Icon icon="mdi:book" />
                        <span className="teacher-name">{data.subject}</span>
                    </div>
                </span>
            </div>

            <ConsultationInfoModal show={show} setShow={setShow} consultationData={data} />
        </>
    );
}
