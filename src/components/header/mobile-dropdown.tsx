import React from 'react';
import { Icon } from '@iconify/react';

import { getApiUrl } from '../../constants/functions';

import IUser from '../../types/user.type';

export default function MobileDropdown({ name, image, isTeacher, isAdmin }: IUser) {
    return (
        <div id="mobile-dropdown" className="d-lg-none">
            <div className="dropdown">
                <a
                    id="user-data"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    data-bs-offset="-35, 35"
                >
                    <span id="image">
                        <img src={image} className="img rounded-circle" />
                    </span>
                    <span id="name" className="d-none d-lg-inline">
                        {name}
                    </span>
                </a>

                <ul className="dropdown-menu">
                    {(isAdmin || isTeacher) && (
                        <li>
                            <a className="dropdown-item" href="#">
                                <span className="icon iconify" data-icon="mdi:shield-user"></span>
                                <span className="name">Panel Administratora</span>
                            </a>
                        </li>
                    )}
                    <li className="divdiver">
                        <hr />
                    </li>
                    <li>
                        <a className="dropdown-item" href={getApiUrl('/logout')}>
                            <span className="icon iconify" data-icon="mdi:logout"></span>
                            <span className="name">Wyloguj się</span>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    );
}
