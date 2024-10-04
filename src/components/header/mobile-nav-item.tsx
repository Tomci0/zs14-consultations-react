import React from 'react';

import { Icon } from '@iconify/react';

import INavItem from '../../types/nav-item.type';
import { NavLink } from 'react-router-dom';

export default function MobileNavItem({ icon, name, href, active, onClick }: INavItem) {
    if (href) {
        return (
            <NavLink to={href} className={'nav-item' + (active ? ' active' : '')}>
                <Icon className="icon" icon={icon} />
                <span className="title">{name}</span>
            </NavLink>
        );
    } else {
        return (
            <a className={'nav-item' + (active ? ' active' : '')} onClick={onClick}>
                <Icon className="icon" icon={icon} />
                <span className="title">{name}</span>
            </a>
        );
    }
}
