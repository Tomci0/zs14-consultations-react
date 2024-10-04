import React from 'react';
import { Icon } from '@iconify/react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import INavItem from '../../types/nav-item.type';
import { NavLink } from 'react-router-dom';

export default function NavItem({ icon, name, href, active }: INavItem) {
    if (!href) {
        return <></>;
    }

    return (
        <li className="nav-item">
            <OverlayTrigger
                key="bottom"
                placement="bottom"
                overlay={<Tooltip id={`tooltip-"bottom`}>{name}</Tooltip>}
                popperConfig={{
                    modifiers: [
                        {
                            name: 'offset',
                            options: {
                                offset: [0, 22],
                            },
                        },
                    ],
                }}
            >
                <NavLink
                    to={href}
                    className={'btn nav-link ' + (active ? 'active' : '')}
                    data-bs-toggle="tooltip"
                    data-bs-placement="bottom"
                    data-bs-offset="0,22"
                    data-bs-title={name}
                >
                    <Icon icon={icon} />
                </NavLink>
            </OverlayTrigger>
        </li>
    );
}
