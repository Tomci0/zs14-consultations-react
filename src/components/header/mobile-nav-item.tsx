import React from 'react';

import { Icon } from '@iconify/react';

import INavItem from '../../types/nav-item.type';

export default function MobileNavItem({ icon, name, href, active }: INavItem) {
    return (
        <a className={'nav-item' + (active ? ' active' : '')} href={href}>
            <Icon className="icon" icon={icon} />
            <span className="title">{name}</span>
        </a>
    );
}
