import { useState } from 'react';

import Collapse from 'react-bootstrap/Collapse';

import { EColors, ETime } from '../../types/enums';
import { Icon } from '@iconify/react';

export default function PlateCollapse({
    children,
    time,
    color,
}: {
    children: React.ReactNode;
    time: ETime;
    color: EColors;
}) {
    const [collapsed, setCollapsed] = useState<boolean>(false);

    return (
        <>
            <button
                className={'plate ' + color + ' ' + (collapsed ? 'collapsed' : '')}
                onClick={() => setCollapsed(!collapsed)}
            >
                <span className="time">{ETime[time]}</span>
                <span className="value">
                    <div className="item">
                        <Icon icon={!collapsed ? 'mdi:arrow-down-bold' : 'mdi:arrow-up-bold'} />
                        <span className="teacher-name">{(children as any).length} elementów</span>
                    </div>
                </span>
            </button>

            <Collapse in={collapsed}>
                <div>
                    <div className="collapse-container">{children}</div>
                </div>
            </Collapse>
        </>
    );
}
