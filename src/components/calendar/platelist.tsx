import React from 'react';

import { EColors } from '../../types/enums';
import Plate from './plate';
import PlateCollapse from './plate-collapse';
import IConsultation from '../../types/consultation.type';

export default function PlateList({ plates }: { plates: IConsultation[] }) {
    const platesSortedByTime: Array<IConsultation[]> = [];

    plates.forEach((plates) => {
        if (!platesSortedByTime[plates.time]) {
            platesSortedByTime[plates.time] = [];
        }
        platesSortedByTime[plates.time].push(plates);
    });

    return (
        <div className="plate-list">
            {platesSortedByTime.map((plates, time) => {
                if (plates.length > 1) {
                    return (
                        <PlateCollapse time={time} color={EColors.ORANGE}>
                            {plates.map((plate) => {
                                return <Plate data={plate} />;
                            })}
                        </PlateCollapse>
                    );
                } else if (plates.length === 1) {
                    return <Plate data={plates[0]} />;
                } else {
                    return <></>;
                }
            })}
        </div>
    );
}
