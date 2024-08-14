import React from 'react';
import { getApiUrl } from '../../constants/functions';
import Dropdown from 'react-bootstrap/Dropdown';

import IUser from '../../types/user.type';
import { Icon } from '@iconify/react';

export default function User({ name, image, isTeacher, isAdmin }: IUser) {
    return (
        <div id="user" className="order-lg-3 order-3">
            <button id="theme-toggle" type="button" className="btn btn-sm me-3">
                <Icon id="theme-icon" icon="mdi:weather-night" />
            </button>
            <Dropdown>
                <Dropdown.Toggle
                    variant="none"
                    id="user-data"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    data-bs-offset="-35, 35"
                >
                    <span id="image">
                        <img src="https://via.placeholder.com/64" className="img rounded-circle" alt="user-logo" />
                    </span>
                    <span id="name" className="d-none d-lg-inline">
                        {name}
                    </span>
                </Dropdown.Toggle>

                <Dropdown.Menu
                    popperConfig={{
                        modifiers: [
                            {
                                name: 'offset',
                                options: {
                                    offset: [-8, 25],
                                },
                            },
                        ],
                    }}
                >
                    {(isAdmin || isTeacher) && (
                        <Dropdown.Item href="#">
                            <Icon icon="mdi:shield-user" />
                            <span className="name">Panel Administratora</span>
                        </Dropdown.Item>
                    )}
                    {(isTeacher || isAdmin) && <Dropdown.Divider />}
                    <li>
                        <a className="dropdown-item" href={getApiUrl('/logout')}>
                            <Icon className="icon" icon="mdi:logout" />
                            <span className="name">Wyloguj się</span>
                        </a>
                    </li>
                </Dropdown.Menu>
            </Dropdown>
        </div>
    );
}
