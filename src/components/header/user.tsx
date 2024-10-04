import React, { useState } from 'react';
import { Desktop, getApiUrl, Mobile } from '../../constants/functions';

import Dropdown from 'react-bootstrap/Dropdown';

import IUser from '../../types/user.type';
import { Icon } from '@iconify/react';

import ThemeChanger from '../theme-changer';
import AuthenticationCard from './AuthenticationCard';
import { notify, updateNotify } from '../../lib/notifications';

import useAuth from '../../services/useAuth';

import useUserActions from '../../hooks/userActions';

export default function User() {
    const { user } = useAuth();
    const { handleLogout } = useUserActions();

    return (
        <div id="user" className="order-lg-3 order-3">
            <Desktop>
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
                            <img src={user.image} className="img rounded-circle" alt="user-logo" />
                        </span>
                        <span id="name" className="d-none d-lg-inline">
                            {user.name}
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
                        {(user.isAdmin || user.isTeacher) && (
                            <Dropdown.Item href="#">
                                <Icon icon="mdi:shield-user" />
                                <span className="name">Panel Administratora</span>
                            </Dropdown.Item>
                        )}
                        {(user.isTeacher || user.isAdmin) && <Dropdown.Divider />}
                        <li>
                            <a className="dropdown-item" onClick={handleLogout}>
                                <Icon className="icon" icon="mdi:logout" />
                                <span className="name">Wyloguj się</span>
                            </a>
                        </li>
                    </Dropdown.Menu>
                </Dropdown>
            </Desktop>

            <Mobile>
                <ThemeChanger />

                {user.isLogged && (
                    <div id="user-data">
                        <span id="image">
                            <img src={user.image} className="img rounded-circle" alt="user-logo" />
                        </span>
                        <span id="name" className="d-none d-lg-inline">
                            {user.name}
                        </span>
                    </div>
                )}
            </Mobile>
        </div>
    );
}
