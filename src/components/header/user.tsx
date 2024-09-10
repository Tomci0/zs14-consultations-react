import React, { useState } from 'react';
import { getApiUrl } from '../../constants/functions';

import Dropdown from 'react-bootstrap/Dropdown';

import IUser from '../../types/user.type';
import { Icon } from '@iconify/react';

import ThemeChanger from '../theme-changer';
import AuthenticationCard from './AuthenticationCard';
import logout from '../../api/logout';
import { notify, updateNotify } from '../../lib/notifications';

export default function User({ userData, setIsLogged }: { userData: IUser; setIsLogged: (show: boolean) => void }) {
    function handleLogout(ev: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
        async function api() {
            const toastId = notify('Wylogowywanie...');
            const response: any = await logout();

            if (response?.success) {
                setIsLogged(true);
                updateNotify(toastId, 'Wylogowano pomyślnie.', false, { type: 'success' });
                setIsLogged(false);
            }
        }

        api();
    }

    return (
        <div id="user" className="order-lg-3 order-3">
            <Dropdown>
                <ThemeChanger />
                <Dropdown.Toggle
                    variant="none"
                    id="user-data"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    data-bs-offset="-35, 35"
                >
                    <span id="image">
                        <img src={userData.image} className="img rounded-circle" alt="user-logo" />
                    </span>
                    <span id="name" className="d-none d-lg-inline">
                        {userData.name}
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
                    {(userData.isAdmin || userData.isTeacher) && (
                        <Dropdown.Item href="#">
                            <Icon icon="mdi:shield-user" />
                            <span className="name">Panel Administratora</span>
                        </Dropdown.Item>
                    )}
                    {(userData.isTeacher || userData.isAdmin) && <Dropdown.Divider />}
                    <li>
                        <a className="dropdown-item" onClick={handleLogout}>
                            <Icon className="icon" icon="mdi:logout" />
                            <span className="name">Wyloguj się</span>
                        </a>
                    </li>
                </Dropdown.Menu>
            </Dropdown>
        </div>
    );
}
